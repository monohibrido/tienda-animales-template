import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { STORE_CONFIG } from '../config.js'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { PRODUCTOS, buscarProducto, precioConOpciones, precioDesde, tienePreciosVariables } from '../data/productos.js'
import { precio } from '../utils/format.js'

function obtenerRelacionados(producto, cantidad) {
  const mismos = PRODUCTOS.filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
  const otros = PRODUCTOS.filter((p) => p.categoria !== producto.categoria)
  return [...mismos, ...otros].slice(0, cantidad)
}

export default function ProductoPage() {
  const { slug } = useParams()
  const producto = buscarProducto(slug)

  if (!producto) {
    return (
      <div className="px-4 py-24 text-center">
        <p className="text-sm text-ink/55">No encontramos este producto.</p>
        <Link
          to="/tienda"
          className="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] text-brand underline underline-offset-4"
        >
          Volver a la tienda
        </Link>
      </div>
    )
  }

  // key={slug}: al navegar a otro producto (ej. desde "relacionados") se reinicia toda la selección
  return <DetalleProducto key={producto.slug} producto={producto} />
}

function DetalleProducto({ producto }) {
  const { agregar } = useCart()

  const [fotoActiva, setFotoActiva] = useState(0)
  const [cantidad, setCantidad] = useState(1)
  const [aviso, setAviso] = useState(false)
  // Una opción con un solo valor queda preseleccionada
  const [seleccion, setSeleccion] = useState(() =>
    Object.fromEntries(producto.opciones.filter((o) => o.valores.length === 1).map((o) => [o.nombre, o.valores[0].valor]))
  )

  const faltantes = producto.opciones.filter((o) => !seleccion[o.nombre])
  const variable = tienePreciosVariables(producto)
  const hayPrecioElegido = !variable || faltantes.length < producto.opciones.length
  const precioUnitario = hayPrecioElegido ? precioConOpciones(producto, seleccion) : precioDesde(producto)

  const elegir = (nombre, valor) => {
    setSeleccion((prev) => ({ ...prev, [nombre]: valor }))
    setAviso(false)
  }

  const alAgregar = () => {
    if (faltantes.length > 0) {
      setAviso(true)
      return
    }
    agregar(producto, seleccion, precioUnitario, cantidad)
    setCantidad(1)
  }

  const detalleConsulta = producto.opciones.length
    ? ` (${producto.opciones.map((o) => seleccion[o.nombre] || o.nombre).join(', ')})`
    : ''
  const urlConsulta = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(
    `Hola, tengo una consulta sobre: ${producto.nombre}${detalleConsulta}`
  )}`

  const relacionados = obtenerRelacionados(producto, STORE_CONFIG.relacionados)

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        {/* Migas de pan */}
        <nav aria-label="Ruta" className="mb-5 text-[11px] uppercase tracking-[0.18em] text-ink/50">
          <Link to="/tienda" className="hover:text-ink">Tienda</Link>
          <span className="mx-2">/</span>
          <Link to={`/tienda?categoria=${encodeURIComponent(producto.categoria)}`} className="hover:text-ink">
            {producto.categoria}
          </Link>
          {producto.subcategoria && (
            <>
              <span className="mx-2">/</span>
              <Link
                to={`/tienda?categoria=${encodeURIComponent(producto.categoria)}&sub=${encodeURIComponent(producto.subcategoria)}`}
                className="hover:text-ink"
              >
                {producto.subcategoria}
              </Link>
            </>
          )}
        </nav>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-14">
          {/* ---------- Izquierda: galería ---------- */}
          <div className="flex flex-col-reverse gap-3 md:flex-row">
            {producto.imagenes.length > 1 && (
              <div className="flex gap-2 md:flex-col">
                {producto.imagenes.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setFotoActiva(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`h-16 w-16 flex-none overflow-hidden rounded border bg-white md:h-20 md:w-20 ${
                      i === fotoActiva ? 'border-brand' : 'border-ink/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}

            <div className="relative aspect-square flex-1 overflow-hidden rounded-lg border border-ink/10 bg-white">
              <img
                key={producto.imagenes[fotoActiva]}
                src={producto.imagenes[fotoActiva]}
                alt={producto.nombre}
                fetchPriority="high"
                decoding="async"
                className="animate-aparecer absolute inset-0 h-full w-full object-contain p-6"
              />
            </div>
          </div>

          {/* ---------- Derecha: información y compra ---------- */}
          <div className="self-start md:sticky md:top-24">
            <div className="rounded-lg border border-ink/10 bg-white p-6 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-mustard">
                {producto.categoria}
                {producto.subcategoria ? ` · ${producto.subcategoria}` : ''}
              </span>
              <h1 className="mt-2 font-display text-xl font-semibold leading-tight text-ink md:text-2xl">
                {producto.nombre}
              </h1>
              <p className="mt-3 font-mono text-2xl font-semibold text-brand" data-testid="precio-producto">
                {!hayPrecioElegido && <span className="mr-2 text-xs font-normal uppercase text-ink/45">Desde</span>}
                {precio(precioUnitario)}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-ink/70">{producto.descripcion}</p>

              {/* Opciones del producto */}
              {producto.opciones.map((opcion) => (
                <div key={opcion.nombre} className="mt-7">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
                    {opcion.nombre}
                    {seleccion[opcion.nombre] && (
                      <span className="ml-2 font-normal normal-case tracking-normal text-ink/55">
                        {seleccion[opcion.nombre]}
                      </span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label={opcion.nombre}>
                    {opcion.valores.map((v) => {
                      const activa = seleccion[opcion.nombre] === v.valor
                      return (
                        <button
                          key={v.valor}
                          type="button"
                          onClick={() => elegir(opcion.nombre, v.valor)}
                          aria-pressed={activa}
                          className={`rounded-md border px-4 py-2.5 text-left text-xs transition ${
                            activa
                              ? 'border-brand bg-brand text-paper'
                              : 'border-ink/20 bg-white hover:border-brand'
                          }`}
                        >
                          <span className="block font-semibold uppercase tracking-wider">{v.valor}</span>
                          {v.precio != null && (
                            <span className={`mt-0.5 block font-mono text-[11px] ${activa ? 'text-paper/80' : 'text-ink/50'}`}>
                              {precio(v.precio)}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
              {aviso && (
                <p role="alert" className="mt-3 text-xs text-terracota">
                  Selecciona {faltantes.map((o) => o.nombre.toLowerCase()).join(' y ')} para continuar.
                </p>
              )}

              {/* Cantidad + comprar */}
              <div className="mt-8 flex items-stretch gap-3">
                <div className="flex items-center rounded-full border border-ink/20">
                  <button
                    type="button"
                    aria-label="Menos"
                    onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                    className="h-12 w-11 text-lg text-ink/70 hover:text-ink"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm" aria-live="polite">{cantidad}</span>
                  <button
                    type="button"
                    aria-label="Más"
                    onClick={() => setCantidad((c) => c + 1)}
                    className="h-12 w-11 text-lg text-ink/70 hover:text-ink"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={alAgregar}
                  className="flex-1 rounded-full bg-brand px-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-paper transition hover:bg-brand-dark"
                >
                  Añadir al carrito
                </button>
              </div>

              <a
                href={urlConsulta}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block rounded-full border border-whats/50 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-whats transition hover:bg-whats/10"
              >
                Consultar por WhatsApp
              </a>

              <ul className="mt-7 space-y-2 border-t border-dashed border-ink/15 pt-5 text-xs leading-relaxed text-ink/55">
                {STORE_CONFIG.informacionProducto.map((linea) => (
                  <li key={linea}>{linea}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Productos relacionados ---------- */}
      {relacionados.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-14 pt-4 md:px-8">
          <h2 className="pb-6 text-center text-[11px] font-semibold uppercase tracking-[0.3em]">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {relacionados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
