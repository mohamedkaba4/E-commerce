import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'

interface CartStore {
  cart: CartItem[]
  isOpen: boolean
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, size?: string, color?: string) => void
  updateQuantity: (id: string, size: string | undefined, color: string | undefined, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,

      addToCart: (item) =>
        set((state) => {
          const key = `${item.id}-${item.size}-${item.color}`
          const existing = state.cart.find(
            (i) => `${i.id}-${i.size}-${i.color}` === key
          )
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                `${i.id}-${i.size}-${i.color}` === key
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            }
          }
          return { cart: [...state.cart, item], isOpen: true }
        }),

      removeFromCart: (id, size, color) =>
        set((state) => ({
          cart: state.cart.filter(
            (i) => !(i.id === id && i.size === size && i.color === color)
          ),
        })),

      updateQuantity: (id, size, color, quantity) =>
        set((state) => ({
          cart: state.cart
            .map((i) =>
              i.id === id && i.size === size && i.color === color
                ? { ...i, quantity }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'mavencrest-cart',
    }
  )
)
