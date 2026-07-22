'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

function getRequiredString(formData: FormData, field: string) {
  const value = formData.get(field)

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${field} is required`)
  }

  return value.trim()
}

function getOptionalString(formData: FormData, field: string) {
  const value = formData.get(field)

  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  return trimmed === '' ? null : trimmed
}

function getRequiredNumber(formData: FormData, field: string) {
  const value = formData.get(field)

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${field} is required`)
  }

  const number = Number(value)

  if (!Number.isFinite(number)) {
    throw new Error(`${field} must be a valid number`)
  }

  return number
}

function parseList(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') {
    return []
  }

  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function createProduct(formData: FormData) {
  const name = getRequiredString(formData, 'name')
  const rawSlug = getRequiredString(formData, 'slug')
  const description = getRequiredString(formData, 'description')
  const price = getRequiredNumber(formData, 'price')
  const inventory = getRequiredNumber(formData, 'inventory')
  const categoryId = getRequiredString(formData, 'categoryId')

  const compareAtRaw = getOptionalString(formData, 'compareAt')
  const compareAt = compareAtRaw === null ? null : Number(compareAtRaw)

  const images = parseList(formData.get('images'))
  const featured = formData.get('featured') === 'on'
  const slug = normalizeSlug(rawSlug)

  if (!slug) {
    throw new Error('A valid slug is required')
  }

  if (price < 0) {
    throw new Error('Price cannot be negative')
  }

  if (!Number.isInteger(inventory) || inventory < 0) {
    throw new Error('Inventory must be a non-negative whole number')
  }

  if (
    compareAt !== null &&
    (!Number.isFinite(compareAt) || compareAt < 0)
  ) {
    throw new Error('Compare-at price must be a valid positive number')
  }

  if (images.length === 0) {
    throw new Error('At least one product image URL is required')
  }

  const existingProduct = await db.product.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  })

  if (existingProduct) {
    throw new Error('A product with this slug already exists')
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
    throw new Error('Selected category does not exist')
  }

  await db.product.create({
    data: {
      name,
      slug,
      description,
      price,
      compareAt,
      inventory,
      images,
      featured,
      categoryId,

      // These fields exist in your schema and can start empty.
      sizes: [],
      colors: [],
      tags: [],
    },
  })

  revalidatePath('/products')
  revalidatePath('/inventory')

  redirect('/products')
}

export async function updateProduct(
  productId: string,
  formData: FormData
) {
  const name = getRequiredString(formData, 'name')
  const rawSlug = getRequiredString(formData, 'slug')
  const description = getRequiredString(formData, 'description')
  const price = getRequiredNumber(formData, 'price')
  const inventory = getRequiredNumber(formData, 'inventory')
  const categoryId = getRequiredString(formData, 'categoryId')

  const compareAtRaw = getOptionalString(formData, 'compareAt')
  const compareAt =
    compareAtRaw === null ? null : Number(compareAtRaw)

  const images = parseList(formData.get('images'))
  const featured = formData.get('featured') === 'on'
  const slug = normalizeSlug(rawSlug)

  if (!productId) {
    throw new Error('Product ID is required')
  }

  if (!slug) {
    throw new Error('A valid slug is required')
  }

  if (price < 0) {
    throw new Error('Price cannot be negative')
  }

  if (!Number.isInteger(inventory) || inventory < 0) {
    throw new Error(
      'Inventory must be a non-negative whole number'
    )
  }

  if (
    compareAt !== null &&
    (!Number.isFinite(compareAt) || compareAt < 0)
  ) {
    throw new Error(
      'Compare-at price must be a valid positive number'
    )
  }

  if (images.length === 0) {
    throw new Error(
      'At least one product image URL is required'
    )
  }

  const existingProduct = await db.product.findFirst({
    where: {
      slug,
      NOT: {
        id: productId,
      },
    },
    select: {
      id: true,
    },
  })

  if (existingProduct) {
    throw new Error(
      'Another product already uses this slug'
    )
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
    throw new Error('Selected category does not exist')
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      name,
      slug,
      description,
      price,
      compareAt,
      inventory,
      categoryId,
      images,
      featured,
    },
  })

  revalidatePath('/products')
  revalidatePath(`/products/${productId}`)
  revalidatePath('/inventory')

  redirect('/products')
}
