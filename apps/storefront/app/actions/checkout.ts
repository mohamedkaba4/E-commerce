'use server'

import { db } from '@/lib/db'

export async function processCheckout(formData: FormData, cartItems: any[]) {
  for (const item of cartItems) {
    const product = await db.product.findUnique({
      where: {
        id: item.id,
      },
    })

    if (!product) {
      throw new Error(`Product not found: ${item.id}`)
    }

    if (product.inventory < item.quantity) {
      throw new Error(
        `${product.name} only has ${product.inventory} available`
      )
    }

    await db.product.update({
      where: {
        id: item.id,
      },
      data: {
        inventory: {
          decrement: item.quantity,
        },
      },
    })
  }

  return { success: true }
}