/** Datos editables de la invitación. Modifica este archivo para personalizarla. */
export const INVITACION = {
  pareja: { primero: 'Valeria', segundo: 'Gabriel', iniciales: ['V', 'G'] },
  // Añade una foto a public/assets y escribe su ruta aquí para mostrarla en «Nosotros».
  fotoPareja: '' as string,
  // Cambio automático del álbum: 1000 ms = un segundo. Flechas y pausa permiten detenerlo.
  fotosIntervaloMs: 1000,
  fechaISO: '2026-12-12T16:00:00-04:00',
  fechaLarga: 'Sábado, 12 de diciembre de 2026',
  horaInicio: '16:00',
  lugar: 'Villa Andalucía',
  ubicacionUrl: 'https://maps.app.goo.gl/f9pzopjaPLZu7MTd9?g_st=iwb',// Enlace leído del código QR del diseño entregado.
  vestimenta: 'Formal primaveral',
  evitarColores: ['Blanco', 'Verde turquesa oscuro'],
  // Guarda la nueva canción en public/assets/ y escribe su ruta aquí.
  // Ejemplo: public/assets/nuestra-cancion.mp3 → '/assets/nuestra-cancion.mp3'.
  musicaUrl: '/assets/nuestra-cancion.mp3',
  cronograma: [
    { hora: '16:30', titulo: 'Cóctel de bienvenida', icono: 'coctel', detalle: 'Comenzamos la celebración' },
    { hora: '17:00', titulo: 'Ceremonia civil', icono: 'ceremonia', detalle: 'El gran sí' },
    { hora: '18:30', titulo: 'Fotografías', icono: 'fotos', detalle: 'Capturemos recuerdos' },
    { hora: '20:30', titulo: 'Cena', icono: 'cena', detalle: 'Compartamos la mesa' },
    { hora: '21:30', titulo: 'Pastel y brindis', icono: 'pastel', detalle: 'Un momento dulce' },
    { hora: '00:00', titulo: 'Despedida', icono: 'despedida', detalle: 'Gracias por acompañarnos' },
  ],
} as const;
