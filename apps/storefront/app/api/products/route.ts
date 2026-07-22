import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const limit = parseInt(searchParams.get('limit') || '24', 10)
    const sort = searchParams.get('sort') || 'newest'
    
    const orderBy: any = {}
    if (sort === 'newest') {
      orderBy.createdAt = 'desc'
    } else if (sort === 'oldest') {
      orderBy.createdAt = 'asc'
    }

    const products = await prisma.product.findMany({
      take: limit,
      orderBy: orderBy,
    })

    const total = await prisma.product.count()

    return NextResponse.json({
      products,
      total,
    })
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}