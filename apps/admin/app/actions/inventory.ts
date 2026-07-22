'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export async function adjustInventory(formData: FormData) {
  const productId = formData.get('productId')
  const adjustmentValue = formData.get('adjustment')

  if (
    typeof productId !== 'string' ||
    typeof adjustmentValue !== 'string'
  ) {
    throw new Error('Invalid inventory request')
  }

  const adjustment = Number.parseInt(adjustmentValue, 10)

  if (!Number.isInteger(adjustment) || adjustment === 0) {
    throw new Error('Inventory adjustment must be a non-zero integer')
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      inventory: true,
    },
  })

  if (!product) {
    throw new Error('Product not found')
  }

  const newInventory = product.inventory + adjustment

  if (newInventory < 0) {
    throw new Error('Inventory cannot be negative')
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      inventory: newInventory,
    },
  })

  revalidatePath('/inventory')
}
