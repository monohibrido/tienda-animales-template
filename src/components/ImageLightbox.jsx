import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { STORE_CONFIG } from '../config.js'

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

export default function ImageLightbox({ producto, indiceActual, onCambiarIndice, onClose }) {
  const { imagenes, nombre, precio, descripcion } = producto
  const mensaje = `Hola, me interesa el producto: ${nombre}`
  const url = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`

  const anterior = () => onCambiarIndice((indiceActual - 1 + imagenes.length) % imagenes.length)
  const siguiente = () => onCambiarIndice((indiceActual + 1) % imagenes.length)

  // Navegación por teclado: flechas y Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && imagenes.length > 1) anterior()
      if (e.key === 'ArrowRight' && imagenes.length > 1) siguiente()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [indiceActual])

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada de ${nombre}`}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col items-center overflow-y-auto rounded-sm bg-white p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink/70 shadow transition hover:bg-ink/10"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>

        {/* Imagen ampliada, tope 500x500px, se adapta sin recortarse ni deformarse */}
        <div className="relative flex h-[500px] max-h-[70vh] w-[500px] max-w-full items-center justify-center bg-paper">
          <img
            src={imagenes[indiceActual]}
            alt={`${nombre} - foto ${indiceActual + 1}`}
            className="max-h-full max-w-full object-contain"
          />

          {imagenes.length > 1 && (
            <>
              <button
                onClick={anterior}
                aria-label="Foto anterior"
                className="absolute left-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white"
              >
                ‹
              </button>
              <button
                onClick={siguiente}
                aria-label="Foto siguiente"
                className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white"
              >
                ›
              </button>
            </>
          )}
        </div>

        {imagenes.length > 1 && (
          <div className="mt-3 flex gap-1.5">
            {imagenes.map((_, i) => (
              <button
                key={i}
                onClick={() => onCambiarIndice(i)}
                aria-label={`Ir a foto ${i + 1}`}
                className={`h-2 w-2 rounded-full transition ${i === indiceActual ? 'bg-brand' : 'bg-ink/20'}`}
              />
            ))}
          </div>
        )}

        <div className="mt-4 w-full">
          <h3 className="font-display font-semibold text-ink">{nombre}</h3>
          <p className="mt-1 font-mono text-sm font-semibold text-brand">{formatoCLP.format(precio)}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">{descripcion}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-full bg-whats px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:brightness-105"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
