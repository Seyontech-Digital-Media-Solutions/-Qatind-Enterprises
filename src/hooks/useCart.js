import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const CART_STORAGE_KEY = 'qatind-cart'
const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id !== 'undefined' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number'
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore quota / private-mode write errors
    }
  }, [items])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id)
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry
        )
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          categoryId: item.categoryId,
          qty: 1,
        },
      ]
    })
  }, [])

  const updateQty = useCallback(
    (id, qty) => {
      if (qty <= 0) {
        removeItem(id)
        return
      }
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty } : item))
      )
    },
    [removeItem]
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  )

  const totalPrice = useMemo(
    () =>
      Number(
        items
          .reduce((sum, item) => sum + item.price * item.qty, 0)
          .toFixed(2)
      ),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      totalCount,
      totalPrice,
    }),
    [items, addItem, removeItem, updateQty, clearCart, totalCount, totalPrice]
  )

  return createElement(CartContext.Provider, { value }, children)
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
