export type Category = {
  id: string
  name: string
  slug: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAt?: number | null
  category: Category
  categoryId: string
  images: string[]
  sizes: string[]
  colors: string[]
  tags: string[]
  inStock: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  size?: string
  color?: string
  quantity: number
  slug: string
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export type OrderItem = {
  id: string
  productId: string
  product: Product
  quantity: number
  size?: string | null
  color?: string | null
  price: number
}

export type Order = {
  id: string
  status: OrderStatus
  total: number
  items: OrderItem[]
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  cardLast4?: string | null
  createdAt: string
}

export type CheckoutForm = {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  cardName: string
}
