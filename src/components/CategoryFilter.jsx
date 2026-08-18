export default function CategoryFilter({ opciones, activa, onSeleccionar, variant = 'principal' }) {
  const esPrincipal = variant === 'principal'

  return (
    <nav
      className={`flex flex-wrap justify-center border-ink/10 ${
        esPrincipal ? 'gap-6 border-b sm:gap-8' : 'gap-4 sm:gap-6'
      }`}
    >
      {opciones.map((opcion) => {
        const seleccionada = opcion === activa
        return (
          <button
            key={opcion}
            onClick={() => onSeleccionar(opcion)}
            className={`relative pb-2.5 font-medium transition ${esPrincipal ? 'text-sm' : 'text-xs'} ${
              seleccionada
                ? esPrincipal
                  ? 'text-brand'
                  : 'text-mustard'
                : 'text-ink/50 hover:text-ink/80'
            }`}
          >
            {opcion}
            {seleccionada && (
              <span
                className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full ${
                  esPrincipal ? 'bg-brand' : 'bg-mustard'
                }`}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
