'use server'

import { db } from '@/lib/db'

export async function processCheckout(formData: FormData, cartItems: any[]) {
  // Logic to process payment would go here
  
  // Decrease inventory
  for (const item of cartItems) {
    await db.product.update({
      where: { id: item.id },
      data: { 
        inventory: { decrement: item.quantity } 
      }
    })
  }
  
  return { success: true }
}
