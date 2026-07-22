'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

function getRequiredString(
  formData: FormData,
  field: string
) {
  const value = formData.get(field)

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${field} is required`)
  }

  return value.trim()
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function updateCategory(
  categoryId: string,
  formData: FormData
) {
  const name = getRequiredString(formData, 'name')
  const rawSlug = getRequiredString(formData, 'slug')
  const slug = normalizeSlug(rawSlug)

  if (!categoryId) {
    throw new Error('Category ID is required')
  }

  if (!slug) {
    throw new Error('A valid slug is required')
  }

  const category = await db.categories.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      id: true,
    },
  })

  if (!category) {
    throw new Error('Category not found')
  }

  const duplicate = await db.categories.findFirst({
    where: {
      slug,
      NOT: {
        id: categoryId,
      },
    },
    select: {
      id: true,
    },
  })

  if (duplicate) {
    throw new Error(
      'Another category already uses this slug'
    )
  }

  await db.categories.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
      slug,
      updatedAt: new Date(),
    },
  })

  revalidatePath('/categories')
  revalidatePath('/products')
  revalidatePath('/inventory')

  redirect('/categories')
}
