import { useSearchParams } from 'react-router-dom'
import { PRODUCTOS, CATEGORIAS } from '../data/productos.js'
import ProductCard from '../components/ProductCard.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'

// La categoría y subcategoría activas viven en la URL (/tienda?categoria=Perros&sub=Juguetes),
// así el botón "atrás" del navegador y los links compartidos conservan el filtro.
export default function Tienda() {
  const [params, setParams] = useSearchParams()

  const categoriaUrl = params.get('categoria')
  const categoria = categoriaUrl && CATEGORIAS[categoriaUrl] ? categoriaUrl : 'Todos'
  const subUrl = params.get('sub')
  const subcategoriasDisponibles = categoria !== 'Todos' ? CATEGORIAS[categoria] || [] : []
  const subcategoria = subUrl && subcategoriasDisponibles.includes(subUrl) ? subUrl : 'Todas'

  const opcionesPrincipales = ['Todos', ...Object.keys(CATEGORIAS)]
  const opcionesSub = ['Todas', ...subcategoriasDisponibles]

  function elegirCategoria(nueva) {
    // al cambiar de categoría, se reinicia la subcategoría
    setParams(nueva === 'Todos' ? {} : { categoria: nueva })
  }

  function elegirSubcategoria(nueva) {
    setParams(nueva === 'Todas' ? { categoria } : { categoria, sub: nueva })
  }

  const productosFiltrados = PRODUCTOS.filter((p) => {
    if (categoria !== 'Todos' && p.categoria !== categoria) return false
    if (subcategoria !== 'Todas' && p.subcategoria !== subcategoria) return false
    return true
  })

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold uppercase tracking-[0.25em] text-brand md:text-3xl">
          Tienda
        </h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink/50">
          {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'}
        </p>
      </div>

      <div className="mt-8">
        <CategoryFilter opciones={opcionesPrincipales} activa={categoria} onSeleccionar={elegirCategoria} />
      </div>

      {subcategoriasDisponibles.length > 0 && (
        <div className="mt-3">
          <CategoryFilter
            opciones={opcionesSub}
            activa={subcategoria}
            onSeleccionar={elegirSubcategoria}
            variant="secundario"
          />
        </div>
      )}

      {productosFiltrados.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {productosFiltrados.map((producto, i) => (
            <ProductCard key={producto.id} producto={producto} prioridad={i < 4} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-ink/50">No hay productos en esta categoría todavía.</p>
      )}
    </section>
  )
}
