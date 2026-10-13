import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CLAVE = 'animales-carrito-v1'

function cargarInicial() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    const datos = guardado ? JSON.parse(guardado) : []
    return Array.isArray(datos) ? datos : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(cargarInicial)
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items))
    } catch {
      /* modo privado o sin almacenamiento: el carrito vive solo en memoria */
    }
  }, [items])

  // seleccion: { Peso: '10 kg', Sabor: 'Pollo' } — vacío si el producto no tiene opciones
  const agregar = useCallback((producto, seleccion = {}, precioUnitario, cantidad = 1) => {
    const opciones = Object.entries(seleccion).map(([nombre, valor]) => ({ nombre, valor }))
    const clave = [producto.id, ...opciones.map((o) => `${o.nombre}:${o.valor}`)].join('__')
    setItems((prev) => {
      const existe = prev.find((i) => i.clave === clave)
      if (existe) {
        return prev.map((i) => (i.clave === clave ? { ...i, cantidad: i.cantidad + cantidad } : i))
      }
      return [
        ...prev,
        {
          clave,
          id: producto.id,
          slug: producto.slug,
          nombre: producto.nombre,
          precio: precioUnitario,
          imagen: producto.imagenes[0],
          opciones,
          cantidad,
        },
      ]
    })
    setAbierto(true)
  }, [])

  const cambiarCantidad = useCallback(
    (clave, delta) =>
      setItems((prev) =>
        prev
          .map((i) => (i.clave === clave ? { ...i, cantidad: i.cantidad + delta } : i))
          .filter((i) => i.cantidad > 0)
      ),
    []
  )

  const quitar = useCallback((clave) => setItems((prev) => prev.filter((i) => i.clave !== clave)), [])
  const vaciar = useCallback(() => setItems([]), [])
  const abrir = useCallback(() => setAbierto(true), [])
  const cerrar = useCallback(() => setAbierto(false), [])

  const valor = useMemo(
    () => ({
      items,
      abierto,
      abrir,
      cerrar,
      agregar,
      cambiarCantidad,
      quitar,
      vaciar,
      cantidad: items.reduce((s, i) => s + i.cantidad, 0),
      total: items.reduce((s, i) => s + i.cantidad * i.precio, 0),
    }),
    [items, abierto, abrir, cerrar, agregar, cambiarCantidad, quitar, vaciar]
  )

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
