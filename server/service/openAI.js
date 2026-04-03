import axios from "axios"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set")

async function withRetry(fn, maxRetries = 3) {
  let delay = 1000
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const status = err?.response?.status
      const isRetryable =
        status === 429 || (status >= 500 && status < 600) || !status
      if (attempt === maxRetries || !isRetryable) throw err
      console.warn(
        `OpenAI request failed with status ${status} (attempt ${attempt + 1}/${maxRetries}), retrying in ${delay}ms...`,
      )
      await new Promise((r) => setTimeout(r, delay))
      delay *= 2
    }
  }
}

const MODEL = process.env.OPENAI_MODEL || "gpt-5"
const OPENAI_URL = "https://api.openai.com/v1/responses"

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENAI_API_KEY}`,
}

const INSTRUCTIONS = `
Trabajarás junto con el usuario para idear la mayor cantidad posible de usos alternativos —que sean originales y prácticamente útiles— para un objeto cotidiano, en un plazo de 4 minutos. Asume que estás jugando a este juego por primera vez. Serán evaluados como equipo. Tú iniciarás la conversación. Mantente enfocado en la tarea y haz tus aportaciones, procurando interactuar con el usuario de manera adecuada. No generes más de una idea a la vez. Mantén tus respuestas concisas y evita añadir frases superfluas, como «aquí tienes un uso creativo para X». Siéntete libre de desarrollar las ideas del usuario, pero asegúrate de que cualquier propuesta que plantees sea distinta a las suyas o a cualquier otra que ya se haya compartido. El objeto para el cual deberán idear usos creativos es:
`.trim()

const seedUser = (item) =>
  `Empieza el chat compartiendo un uso creativo para ${item}.`

const toInputBlocks = (raw) => {
  const blocks = []
  const hist = Array.isArray(raw) ? raw.slice(1) : [] // skip item holder
  for (const m of hist) {
    if (!m || m.text == null) continue
    const text = String(m.text)
    if (m.sender === 1) {
      blocks.push({ role: "user", content: [{ type: "input_text", text }] })
    } else if (m.sender === 2) {
      blocks.push({
        role: "assistant",
        content: [{ type: "output_text", text }],
      })
    }
  }

  const first = blocks[0]
  if (!first || first.role !== "user") {
    const item = raw?.[0]?.text || "el objeto"
    blocks.unshift({
      role: "user",
      content: [{ type: "input_text", text: seedUser(item) }],
    })
  }
  return blocks
}

const extractOutputText = (data) => {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim()
  }
  if (Array.isArray(data?.output)) {
    for (const item of data.output) {
      if (Array.isArray(item?.content)) {
        for (const c of item.content) {
          if (
            c?.type === "output_text" &&
            typeof c.text === "string" &&
            c.text.trim()
          ) {
            return c.text.trim()
          }
          if (
            c?.type === "message" &&
            c?.role === "assistant" &&
            Array.isArray(c?.content)
          ) {
            const t = c.content.find(
              (x) => x.type === "output_text" && typeof x.text === "string",
            )
            if (t?.text?.trim()) return t.text.trim()
          }
        }
      }
    }
  }
  if (typeof data?.content === "string" && data.content.trim())
    return data.content.trim()
  return ""
}

export const generateCompletion = async (messages) => {
  const input = toInputBlocks(messages)
  const body = {
    model: MODEL,
    instructions: INSTRUCTIONS,
    input,
    reasoning: { effort: "minimal" },
    text: { verbosity: "low" },
    max_output_tokens: 40,
  }
  try {
    return await withRetry(async () => {
      const input = toInputBlocks(messages)
      const body = { model: MODEL, instructions: INSTRUCTIONS, input }

      console.log("OpenAI request body:", JSON.stringify(body, null, 2))
      const resp = await axios.post(OPENAI_URL, body, { headers })
      const text = extractOutputText(resp.data)

      if (!text) {
        console.error(
          "OpenAI Responses empty output. Raw payload:",
          JSON.stringify(resp.data),
        )
        throw new Error("Empty output from OpenAI Responses API")
      }
      return { text }
    })
  } catch (err) {
    const detail = err?.response?.data || err?.message || "Unknown OpenAI error"
    console.error("OpenAI Responses error:", detail)
    throw err
  }
}

export const chatgptReply = async (_message, messages, _lastres) => {
  return generateCompletion(messages)
}
