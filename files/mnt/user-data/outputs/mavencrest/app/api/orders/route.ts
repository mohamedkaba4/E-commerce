import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    const {
      items,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      country,
      cardNumber,
    } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Validate products exist and get current prices
    const productIds = items.map((i: any) => i.id)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    if (products.length !== productIds.length) {
      return NextResponse.json({ error: 'One or more products not found' }, { status: 400 })
    }

    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    )

    // Extract last 4 digits of card (fake)
    const cardLast4 = cardNumber?.replace(/\s/g, '').slice(-4) || '0000'

    const order = await prisma.order.create({
      data: {
        userId: (session?.user as any)?.id || null,
        status: 'CONFIRMED',
        total,
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        zip,
        country: country || 'US',
        cardLast4,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            size: item.size || null,
            color: item.color || null,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    })

    return NextResponse.json({ success: true, orderId: order.id, order }, { status: 201 })
  } catch (error: any) {
    console.error('Order error:', error)
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const orders = await prisma.order.findMany({
    where: { userId: (session.user as any).id },
    include: {
      items: {
        include: { product: { include: { category: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ orders })
}
