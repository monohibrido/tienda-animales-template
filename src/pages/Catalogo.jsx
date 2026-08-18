import { useState } from 'react'
import { PRODUCTOS, CATEGORIAS } from '../data/productos.js'
import ProductCard from '../components/ProductCard.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'

export default function Catalogo() {
  const [categoria, setCategoria] = useState('Todos')
  const [subcategoria, setSubcategoria] = useState('Todas')

  const opcionesPrincipales = ['Todos', ...Object.keys(CATEGORIAS)]
  const subcategoriasDisponibles = categoria !== 'Todos' ? CATEGORIAS[categoria] || [] : []
  const opcionesSub = ['Todas', ...subcategoriasDisponibles]

  function elegirCategoria(nueva) {
    setCategoria(nueva)
    setSubcategoria('Todas') // al cambiar de categoría, se reinicia la subcategoría
  }

  const productosFiltrados = PRODUCTOS.filter((p) => {
    if (categoria !== 'Todos' && p.categoria !== categoria) return false
    if (subcategoria !== 'Todas' && p.subcategoria !== subcategoria) return false
    return true
  })

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <span className="block text-center font-mono text-xs uppercase tracking-widest text-mustard">
        Sin carro de compras, sin vueltas
      </span>
      <h1 className="mt-2 text-center font-display text-3xl font-semibold text-brand">Catálogo</h1>
      <p className="mx-auto mt-2 max-w-xl text-center text-ink/60">
        Explora nuestros productos y pide directamente por WhatsApp.
      </p>

      <div className="mt-8">
        <CategoryFilter opciones={opcionesPrincipales} activa={categoria} onSeleccionar={elegirCategoria} />
      </div>

      {subcategoriasDisponibles.length > 0 && (
        <div className="mt-4">
          <CategoryFilter
            opciones={opcionesSub}
            activa={subcategoria}
            onSeleccionar={setSubcategoria}
            variant="secundario"
          />
        </div>
      )}

      {productosFiltrados.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-ink/50">No hay productos en esta categoría todavía.</p>
      )}
    </section>
  )
}
