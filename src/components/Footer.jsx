import { STORE_CONFIG } from '../config.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-paper">{STORE_CONFIG.nombre}</h3>
          <p className="mt-2 text-sm text-paper/60">{STORE_CONFIG.eslogan}</p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-paper">Contacto</h4>
          <ul className="mt-2 space-y-1 text-sm text-paper/60">
            <li>{STORE_CONFIG.direccion}</li>
            <li>{STORE_CONFIG.horario}</li>
            <li>{STORE_CONFIG.emailContacto}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-paper">Síguenos</h4>
          <ul className="mt-2 space-y-1 text-sm text-paper/60">
            <li>
              <a href={STORE_CONFIG.redes.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-mustard">
                Instagram
              </a>
            </li>
            <li>
              <a href={STORE_CONFIG.redes.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-mustard">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-4 text-center text-xs text-paper/40">
        © {year} {STORE_CONFIG.nombre}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
