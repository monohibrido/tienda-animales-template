import { Link } from 'react-router-dom'
import { STORE_CONFIG } from '../config.js'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <span className="inline-block rounded-full border border-mustard/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-mustard">
              Pedidos por WhatsApp
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {STORE_CONFIG.nombre}
            </h1>
            <p className="mt-4 max-w-md text-lg text-paper/80">{STORE_CONFIG.eslogan}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/catalogo"
                className="rounded-full bg-mustard px-6 py-3 text-sm font-semibold text-brand-dark transition hover:brightness-105"
              >
                Ver catálogo
              </Link>
              <Link
                to="/contacto"
                className="rounded-full border border-paper/30 px-6 py-3 text-sm font-semibold text-paper transition hover:bg-paper/10"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          {/* Elemento visual propio: mock de "boleta" de pedido */}
          <div className="hidden justify-self-end md:block">
            <div className="w-72 -rotate-2 rounded-sm bg-paper p-6 text-ink shadow-2xl">
              <p className="font-mono text-xs uppercase tracking-widest text-ink/50">Pedido #001</p>
              <div className="mt-4 space-y-2 border-b border-dashed border-ink/20 pb-4">
                <div className="flex justify-between text-sm">
                  <span>Producto 1</span>
                  <span className="font-mono">$9.990</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Producto 2</span>
                  <span className="font-mono">$14.990</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold">Enviar por</span>
                <span className="flex items-center gap-1.5 rounded-full bg-whats/10 px-2.5 py-1 text-xs font-semibold text-whats">
                  WhatsApp
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destacados / por qué elegirnos */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center font-display text-2xl font-semibold text-brand">¿Por qué elegirnos?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: 'Calidad', desc: 'Seleccionamos cada producto pensando en ti.' },
            { title: 'Cercanía', desc: 'Atención directa y personalizada por WhatsApp.' },
            { title: 'Rapidez', desc: 'Respondemos y coordinamos pedidos al instante.' },
          ].map((item, i) => (
            <div key={item.title} className="rounded-sm border border-ink/10 bg-white/60 p-6">
              <span className="font-mono text-xs text-mustard">0{i + 1}</span>
              <h3 className="mt-2 font-display font-semibold text-brand">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
