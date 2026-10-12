# Valeria & Gabriel · Invitación de boda

Invitación en React, TypeScript, Vite y GSAP. Fondo marfil, acuarelas, puertas florales y cinco capítulos:

1. La invitación.
2. Nuestro amor, con sus dos perritos y una foto opcional.
3. Fecha, lugar, mapa, calendario y cuenta regresiva.
4. Itinerario y vestimenta, con pestañas.
5. Confirmación por WhatsApp.

## Vista previa

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173/`. En otro dispositivo de la misma red, usar la dirección Network que imprime Vite.

```bash
npm run build
npm run preview
```

El resultado de producción está en `dist/` (sitio estático).

## Personalización

Editar `src/config.ts`:

- `fotoPareja`: guardar una fotografía en `public/assets/` y escribir su ruta, por ejemplo `/assets/pareja.jpg`. Mientras esté vacío, aparece una composición de iniciales.
- `whatsappNumero`: número del destinatario con código de país, sin espacios ni signo +. Mientras esté vacío, el invitado elige el destinatario en WhatsApp. El sitio prepara el mensaje; no registra asistencia ni envía automáticamente.
- Fecha, mapa y cronograma: vienen del diseño entregado. Cena y pastel mantienen ambos las 20:30; confirmar esos horarios antes de compartir.
- `musicaUrl`: pista instrumental incluida, activada con el botón de apertura y controlable desde la cabecera. Para cambiarla, guardar el MP3 en `public/assets/nuestra-cancion.mp3` y poner `musicaUrl: '/assets/nuestra-cancion.mp3'` en `src/config.ts`. La ruta no lleva `public/`. También se puede reemplazar el archivo `musica-instrumental.mp3` manteniendo su nombre.

La imagen de los perritos conserva su apariencia de la referencia y reconstruye las partes que venían recortadas. Más información en `public/assets/NOTAS-ILUSTRACIONES.md`.

## Navegación y accesibilidad

Cinco pantallas con scroll snap nativo para táctil, avance por gesto de rueda en escritorio, indicadores, flechas y accesos directos a lugar y confirmación. En pantallas bajas se permite scroll natural para no cortar contenido. El formulario desactiva el ajuste de scroll al enfocar sus campos. Se respetan las preferencias de movimiento reducido, se oculta el contenido detrás del diálogo inicial con `inert`, y las pestañas admiten flechas, Home y End.

Los archivos anteriores a la revisión están en `.revision-original/`. `vista-previa.html` redirige a la aplicación para evitar mostrar la versión antigua.

La portada reproduce una tarjeta de papel con dos solapas, textura suave, pliegue central y capas independientes de acuarelas. Primero se separan los ramos de las esquinas, luego la corona, después el follaje y las solapas. El cierre recorre esa secuencia en sentido inverso.

Desde la primera pantalla, un nuevo gesto de rueda hacia arriba cierra las solapas; en celular, arrastrar hacia abajo. Al llegar al fondo de la última pantalla, un nuevo gesto de rueda hacia abajo —o un deslizamiento hacia arriba en celular— también cierra. Un gesto que llega desde otra sección no cierra automáticamente. Los campos del formulario quedan fuera del gesto táctil de cierre. También hay botones de cierre; las respuestas permanecen mientras la página siga abierta.

El itinerario muestra siempre un resumen de la vestimenta y un acceso destacado a la guía completa. La revisión y los siguientes pasos se encuentran en `AUDITORIA-DISENO.md`.

Las pruebas del cierre se ejecutan con `node --test tests/cover-gesture.test.mjs` (Node 24).
