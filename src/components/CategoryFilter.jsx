// Filtro de categorías. "principal" = categorías (Perros, Gatos…),
// "secundario" = subcategorías (Alimentos, Juguetes…).
export default function CategoryFilter({ opciones, activa, onSeleccionar, variant = 'principal' }) {
  const esPrincipal = variant === 'principal'

  return (
    <nav
      aria-label={esPrincipal ? 'Categorías' : 'Subcategorías'}
      className={`flex flex-wrap justify-center ${esPrincipal ? 'gap-2' : 'gap-1.5'}`}
    >
      {opciones.map((opcion) => {
        const seleccionada = opcion === activa
        return (
          <button
            key={opcion}
            type="button"
            onClick={() => onSeleccionar(opcion)}
            aria-pressed={seleccionada}
            className={`rounded-full border uppercase transition ${
              esPrincipal
                ? 'px-5 py-2 text-[11px] font-semibold tracking-[0.18em]'
                : 'px-3.5 py-1.5 text-[10px] font-medium tracking-[0.15em]'
            } ${
              seleccionada
                ? esPrincipal
                  ? 'border-brand bg-brand text-paper'
                  : 'border-mustard bg-mustard text-brand-dark'
                : 'border-ink/15 bg-white text-ink/60 hover:border-ink/40 hover:text-ink'
            }`}
          >
            {opcion}
          </button>
        )
      })}
    </nav>
  )
}
