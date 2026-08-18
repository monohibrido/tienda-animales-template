import { STORE_CONFIG } from '../config.js'

export default function QuienesSomos() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-3xl font-semibold text-brand">Quiénes somos</h1>
      <p className="mt-6 leading-relaxed text-ink/70">
        {STORE_CONFIG.nombre} nace con el objetivo de ofrecer productos de calidad con
        atención cercana y personalizada. Aquí va la historia de la tienda, su misión y
        lo que la hace diferente. Reemplaza este texto con la información real del cliente.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-sm border border-ink/10 bg-white/60 p-6">
          <h3 className="font-display font-semibold text-brand">Nuestra misión</h3>
          <p className="mt-2 text-sm text-ink/60">
            Describe brevemente la misión de la tienda: qué ofrecen y a quién.
          </p>
        </div>
        <div className="rounded-sm border border-ink/10 bg-white/60 p-6">
          <h3 className="font-display font-semibold text-brand">Nuestros valores</h3>
          <p className="mt-2 text-sm text-ink/60">
            Calidad, cercanía, honestidad, compromiso con el barrio/comunidad.
          </p>
        </div>
      </div>
    </section>
  )
}
