import { useState } from 'react'
import { STORE_CONFIG } from '../config.js'
import ImageLightbox from './ImageLightbox.jsx'

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

export default function ProductCard({ producto }) {
  const [indice, setIndice] = useState(0)
  const [lightboxAbierto, setLightboxAbierto] = useState(false)
  const imagenes = producto.imagenes
  const tieneVarias = imagenes.length > 1

  const mensaje = `Hola, me interesa el producto: ${producto.nombre}`
  const url = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`

  function anterior(e) {
    e.stopPropagation()
    setIndice((indice - 1 + imagenes.length) % imagenes.length)
  }

  function siguiente(e) {
    e.stopPropagation()
    setIndice((indice + 1) % imagenes.length)
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Imagen sin recortar: se muestra tal cual, centrada dentro de la caja */}
      <div
        className="group relative flex h-56 w-full cursor-zoom-in items-center justify-center bg-paper"
        onClick={() => setLightboxAbierto(true)}
      >
        <img
          src={imagenes[indice]}
          alt={producto.nombre}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
          decoding="async"
        />

        {tieneVarias && (
          <>
            <button
              onClick={anterior}
              aria-label="Foto anterior"
              className="absolute left-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm text-ink opacity-0 shadow transition group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              onClick={siguiente}
              aria-label="Foto siguiente"
              className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm text-ink opacity-0 shadow transition group-hover:opacity-100"
            >
              ›
            </button>
            <div className="absolute bottom-2 flex gap-1">
              {imagenes.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === indice ? 'bg-brand' : 'bg-ink/20'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-dashed border-ink/15 bg-white p-4">
        <h3 className="font-display font-semibold text-ink">{producto.nombre}</h3>
        <p className="flex-1 text-sm text-ink/60">{producto.descripcion}</p>
        <p className="font-mono font-semibold text-brand">{formatoCLP.format(producto.precio)}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 rounded-full bg-whats px-4 py-2 text-center text-sm font-semibold text-white transition hover:brightness-105"
        >
          Pedir por WhatsApp
        </a>
      </div>

      {lightboxAbierto && (
        <ImageLightbox
          producto={producto}
          indiceActual={indice}
          onCambiarIndice={setIndice}
          onClose={() => setLightboxAbierto(false)}
        />
      )}
    </div>
  )
}

