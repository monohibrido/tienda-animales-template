import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { STORE_CONFIG } from '../config.js'
import { PRODUCTOS } from '../data/productos.js'
import ProductCard from '../components/ProductCard.jsx'

// Mezcla Fisher-Yates (no muta el arreglo original)
function mezclar(lista) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

export default function Home() {
  const { banner, productosDelMes } = STORE_CONFIG

  // Productos aleatorios: se sortean una vez cada vez que se entra al Home
  const destacados = useMemo(() => mezclar(PRODUCTOS).slice(0, productosDelMes), [productosDelMes])

  return (
    <div>
      {/* Banner de portada. Mantiene la proporción de la imagen para que la foto no se recorte. */}
      <section className="w-full overflow-hidden bg-brand">
        <h1 className="sr-only">{STORE_CONFIG.nombre}</h1>
        <picture>
          {banner.imagenMovil && <source media="(max-width: 767px)" srcSet={banner.imagenMovil} />}
          <img
            src={banner.imagen}
            alt={banner.alt}
            fetchPriority="high"
            className="aspect-[8/9] w-full object-cover md:aspect-[8/3]"
          />
        </picture>
      </section>

      {/* Productos del mes */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="text-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-mustard">Selección</span>
          <h2 className="mt-1 font-display text-2xl font-semibold uppercase tracking-[0.2em] text-brand md:text-3xl">
            Productos del mes
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-5">
          {destacados.map((producto, i) => (
            <ProductCard key={producto.id} producto={producto} prioridad={i < 5} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/tienda"
            className="inline-block rounded-full bg-brand px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper transition hover:bg-brand-dark"
          >
            Ver toda la tienda
          </Link>
        </div>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-center font-display text-2xl font-semibold text-brand">¿Por qué elegirnos?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: 'Calidad', desc: 'Seleccionamos cada producto pensando en ti.' },
            { title: 'Cercanía', desc: 'Atención directa y personalizada por WhatsApp.' },
            { title: 'Rapidez', desc: 'Respondemos y coordinamos pedidos al instante.' },
          ].map((item, i) => (
            <div key={item.title} className="rounded-sm border border-ink/10 bg-white/60 p-6">
              
              <h3 className="mt-2 font-display font-semibold text-brand">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
