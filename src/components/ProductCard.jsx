import { useState } from 'react'
import { Link } from 'react-router-dom'
import { precio } from '../utils/format.js'
import { precioDesde, tienePreciosVariables } from '../data/productos.js'

// Tarjeta de la tienda: foto grande, nombre y precio. Al pasar el mouse
// aparece la segunda foto (si existe). Todo el bloque lleva a la página del producto.
export default function ProductCard({ producto, prioridad = false }) {
  const [cargada, setCargada] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <Link
      to={`/tienda/producto/${producto.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-md border border-ink/10 bg-white transition group-hover:border-ink/25">
        <img
          ref={(el) => {
            if (el && el.complete && el.naturalWidth > 0) setCargada(true)
          }}
          src={producto.imagenes[0]}
          alt={producto.nombre}
          loading={prioridad ? 'eager' : 'lazy'}
          decoding="async"
          width="800"
          height="800"
          onLoad={() => setCargada(true)}
          className={`absolute inset-0 h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.03] ${
            cargada ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* La segunda foto solo se descarga cuando el usuario pasa el mouse */}
        {hover && producto.imagenes[1] && (
          <img
            src={producto.imagenes[1]}
            alt=""
            decoding="async"
            className="animate-aparecer absolute inset-0 h-full w-full bg-white object-contain p-3"
          />
        )}

        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink/60">
          {producto.subcategoria || producto.categoria}
        </span>
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="font-display text-[13px] font-semibold leading-snug text-ink group-hover:text-brand">
          {producto.nombre}
        </h3>
        <p className="mt-1 font-mono text-sm text-ink/70">
          {tienePreciosVariables(producto) && <span className="mr-1 text-[11px] uppercase text-ink/45">Desde</span>}
          {precio(precioDesde(producto))}
        </p>
      </div>
    </Link>
  )
}
