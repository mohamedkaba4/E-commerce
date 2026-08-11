import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Boxes,
  ChartNoAxesCombined,
  FolderTree,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
} from 'lucide-react'

const navigation = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/products',
    label: 'Products',
    icon: Package,
  },
  {
    href: '/inventory',
    label: 'Inventory',
    icon: Boxes,
  },
  {
    href: '/categories',
    label: 'Categories',
    icon: FolderTree,
  },
  {
    href: '/orders',
    label: 'Orders',
    icon: ShoppingCart,
  },
  {
    href: '/analytics',
    label: 'Analytics',
    icon: ChartNoAxesCombined,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
  },
]

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

if (!session?.user?.email) {
  redirect('/login')
}

if (session.user.email !== process.env.ADMIN_EMAIL) {
  redirect('/unauthorized')
}
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-neutral-800 bg-black lg:block">
        <div className="border-b border-neutral-800 px-6 py-6">
          <p className="text-xs tracking-[0.25em] text-neutral-400">
            MAVENCREST
          </p>

          <h1 className="mt-1 text-2xl font-semibold">
            Admin
          </h1>
        </div>

        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-300 transition hover:bg-neutral-900 hover:text-white"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Page */}
      <div className="min-w-0 lg:pl-64">

        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-neutral-800 px-4 sm:px-6">
          <div>
            <p className="text-xs tracking-[0.2em] text-neutral-500 lg:hidden">
              MAVENCREST ADMIN
            </p>

            <p className="text-sm text-neutral-400">
              Store administration
            </p>
          </div>

          <div className="rounded-full bg-neutral-800 px-3 py-1.5 text-sm">
            Admin
          </div>
        </header>

        {/* Mobile navigation */}
        <nav className="overflow-x-auto border-b border-neutral-800 bg-black lg:hidden">
          <div className="flex min-w-max gap-1 px-3 py-2">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm text-neutral-300 transition hover:bg-neutral-900 hover:text-white"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Main content */}
        <main className="min-w-0 overflow-x-hidden p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}