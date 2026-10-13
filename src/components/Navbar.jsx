import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { STORE_CONFIG } from '../config.js'
import { useCart } from '../context/CartContext.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/tienda', label: 'Tienda' },
  { to: '/quienes-somos', label: 'Quiénes somos' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cantidad, abrir } = useCart()

  const inicial = STORE_CONFIG.nombre.trim().charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 md:px-8">
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand font-display text-sm font-semibold text-paper">
            {inicial}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            {STORE_CONFIG.nombre}
          </span>
        </NavLink>

        {/* Menú desktop */}
        <ul className="hidden gap-9 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `text-[11px] font-medium uppercase tracking-[0.18em] transition hover:text-brand ${
                    isActive ? 'text-brand' : 'text-ink/55'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={abrir}
            aria-label={`Abrir carrito (${cantidad})`}
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink hover:text-brand"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span className="hidden sm:inline">Carrito</span>
            <span
              data-testid="contador-carrito"
              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
                cantidad > 0 ? 'bg-mustard text-brand-dark' : 'bg-ink/10 text-ink/60'
              }`}
            >
              {cantidad}
            </span>
          </button>

          {/* Botón hamburguesa mobile */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className={`h-0.5 w-6 bg-ink transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-6 bg-ink transition ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-ink transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Menú mobile desplegable */}
      {open && (
        <ul className="flex flex-col border-t border-ink/10 bg-paper px-4 py-2 md:hidden">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-3 text-[11px] font-medium uppercase tracking-[0.18em] ${isActive ? 'text-brand' : 'text-ink/60'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
