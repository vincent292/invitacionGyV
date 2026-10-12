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
- `musicaUrl`: pista instrumental incluida, activada con el botón de apertura y controlable desde la cabecera.

La imagen de los perritos conserva su apariencia de la referencia y reconstruye las partes que venían recortadas. Más información en `public/assets/NOTAS-ILUSTRACIONES.md`.

## Navegación y accesibilidad

Cinco pantallas con scroll snap nativo para táctil, avance por gesto de rueda en escritorio, indicadores, flechas y accesos directos a lugar y confirmación. En pantallas bajas se permite scroll natural para no cortar contenido. El formulario desactiva el ajuste de scroll al enfocar sus campos. Se respetan las preferencias de movimiento reducido, se oculta el contenido detrás del diálogo inicial con `inert`, y las pestañas admiten flechas, Home y End.

Los archivos anteriores a la revisión están en `.revision-original/`. `vista-previa.html` redirige a la aplicación para evitar mostrar la versión antigua.
