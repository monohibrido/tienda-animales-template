import { useState, useEffect } from 'react'
import { STORE_CONFIG } from '../config.js'

const initialState = { nombre: '', email: '', mensaje: '' }
const COOLDOWN_MS = 3 * 60 * 1000 // 3 minutos
const STORAGE_KEY = 'ultimo_envio_contacto'

export default function Contacto() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [segundosRestantes, setSegundosRestantes] = useState(0)

  // Revisa si ya hay un cooldown activo (por ejemplo, si recarga la página) y lo cuenta hacia atrás
  useEffect(() => {
    const tick = () => {
      const ultimoEnvio = Number(localStorage.getItem(STORAGE_KEY) || 0)
      const restante = Math.ceil((ultimoEnvio + COOLDOWN_MS - Date.now()) / 1000)
      setSegundosRestantes(restante > 0 ? restante : 0)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (segundosRestantes > 0) return

    setStatus('sending')

    try {
      const res = await fetch(STORE_CONFIG.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })

      if (res.ok) {
        setStatus('ok')
        setForm(initialState)
        localStorage.setItem(STORAGE_KEY, String(Date.now()))
        setSegundosRestantes(COOLDOWN_MS / 1000)
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  const bloqueado = segundosRestantes > 0
  const minutos = Math.floor(segundosRestantes / 60)
  const segundos = String(segundosRestantes % 60).padStart(2, '0')

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl font-semibold text-brand">Contacto</h1>
      <p className="mt-2 text-ink/60">
        Escríbenos y te responderemos a la brevedad a través de este mismo correo.
      </p>
      <p className="mt-1 text-xs text-ink/40">
        Por seguridad, solo se permite un mensaje cada 3 minutos.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {/* Asunto fijo del correo que le llega al dueño de la tienda */}
        <input type="hidden" name="_subject" value={`Nuevo mensaje de contacto — ${STORE_CONFIG.nombre}`} />
        {/* Campo trampa para bots (Formspree lo ignora si viene vacío) */}
        <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="hidden" />

        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-ink/70">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={handleChange}
            className="mt-1 w-full rounded-sm border border-ink/20 bg-white px-3 py-2 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink/70">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-sm border border-ink/20 bg-white px-3 py-2 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-ink/70">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            required
            value={form.mensaje}
            onChange={handleChange}
            className="mt-1 w-full rounded-sm border border-ink/20 bg-white px-3 py-2 focus:border-brand focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending' || bloqueado}
          className="mt-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-paper transition hover:brightness-110 disabled:opacity-50"
        >
          {status === 'sending'
            ? 'Enviando...'
            : bloqueado
              ? `Podrás enviar otro mensaje en ${minutos}:${segundos}`
              : 'Enviar mensaje'}
        </button>

        {status === 'ok' && (
          <p className="text-sm font-medium text-brand">
            ¡Mensaje enviado! Te responderemos a la brevedad.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm font-medium text-terracota">
            Hubo un problema al enviar el mensaje. Intenta nuevamente o escríbenos por WhatsApp.
          </p>
        )}
      </form>

      <p className="mt-6 text-sm text-ink/50">
        También puedes escribirnos directamente a{' '}
        <a href={`mailto:${STORE_CONFIG.emailContacto}`} className="font-medium text-brand underline">
          {STORE_CONFIG.emailContacto}
        </a>
      </p>
    </section>
  )
}
