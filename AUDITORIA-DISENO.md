# Auditoría de la invitación · Valeria y Gabriel

Revisión del 12 de octubre de 2026 sobre el proyecto local. Se revisaron composición, navegación, descubrimiento de información, accesibilidad básica, contenido y archivos servidos. Las observaciones sobre facilidad de uso son una evaluación de diseño; no son resultados de un estudio con invitados.

## Dirección visual

La esencia adecuada es una pieza de papelería: marfil, acuarelas, serif editorial, caligrafía en frases breves y dorado como acento. La apertura es el momento especial. El contenido interior necesita calma y claridad. Mantendría los cinco capítulos, los perritos y las ilustraciones del impreso. Una fotografía real de la pareja aportaría más identidad que añadir más efectos.

## Hallazgos y ajustes aplicados

| Prioridad | Hallazgo | Ajuste |
| --- | --- | --- |
| Alta | Las flores se movían junto con las puertas; no había una apertura real por capas. | Tres capas independientes: ramos, corona y follaje. Las solapas se separan después. Secuencia GSAP de aproximadamente dos segundos y cierre inverso. |
| Alta | La vestimenta dependía de descubrir una pestaña. | Resumen visible junto al itinerario: «Formal primaveral», colores que se evitan, paleta y botón «Ver guía de vestimenta». No hace falta abrir la guía para leer lo indispensable. |
| Alta | El final carecía de un cierre de la experiencia. | Otro gesto desde el fondo cierra la invitación. Botón explícito y control de cierre en la navegación. La llegada al final por inercia no activa el cierre. |
| Alta | Añadir el resumen de vestimenta lo dejaba fuera de vista en 375 × 667. | Espaciado más compacto en pantallas bajas; resumen y seis momentos del itinerario visibles en la misma vista móvil. |
| Media | Texto blanco sobre el botón dorado y título azul con contraste bajo. | Botón bronce más oscuro: contraste calculado de 3,23:1 a 4,75:1. Azul del título: de 2,35:1 a 3,59:1 sobre el papel claro. Se mantienen los colores del impreso. |
| Media | Controles de color y cierre pequeños. | Colores, cierre y flechas con área de 44 px. Las pestañas se distinguen con fondo además del color. Los indicadores de capítulo conservan un área más estrecha para caber en móvil. |
| Media | Letras auxiliares del itinerario y formulario demasiado pequeñas. | Aumento del tamaño y contraste de descripciones, etiquetas, opciones y explicación de WhatsApp. La caligrafía se reserva para títulos breves. |
| Media | Las flores interferían con la frase de la portada. | Fondo marfil difuminado detrás de la frase para facilitar la lectura. |
| Media | Un cierre al final podía mostrar de golpe la primera pantalla detrás de la animación. | El contenido permanece en la última pantalla durante el cierre; se vuelve al inicio cuando terminan de reunirse las capas. |

## Información que conviene completar

1. **Horarios:** cena y pastel figuran ambos a las 20:30, igual que en el impreso. Confirmar si es intencional. No se han inventado otros horarios.
2. **Ubicación:** añadir una dirección escrita, ciudad y una referencia breve. El botón usa el enlace del QR original; falta comprobar su destino con los novios.
3. **Fotografía:** añadir una foto vertical de ambos en `fotoPareja`. Mantener los perritos junto a ella. Sus nombres podrían acompañar la ilustración con una línea breve si se quieren incluir.
4. **Confirmación:** el número WhatsApp sigue vacío. El formulario permanece y prepara un mensaje; no registra ni envía respuestas por sí solo. Más adelante se puede conectar una base de datos, conservando el mismo diseño y mostrando un estado de éxito claro.
5. **Plazo:** cuando los novios lo definan, mostrar una fecha límite para responder junto al formulario.

## Rendimiento y mantenimiento

- La corona PNG pesa aproximadamente 1,9 MB y los perritos 1,6 MB. Las copias visuales reutilizan los mismos archivos; no requieren una descarga por capa. Antes de compartir ampliamente, conviene preparar WebP y verificar que mantenga la transparencia y el detalle de las acuarelas. No se han alterado los originales.
- El audio pesa aproximadamente 440 KB y se carga al abrir. Una canción nueva debería tener un peso moderado; la música sigue siendo controlable y respeta la elección de pausa al volver a abrir.
- El sitio depende de Google Fonts, con fuentes alternativas declaradas. No se ha medido la carga en una conexión lenta real.
- Los estilos originales contienen varias reglas repetidas. Los ajustes están separados en `cover.css` y `details.css`. Consolidarlos más adelante reduciría el riesgo de que una personalización cambie otra pantalla.
- La fecha del calendario `.ics` es fija. Si cambia la boda en `config.ts`, también debe actualizarse ese archivo y los textos de fecha de la portada.

## Validación y límites

Se conservan el movimiento reducido, el contenido inerte detrás de la portada, las etiquetas del formulario, el foco visible y la navegación de pestañas por teclado. Los paneles de menor altura permiten scroll natural para no sacrificar contenido. La información introducida en el formulario no se borra al cerrar las solapas; recargar la página sí reinicia el estado local.

La compilación TypeScript/Vite y nueve pruebas de gestos verifican los cierres desde ambas fronteras, la inercia, la dirección y el contenido restante. Se comprobó visualmente la apertura por capas, el resumen del itinerario en 375 × 667, el acceso a la vestimenta, la selección de un color, el cierre final con rueda y con arrastre táctil, y una nueva apertura. La revisión usa Chrome con emulación móvil; no sustituye una comprobación en Safari de un iPhone real ni una auditoría completa de accesibilidad.

## Mi siguiente mejora como diseñador

Elegir una sola fotografía cálida de la pareja, completar la dirección y confirmar los horarios. Eso aporta cercanía y confianza sin alargar el recorrido. Conservaría los efectos en la apertura y el cierre; las páginas interiores ya se benefician más de la lectura sencilla y de acciones claras.
