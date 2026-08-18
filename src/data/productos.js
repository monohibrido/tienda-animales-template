// Reemplaza estos productos por los reales del cliente.
//
// categoria / subcategoria: texto libre, ej: categoria 'Perros',
// subcategoria 'Alimento'. El menú de arriba del catálogo se arma solo a
// partir de estos dos campos — no hay que declarar las categorías en
// ningún otro archivo. Si un producto no necesita subcategoría, puedes
// dejar subcategoria: null y simplemente no aparecerá el segundo menú
// para esa categoría (o aparecerá igual si OTROS productos de la misma
// categoría sí tienen subcategoría).
//
// imagenes: arreglo con una o más fotos del producto. Acepta dos formatos,
// se pueden mezclar libremente dentro del mismo arreglo:
//   1) URL externa directa a la imagen, ej: 'https://i.imgur.com/xxxxx.jpg'
//      (tiene que apuntar directo al archivo, no a una página que la muestra)
//   2) Ruta local: guarda el archivo en /public/productos/ y referencia
//      '/productos/nombre-archivo.jpg' — más confiable, no depende de un
//      servicio externo que pueda caerse o cambiar el link.
//
// Si el producto tiene más de una foto, la card muestra flechitas para
// pasar entre ellas, y al hacer clic se abre un visor ampliado con las
// mismas fotos en tamaño grande.

export const PRODUCTOS = [
  {
    id: 1,
    nombre: 'Bravery Chicken Adult Cat 7 Kg',
    precio: 47990,
    categoria: 'Gatos',
    subcategoria: 'Alimentos',
    imagenes: ['/productos/gatos/alimentos/producto_1.png', '/productos/gatos/alimentos/producto_1-2.jpg'],
    // Ejemplo con varias fotos locales:
    // imagenes: ['/productos/producto-1-a.jpg', '/productos/producto-1-b.jpg'],
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
    id: 3,
    nombre: 'Producto 3',
    precio: 5990,
    categoria: 'Perros',
    subcategoria: 'Juguetes',
    imagenes: ['https://placehold.co/400x400?text=Producto+3'],
    descripcion: 'Descripción breve del producto 3.',
  },
  {
    id: 4,
    nombre: 'Producto 4',
    precio: 12990,
    categoria: 'Perros',
    subcategoria: 'Accesorios',
    imagenes: ['https://placehold.co/400x400?text=Producto+4'],
    descripcion: 'Descripción breve del producto 4.',
  },
  {
    id: 6,
    nombre: 'Producto 6',
    precio: 8990,
    categoria: 'Gatos',
    subcategoria: 'Juguetes',
    imagenes: ['https://placehold.co/400x400?text=Producto+6'],
    descripcion: 'Descripción breve del producto 6.',
  },
  {
    id: 7,
    nombre: 'Producto 7',
    precio: 18990,
    categoria: 'Gatos',
    subcategoria: 'Accesorios',
    imagenes: ['https://placehold.co/400x400?text=Producto+7'],
    descripcion: 'Descripción breve del producto 7.',
  },
]

// Árbol de categorías generado automáticamente a partir de PRODUCTOS.
// Forma: { 'Perros': ['Alimento', 'Juguetes', 'Accesorios'], 'Gatos': [...] }
// El orden respeta el orden en que aparecen por primera vez los productos.
export const CATEGORIAS = PRODUCTOS.reduce((arbol, producto) => {
  const { categoria, subcategoria } = producto
  if (!arbol[categoria]) arbol[categoria] = []
  if (subcategoria && !arbol[categoria].includes(subcategoria)) {
    arbol[categoria].push(subcategoria)
  }
  return arbol
}, {})




