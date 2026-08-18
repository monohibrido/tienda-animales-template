import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { STORE_CONFIG } from '../config.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/quienes-somos', label: 'Quiénes somos' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const inicial = STORE_CONFIG.nombre.trim().charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand font-display text-sm font-semibold text-paper">
            {inicial}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            {STORE_CONFIG.nombre}
          </span>
        </NavLink>

        {/* Menú desktop */}
        <ul className="hidden gap-8 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-brand ${
                    isActive ? 'text-brand' : 'text-ink/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa mobile */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Abrir menú"
          onClick={() => setOpen(!open)}
        >
          <span className={`h-0.5 w-6 bg-ink transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Menú mobile desplegable */}
      {open && (
        <ul className="flex flex-col border-t border-ink/10 bg-paper px-4 py-2 md:hidden">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-3 text-sm font-medium ${isActive ? 'text-brand' : 'text-ink/60'}`
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
