import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { STORE_CONFIG } from '../config.js'
import { useCart } from '../context/CartContext.jsx'
import { precio } from '../utils/format.js'

function armarMensaje(items, total) {
  const { encabezado, cierre } = STORE_CONFIG.mensajeCarrito
  const lineas = items.map((i, n) => {
    const detalle = i.opciones.length ? ` — ${i.opciones.map((o) => `${o.nombre}: ${o.valor}`).join(' — ')}` : ''
    return `${n + 1}) ${i.nombre}${detalle} — x${i.cantidad} — ${precio(i.precio * i.cantidad)}`
  })
  return [encabezado, '', ...lineas, '', `Total: ${precio(total)}`, '', cierre].join('\n')
}

export default function CartDrawer() {
  const { items, abierto, cerrar, cambiarCantidad, quitar, vaciar, total, cantidad } = useCart()

  useEffect(() => {
    if (!abierto) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const alTeclear = (e) => e.key === 'Escape' && cerrar()
    window.addEventListener('keydown', alTeclear)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', alTeclear)
    }
  }, [abierto, cerrar])

  if (!abierto) return null

  const enlaceWhatsApp = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(armarMensaje(items, total))}`

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      <div className="animate-aparecer absolute inset-0 bg-ink/50" onClick={cerrar} />

      <aside className="panel-derecha absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-[12px] font-semibold uppercase tracking-[0.2em]">
            Tu carrito {cantidad > 0 && <span className="text-ink/50">({cantidad})</span>}
          </h2>
          <button type="button" onClick={cerrar} className="text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink">
            ✕ Cerrar
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-sm text-ink/55">Tu carrito está vacío.</p>
            <Link
              to="/tienda"
              onClick={cerrar}
              className="rounded-full bg-brand px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper hover:bg-brand-dark"
            >
              Ver la tienda
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((i) => (
                <li key={i.clave} className="flex gap-4 rounded-md border border-ink/10 bg-white p-3">
                  <Link to={`/tienda/producto/${i.slug}`} onClick={cerrar} className="flex-none">
                    <img src={i.imagen} alt={i.nombre} className="h-24 w-24 rounded bg-white object-contain" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col text-sm">
                    <Link
                      to={`/tienda/producto/${i.slug}`}
                      onClick={cerrar}
                      className="font-display text-[13px] font-semibold leading-snug hover:text-brand"
                    >
                      {i.nombre}
                    </Link>
                    {i.opciones.length > 0 && (
                      <p className="mt-1 text-xs text-ink/55">{i.opciones.map((o) => o.valor).join(' · ')}</p>
                    )}
                    <p className="mt-1 font-mono text-xs text-ink/70">{precio(i.precio)}</p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-ink/20">
                        <button
                          type="button"
                          aria-label="Quitar uno"
                          onClick={() => cambiarCantidad(i.clave, -1)}
                          className="h-7 w-7 text-ink/70 hover:text-ink"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs">{i.cantidad}</span>
                        <button
                          type="button"
                          aria-label="Agregar uno"
                          onClick={() => cambiarCantidad(i.clave, 1)}
                          className="h-7 w-7 text-ink/70 hover:text-ink"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => quitar(i.clave)}
                        className="text-[11px] uppercase tracking-[0.15em] text-ink/50 underline underline-offset-4 hover:text-ink"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-ink/10 bg-white px-5 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-[0.15em]">Total</span>
                <span className="font-mono text-base font-semibold text-brand">{precio(total)}</span>
              </div>

              <a
                href={enlaceWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full bg-whats py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition hover:brightness-105"
              >
                Hacer pedido por WhatsApp
              </a>
              <button
                type="button"
                onClick={vaciar}
                className="mt-3 w-full text-center text-[11px] uppercase tracking-[0.15em] text-ink/50 hover:text-ink"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
