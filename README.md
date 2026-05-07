# Plataforma experimental para evaluar la co-creatividad en equipos humano-humano y humano-IA (versión en español)

*Desarrollado por Babak Hemmatian, Yijun Lin, Shravan Ramamoorthy y Jayesh Rathi · traducción al español: 2026*

---

## Tabla de contenidos

- [Introducción](#introducción)
- [Cómo usar](#cómo-usar)
  - [Interacción en dos computadoras](#interacción-en-dos-computadoras)
  - [Interacción en una sola computadora](#interacción-en-una-sola-computadora)
- [Preguntas frecuentes](#preguntas-frecuentes)
- [Notas de localización](#notas-de-localización)

---

## Introducción

Presentamos una nueva plataforma experimental que permite estudiar de forma controlada equipos humano-IA y humano-humano durante una tarea de co-creación. Hemos creado una versión cooperativa del clásico **Test de Usos Alternativos** (AUT; Guilford, 1967), cuya meta es proponer la mayor cantidad de usos creativos, originales y prácticamente útiles para un objeto cotidiano dentro de un límite de tiempo. Nuestra plataforma permite que los compañeros interactúen durante la fase de generación de ideas antes de elegir sus respuestas personales en el paso de selección. La aplicación original permite usar procedimientos idénticos para parejas humano-humano y humano-IA, así como aplicar controles experimentales sobre el chat. Los resultados pueden evaluarse usando los mismos procedimientos del test individual estándar de creatividad. Actualmente usamos GPT-5 como agente de IA, pero la modularidad de la plataforma permite reemplazarlo con algoritmos más o menos avanzados según convenga. Escribe a [Babak Hemmatian, Ph.D.](mailto:babak.hemmatian@stonybrook.edu) con cualquier pregunta o duda.

## Cómo usar

Para mostrar mejor el conjunto completo de funcionalidades, la app está configurada por defecto para soportar parejas de participantes que pasan por tres tipos de sesiones en orden aleatorio: emparejado con otra persona, emparejado con GPT-5, y una sesión no interactiva donde dos participantes generan sus ideas de forma independiente.

### Interacción en dos computadoras

Pide a por lo menos dos personas que realicen, de forma independiente y en computadoras separadas, los siguientes pasos:

1. Abrir un navegador (Google Chrome, Microsoft Edge o Mozilla Firefox).
2. Abrir la encuesta de Qualtrics en una pestaña de incógnito (sustituye este enlace por la URL de tu propia encuesta en español).
3. Avanzar por la encuesta siguiendo las instrucciones. En algunos puntos tendrán que esperar antes de continuar; esto asegura que los participantes realicen las tareas con cuidado.
4. Cuando se les indique, abrir la app de chat en otra pestaña de incógnito, emparejarse con la otra persona y comenzar una sesión.
5. Cuando se les indique, regresar a la encuesta para seleccionar las mejores respuestas de su sesión.
6. El resto de la encuesta tiene instrucciones claras y es fácil de seguir; ante cualquier duda, consulta la sección de preguntas frecuentes.

### Interacción en una sola computadora

Si quieres probar la versión multi-usuario en una sola computadora:

1. Crea dos pestañas de incógnito separadas, una para la encuesta y otra para la app de chat.
2. En la pestaña de la app de chat, inicia sesión o regístrate con **dos perfiles diferentes** cuando aparezca la pantalla de inicio. Asegúrate de que los nombres y avatares elegidos sean fácilmente distinguibles.
3. Una vez que la app de chat termine de cargar, selecciona "Emparejar" en la esquina superior izquierda en ambas pestañas.
4. Avanza la tarea para ambos "usuarios" en sus pestañas respectivas.

## Preguntas frecuentes

### ¿Dónde encuentro la lista de respuestas normadas usadas en la condición no interactiva?

En `server/config/constResponse.js`. Esta versión en español incluye traducciones de las respuestas originales en inglés.

### ¿Cómo me empareja y converso?

1. Entra a la app de chat (la versión local que estés ejecutando, o la que despliegues más adelante).
2. Verás la pantalla de inicio de sesión.
3. Ingresa tus datos (nota que el registro requiere confirmación de contraseña).
4. Elige un avatar y escribe tu nombre.
5. Verás la pantalla principal (haz una recarga para que aparezca tu avatar arriba a la derecha). Haz clic en "Emparejar".
6. Llegarás a la pantalla del chat. Escribe **"listo"** para empezar.

### La app de chat no responde. ¿Qué hago?

Recarga la página y la app reanudará desde la ronda en la que estabas. Si el problema persiste, cierra sesión y vuelve a iniciarla.

### Quiero dar retroalimentación sobre la app. ¿A quién contacto?

Por favor, contacta a [Babak Hemmatian, Ph.D.](mailto:babak.hemmatian@stonybrook.edu).

## Notas de localización

- La palabra clave en el chat para iniciar el cronómetro es **"listo"** (no "ready" como en la versión en inglés).
- El prompt por defecto del agente de IA está en español. Si quieres ajustarlo sin tocar el código, define la variable de entorno `AI_INS` con tu propio prompt (consulta `server/service/openAI.js`).
- Los objetos del AUT que se presentan a los participantes se controlan con la variable `ITEMS` del archivo `.env`; consulta `.env.example` para los valores en español.

## Agradecimientos

Agradecemos a Naman Raina y Haotian Wang por su ayuda en el desarrollo de esta herramienta.
