import { useEffect, useRef, useState } from 'react'

// Anima su contenido (aparece con fade y sube un poco) cada vez que entra
// en la pantalla, tanto al bajar como al volver a subir.
//
// Funciona igual con rueda del mouse, teclado o dedo en el celular, porque
// IntersectionObserver solo mira si el elemento está visible, no cómo se scrolleó.
//
// Props:
// - delay:     milisegundos de espera antes de animar (para efecto escalonado)
// - className: clases extra para el contenedor (por ejemplo "h-full" dentro de una grilla)
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Si el navegador no soporta IntersectionObserver, mostramos todo sin animar
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entrada]) => setVisible(entrada.isIntersecting),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
