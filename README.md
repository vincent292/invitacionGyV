# Valeria & Gabriel · Invitación de boda

Invitación en React, TypeScript, Vite y GSAP. Fondo marfil, acuarelas, puertas florales y seis capítulos:

1. La invitación.
2. Nuestro amor, con sus dos perritos y una foto opcional.
3. Fecha, lugar, mapa, calendario y cuenta regresiva.
4. Itinerario y vestimenta, con pestañas.
5. Lluvia de sobres.
6. Álbum de sus 13 recuerdos, sobre fotografías diagonales en movimiento, y cierre de la invitación.

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
- Fecha, mapa y cronograma: vienen del diseño entregado. Cena a las 20:30; pastel y brindis a las 21:30.
- `musicaUrl`: pista instrumental incluida, activada con el botón de apertura y controlable desde la cabecera. Para cambiarla, guardar el MP3 en `public/assets/nuestra-cancion.mp3` y poner `musicaUrl: '/assets/nuestra-cancion.mp3'` en `src/config.ts`. La ruta no lleva `public/`. También se puede reemplazar el archivo `musica-instrumental.mp3` manteniendo su nombre.

La imagen de los perritos conserva su apariencia de la referencia y reconstruye las partes que venían recortadas. Más información en `public/assets/NOTAS-ILUSTRACIONES.md`.

## Navegación y accesibilidad

Seis pantallas con scroll snap nativo para táctil, avance por gesto de rueda en escritorio, indicadores, flechas y accesos directos a lugar y lluvia de sobres. En pantallas bajas se permite scroll natural para no cortar contenido. Se respetan las preferencias de movimiento reducido, se oculta el contenido detrás del diálogo inicial con `inert`, y las pestañas admiten flechas, Home y End.

Los archivos anteriores a la revisión están en `.revision-original/`. `vista-previa.html` redirige a la aplicación para evitar mostrar la versión antigua.

La portada reproduce una tarjeta de papel con dos solapas, textura suave, pliegue central y capas independientes de acuarelas. Primero se separan los ramos de las esquinas, luego la corona, después el follaje y las solapas. El cierre recorre esa secuencia en sentido inverso.

Desde la primera pantalla, un nuevo gesto de rueda hacia arriba cierra las solapas; en celular, arrastrar hacia abajo. Al llegar al fondo de la última pantalla, un nuevo gesto de rueda hacia abajo —o un deslizamiento hacia arriba en celular— también cierra. Un gesto que llega desde otra sección no cierra automáticamente. También hay botones de cierre. La experiencia es solo una invitación, sin formulario de asistencia ni integración de base de datos.

El itinerario muestra siempre un resumen de la vestimenta y un acceso destacado a la guía completa. La revisión y los siguientes pasos se encuentran en `AUDITORIA-DISENO.md`.

Las pruebas del cierre se ejecutan con `node --test tests/cover-gesture.test.mjs` (Node 24).

## Fotografías y movimiento

El estilo elegido combina el álbum de papel con un fondo diagonal desde la hoja 02. Las columnas alternan subida y bajada en ciclos lentos de 43 a 57 segundos. La portada y la apertura mantienen su composición floral. La lluvia de sobres ocupa la hoja 05; el álbum cierra el recorrido en la hoja 06.

Los 13 originales se conservan en `public/assets/photos/`; sus rutas, textos alternativos y pies de foto están en `src/photos.ts`. El álbum comienza con el retrato de ambos vestidos de verde y continúa con la pedida, los paseos y los perritos. Las fotografías del álbum se muestran completas con `object-fit: contain`. El fondo decorativo puede recortarlas.

`fotosIntervaloMs: 1000` en `src/config.ts` define el pase automático cada segundo. Se inicia después de cargar y decodificar las fotos, solo cuando el álbum está visible. Las flechas, el teclado y el deslizamiento horizontal permiten elegir una foto y pausar el pase automático; el fondo sigue moviéndose. El botón de pausa del álbum y el control de fotografías de la cabecera detienen ambos movimientos. El pase también se detiene temporalmente al pasar el cursor por el álbum.

El movimiento se pausa cuando la pestaña no está visible. Con la preferencia de movimiento reducido, el fondo queda estático y el álbum comienza pausado. La música tiene su propio control.

`propuestas-fotos.html` conserva la comparación de las tres propuestas originales como referencia local. No se incorpora al build principal.
