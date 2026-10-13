// ============================================================
// CONFIGURACIÓN DE LA TIENDA
// Edita solo este archivo para personalizar cada cliente nuevo.
// ============================================================

export const STORE_CONFIG = {
  nombre: "Mi Tienda",
  eslogan: "Calidad y buen precio, cerca de ti",

  // Número en formato internacional SIN + ni espacios (ej: Chile 56 9 xxxxxxxx)
  whatsapp: "56930570613",
  mensajeWhatsapp: "Hola, quiero hacer un pedido",

  // Correo al que llegarán los mensajes del formulario de contacto
  emailContacto: "contacto@mitienda.cl",

  // Endpoint de Formspree o Web3Forms (ver instrucciones en README.md)
  formEndpoint: "https://formspree.io/f/mljrwlke",

  direccion: "Av. Siempre Viva 123, Santiago",
  horario: "Lunes a Sábado, 10:00 - 20:00",

  // Mapa de la página Contacto (Google Maps, sin API key).
  //  - busqueda: lugar que muestra el mapa (usado para el enlace "Abrir en Google Maps").
  //  - embedUrl: opcional. Si quieres un pin exacto, en Google Maps → Compartir → Insertar un mapa,
  //    copia solo la URL que está dentro de src="..." y pégala aquí (tiene prioridad sobre "busqueda").
  mapa: {
    busqueda: "Metro Ciudad del Niño, San Miguel, Santiago",
    embedUrl: "https://www.google.com/maps?q=Metro+Ciudad+del+Ni%C3%B1o,+San+Miguel,+Santiago&output=embed",
  },

  redes: {
    instagram: "https://instagram.com/mitienda",
    facebook: "https://facebook.com/mitienda",
  },

  // ---------- Home ----------
  // Banner de portada (reemplaza public/banner.svg y public/banner-movil.svg por tus fotos jpg/webp
  // y ajusta las rutas aquí).
  //  - imagen:      horizontal 2000 x 750 px (escritorio)
  //  - imagenMovil: vertical 800 x 900 px (celular, hasta 767 px de ancho). Si la dejas vacía ('')
  //                 se usa la misma imagen en todos los tamaños.
  banner: {
    imagen: "/banner.jpg",
    imagenMovil: "/banner-movil.svg",
    alt: "Todo para tu mascota",
  },

  // Cuántos productos aleatorios se muestran en "Productos del mes" del Home
  productosDelMes: 5,

  // Crédito del footer
  creditoTexto: "Hecho por DaleClick.cl",
  creditoUrl: "https://daleclick.cl",

  // ---------- Carrito de compras ----------
  // El carrito arma el pedido completo y lo envía por WhatsApp.
  mensajeCarrito: {
    encabezado: "Hola! Quisiera hacer este pedido:",
    cierre: "¿Me confirman disponibilidad, despacho y forma de pago? Gracias!",
  },

  // Cuántos "productos relacionados" se muestran bajo cada producto
  relacionados: 4,

  // Información general que aparece en el detalle de cada producto
  informacionProducto: [
    "Despachos a todo Chile. Coordinamos por WhatsApp.",
    "Retiro en tienda disponible. Consulta stock antes de venir.",
  ],
}
