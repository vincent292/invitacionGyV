/** Datos editables de la invitación. Modifica este archivo para personalizarla. */
export const INVITACION = {
  pareja: { primero: 'Valeria', segundo: 'Gabriel', iniciales: ['V', 'G'] },
  fechaISO: '2026-12-12T16:00:00-04:00',
  fechaLarga: 'Sábado, 12 de diciembre de 2026',
  horaInicio: '16:00',
  lugar: 'Villa Andalucía',
  ubicacionUrl: 'https://qr.link/JikSqt', // Enlace leído del código QR del diseño entregado.
  // IMPORTANTE: colocar número WhatsApp de los novios u organizador,
  // con código de país y sin +, espacios ni guiones. Ej.: '591XXXXXXXX'.
  whatsappNumero: '',
  vestimenta: 'Formal primaveral',
  evitarColores: ['Blanco', 'Verde turquesa oscuro'],
  musicaUrl: '/assets/musica-instrumental.mp3', // Se puede reemplazar con otra pista MP3.
  cronograma: [
    { hora: '16:30', titulo: 'Cóctel de bienvenida', emoji: '🥂', detalle: 'Comenzamos la celebración' },
    { hora: '17:00', titulo: 'Ceremonia civil', emoji: '💍', detalle: 'El gran sí' },
    { hora: '18:30', titulo: 'Fotografías', emoji: '📷', detalle: 'Capturemos recuerdos' },
    { hora: '20:30', titulo: 'Cena', emoji: '🍽️', detalle: 'Compartamos la mesa' },
    { hora: '20:30', titulo: 'Pastel y brindis', emoji: '🍰', detalle: 'Un momento dulce' },
    { hora: '00:00', titulo: 'Despedida', emoji: '✨', detalle: 'Gracias por acompañarnos' },
  ],
} as const;
