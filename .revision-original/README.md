# Invitación de boda — Valeria & Gabriel

Página web interactiva en **React + Vite + TypeScript + GSAP**. Diseño móvil primero, basado en las dos caras del tríptico entregado.

## Comenzar

```bash
npm install
npm run dev
```

Abrir el enlace local de Vite (usualmente `http://localhost:5173`). Para producción:

```bash
npm run build
```

Publicar en **Vercel** importando este directorio desde GitHub; framework Vite, directorio de salida `dist`.

## Funciones

- Apertura inicial con dos puertas reales que se deslizan hacia los lados al hacer clic, con una animación GSAP.
- Portada floral con el diseño original de la invitación, scroll animado, cuenta regresiva, lugar, mapa, itinerario, código de vestimenta y confirmación de asistencia.
- Música instrumental *original* incluida en `public/assets/musica-instrumental.mp3`, activada al tocar **Abrir invitación**. Puede pausarse o reanudarse desde el control flotante.
- Confirmación por WhatsApp: solicita el nombre del asistente, si asistirá y el número de personas, y redacta un mensaje automáticamente.
- Enlace al mapa recuperado del QR original: `https://qr.link/JikSqt`.
- Descarga de recordatorio para calendarios (`public/boda-valeria-gabriel.ics`).
- Accesibilidad: alternativa para usuarios con movimiento reducido, controles de teclado y etiquetas accesibles.

## Antes de compartir la web con los invitados

**1. Configurar WhatsApp.** Abrir `src/config.ts` y asignar la propiedad `whatsappNumero` al número que recibirá las confirmaciones, incluyendo código de país sin `+` ni espacios. Ejemplo: `'591XXXXXXXX'`. El número **no estaba en los recursos originales**. Mientras esté vacío, el botón sigue abriendo WhatsApp con el texto prellenado, pero el invitado deberá seleccionar al destinatario manualmente.

**2. Verificar ubicación.** Se recuperó del código QR la dirección corta `https://qr.link/JikSqt`. Abre este enlace en tu navegador para confirmar que dirige a la ubicación correcta de Villa Andalucía; puedes sustituirlo por una URL directa de Google Maps en `src/config.ts`.

**3. Confirmar el cronograma.** Los datos vienen de la tarjeta original: comienzo 16:00, cóctel 16:30, ceremonia 17:00, fotos 18:30, cena 20:30, pastel y brindis 20:30 y despedida 00:00. Los dos eventos de 20:30 se han preservado tal como aparecen impresos, aunque quizá deban ajustarse.

**4. Música.** Puedes reemplazar `public/assets/musica-instrumental.mp3` por otro archivo con ese mismo nombre. El archivo incluido es instrumental propio, sin canciones de terceros.

**5. RSVP.** Los mensajes se preparan en el dispositivo del invitado y se envían por WhatsApp, **no se guardan en una base de datos**.

## Personalización rápida

- Toda la información de los novios, fecha, lugar, mapa, WhatsApp y cronograma: `src/config.ts`.
- Colores, fondos y tipografía: `src/styles.css`.
- Textos de presentación, invitación y confirmación: `src/App.tsx`.
- Ilustraciones extraídas de las imágenes originales: `public/assets/*.png`.

## Tecnologías

React 19, Vite 7, TypeScript, GSAP 3 (incluye ScrollTrigger) y Lucide React. No necesita Supabase ni backend para funcionar.
