// ============================================================
//  CATÁLOGO — reemplaza estos productos por los reales del cliente.
// ============================================================
//
// categoria / subcategoria: texto libre, ej: categoria 'Perros',
// subcategoria 'Alimentos'. Los menús del catálogo (/tienda) se arman solos
// a partir de estos dos campos — no hay que declarar las categorías en
// ningún otro archivo. Si un producto no necesita subcategoría, puedes
// dejar subcategoria: null.
//
// slug (opcional): es lo que aparece en la URL del producto
// (/tienda/producto/<slug>). Si lo omites se genera solo desde el nombre
// ("Comida de Perro" → comida-de-perro). Si dos productos generan el mismo
// slug, al segundo se le agrega su id para que no choquen.
//
// imagenes: arreglo con una o más fotos del producto. Acepta dos formatos,
// se pueden mezclar libremente dentro del mismo arreglo:
//   1) URL externa directa a la imagen, ej: 'https://i.imgur.com/xxxxx.jpg'
//   2) Ruta local: guarda el archivo en /public/productos/ y referencia
//      '/productos/nombre-archivo.jpg' — más confiable, no depende de un
//      servicio externo.
// La primera foto es la de la tienda; la segunda (si existe) aparece al pasar
// el mouse. En la página del producto se muestran todas.
//
// precio: precio base. Si el producto tiene opciones con precio propio (ver
// abajo), en la tienda se muestra "Desde $X" con el más barato.
//
// opciones (opcional): lo que el cliente debe elegir antes de agregar al
// carrito (equivalente a las tallas de una tienda de ropa). Ejemplos:
//
//   opciones: [
//     { nombre: 'Peso', valores: [
//         { valor: '3 kg',  precio: 14990 },   // precio propio de esta opción
//         { valor: '15 kg', precio: 54990 },
//     ]},
//     { nombre: 'Sabor', valores: ['Pollo', 'Cordero'] },  // sin cambio de precio
//   ]
//
// - Cada valor puede ser un texto simple o un objeto { valor, precio }.
// - Si el valor elegido define "precio", reemplaza al precio base.
// - Si una opción tiene un solo valor, queda preseleccionada.
// - Un producto sin "opciones" se agrega al carrito directamente.

const slugificar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const LISTA = [
  {
    id: 1,
    nombre: 'Bravery Chicken Adult Cat 7 Kg',
    precio: 47990,
    categoria: 'Gatos',
    subcategoria: 'Alimentos',
    imagenes: ['/productos/gatos/alimentos/producto_1.png', '/productos/gatos/alimentos/producto_1-2.jpg'],
    descripcion: 'Bravery es una gama de alimentos secos para perros y gatos de prestigio. Se trata de un producto libre de cereales, mono proteico, con carne siempre como primer ingrediente, solo con antioxidantes, hipo alergénico y con productos 100% naturales.',
  },
  {
    id: 2,
    nombre: 'Juguete Para Perro De Colores',
    precio: 14990,
    categoria: 'Perros',
    subcategoria: 'Juguetes',
    imagenes: ['/productos/perros/juguetes/juguete_producto_1.png'],
    descripcion: 'Juguete Para Perro De Colores es un nuevo juguete para perros, incluye squeaker, lo cual le llamará la atención al momento del juego.',
  },
  {
    // Ejemplo de producto CON opciones: peso (cambia el precio) y sabor.
    id: 8,
    nombre: 'Comida de Perro',
    precio: 14990,
    categoria: 'Perros',
    subcategoria: 'Alimentos',
    imagenes: ['https://placehold.co/800x800?text=Comida+de+Perro'],
    descripcion: 'Alimento seco balanceado para perros adultos. Elige la presentación y el sabor que prefiera tu regalón.',
    opciones: [
      {
        nombre: 'Peso',
        valores: [
          { valor: '3 kg', precio: 14990 },
          { valor: '10 kg', precio: 39990 },
          { valor: '15 kg', precio: 54990 },
        ],
      },
      { nombre: 'Sabor', valores: ['Pollo', 'Cordero'] },
    ],
  },
  {
    id: 3,
    nombre: 'Producto 3',
    precio: 5990,
    categoria: 'Perros',
    subcategoria: 'Juguetes',
    imagenes: ['https://placehold.co/800x800?text=Producto+3'],
    descripcion: 'Descripción breve del producto 3.',
  },
  {
    id: 4,
    nombre: 'Producto 4',
    precio: 12990,
    categoria: 'Perros',
    subcategoria: 'Accesorios',
    imagenes: ['https://placehold.co/800x800?text=Producto+4'],
    descripcion: 'Descripción breve del producto 4.',
  },
  {
    id: 6,
    nombre: 'Producto 6',
    precio: 8990,
    categoria: 'Gatos',
    subcategoria: 'Juguetes',
    imagenes: ['https://placehold.co/800x800?text=Producto+6'],
    descripcion: 'Descripción breve del producto 6.',
  },
  {
    id: 7,
    nombre: 'Producto 7',
    precio: 18990,
    categoria: 'Gatos',
    subcategoria: 'Accesorios',
    imagenes: ['https://placehold.co/800x800?text=Producto+7'],
    descripcion: 'Descripción breve del producto 7.',
  },
]

// ------------------------------------------------------------
// A partir de aquí no hay que editar nada.
// ------------------------------------------------------------

// Normaliza las opciones: cada valor queda como { valor, precio? }
function normalizarOpciones(opciones = []) {
  return opciones.map((o) => ({
    nombre: o.nombre,
    valores: o.valores.map((v) => (typeof v === 'string' ? { valor: v } : v)),
  }))
}

const usados = new Set()

export const PRODUCTOS = LISTA.map((p) => {
  let slug = p.slug || slugificar(p.nombre)
  if (usados.has(slug)) slug = `${slug}-${p.id}`
  usados.add(slug)
  return { ...p, slug, opciones: normalizarOpciones(p.opciones) }
})

export const buscarProducto = (slug) => PRODUCTOS.find((p) => p.slug === slug)

// Precio final según las opciones elegidas ({ Peso: '10 kg', Sabor: 'Pollo' }).
// El último valor elegido que defina "precio" reemplaza al precio base.
export function precioConOpciones(producto, seleccion = {}) {
  let resultado = producto.precio
  for (const opcion of producto.opciones) {
    const elegido = opcion.valores.find((v) => v.valor === seleccion[opcion.nombre])
    if (elegido && elegido.precio != null) resultado = elegido.precio
  }
  return resultado
}

// Precio más bajo posible (para mostrar "Desde $X" en la tienda)
export function precioDesde(producto) {
  const precios = producto.opciones.flatMap((o) => o.valores.map((v) => v.precio).filter((x) => x != null))
  return precios.length ? Math.min(producto.precio, ...precios) : producto.precio
}

export const tienePreciosVariables = (producto) =>
  producto.opciones.some((o) => o.valores.some((v) => v.precio != null))

// Árbol de categorías generado automáticamente a partir de PRODUCTOS.
// Forma: { 'Perros': ['Alimentos', 'Juguetes', 'Accesorios'], 'Gatos': [...] }
// El orden respeta el orden en que aparecen por primera vez los productos.
export const CATEGORIAS = PRODUCTOS.reduce((arbol, producto) => {
  const { categoria, subcategoria } = producto
  if (!arbol[categoria]) arbol[categoria] = []
  if (subcategoria && !arbol[categoria].includes(subcategoria)) {
    arbol[categoria].push(subcategoria)
  }
  return arbol
}, {})
