import React from 'react'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductClientPage from './ProductClientPage'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!product) {
    notFound()
  }

  return <ProductClientPage product={JSON.parse(JSON.stringify(product))} />
}