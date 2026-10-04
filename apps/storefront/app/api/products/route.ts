import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get('category')?.trim().toLowerCase()
    const q = searchParams.get('q')?.trim()
    const sort = searchParams.get('sort') || 'newest'

    const requestedLimit = Number.parseInt(
      searchParams.get('limit') || '24',
      10
    )

    const limit = Number.isNaN(requestedLimit)
      ? 24
      : Math.min(Math.max(requestedLimit, 1), 100)

    const where: any = {}

    // Filter by category slug.
    if (category && category !== 'all') {
      where.category = {
        is: {
          slug: category,
        },
      }
    }

    // Search product name and description.
    if (q) {
      where.OR = [
        {
          name: {
            contains: q,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: q,
            mode: 'insensitive',
          },
        },
      ]
    }

    let orderBy: any = {
      createdAt: 'desc',
    }

    if (sort === 'price-asc') {
      orderBy = {
        price: 'asc',
      }
    }

    if (sort === 'price-desc') {
      orderBy = {
        price: 'desc',
      }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        take: limit,
        orderBy,
        include: {
          category: true,
        },
      }),

      prisma.product.count({
        where,
      }),
    ])

    return NextResponse.json({
      products,
      total,
    })
  } catch (error) {
    console.error('Failed to fetch products:', error)

    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      }
    )
  }
}
