// frontend/src/utils/parseInstruction.js

const REACT_APP_MATCH_CONDITION =
  process.env.REACT_APP_MATCH_CONDITION || "ALL";

const wrap = (children) => (
  <div className="dark:text-white space-y-2">{children}</div>
);

export const parseInstruction = (index, chatType) => {
  const base = (
    <p>
      Tú y un compañero/a usarán este chat para proponer la mayor cantidad de{" "}
      <strong>usos alternativos originales y prácticamente útiles</strong> que
      puedan para un objeto cotidiano en <strong>4 minutos</strong>.
    </p>
  );

  const ready = (
    <p>
      Cuando estés listo/a para empezar, escribe <strong>'listo'</strong> en el
      chat para revelar el objeto y comenzar el cronómetro.
    </p>
  );

  const hum = (
    <p>
      Tu compañero/a en esta ronda es un{" "}
      <strong>humano interactivo</strong>. Interactúa con él/ella como prefieras.
    </p>
  );

  const con = (
    <p>
      Esta ronda es <strong>no interactiva</strong>. Verás los mensajes del
      agente compañero, pero el agente no podrá ver los tuyos y realizará la
      tarea de forma independiente.
    </p>
  );

  const gpt = (
    <p>
      Tu compañero/a en esta ronda es una{" "}
      <strong>IA interactiva</strong>. Escribe 'listo' en el chat, espera su
      primera respuesta y luego interactúa con ella como prefieras.
    </p>
  );

  switch (REACT_APP_MATCH_CONDITION) {
    case "HUM":
      return wrap(
        <>
          {base}
          {hum}
          {ready}
        </>
      );

    case "CON":
      return wrap(
        <>
          {base}
          {con}
          {ready}
        </>
      );

    case "GPT":
      return wrap(
        <>
          {base}
          {gpt}
          {ready}
        </>
      );

    case "ALL":
    default:
      return wrap(
        <>
          {index === 0 && base}

          {chatType === "HUM" && (
            <>
              {hum}
              {ready}
            </>
          )}

          {chatType === "CON" && (
            <>
              {con}
              {ready}
            </>
          )}

          {chatType === "GPT" && (
            <>
              {gpt}
              {ready}
            </>
          )}
        </>
      );
  }
};

export const parseEndInstruction = (index) => {
  const roundEnd = (
    <>
      <p>
        Has completado la <strong>ronda de generación de ideas</strong>. Vuelve
        a la encuesta de Qualtrics para seleccionar las mejores ideas.
      </p>
      <p>
        Cuando se te indique, haz clic en el botón <strong>'Comenzar'</strong>{" "}
        en la parte superior izquierda para iniciar la siguiente ronda.
      </p>
    </>
  );

  const final = (
    <p>
      La parte de <strong>co-creación</strong> de nuestra actividad ha
      terminado. Vuelve a la encuesta de Qualtrics para seleccionar las mejores
      ideas.
    </p>
  );

  if (REACT_APP_MATCH_CONDITION === "ALL") {
    if (index === 2) return wrap(final);
    return wrap(roundEnd);
  }

  return wrap(final);
};
