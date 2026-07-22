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

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-neutral-800 bg-neutral-950 lg:block">
        <div className="border-b border-neutral-800 px-6 py-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Mavencrest
          </p>
          <h1 className="mt-1 text-xl font-semibold">Admin</h1>
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
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-neutral-800 px-6">
          <p className="text-sm text-neutral-400">
            Store administration
          </p>

          <div className="rounded-full bg-neutral-800 px-3 py-1.5 text-sm">
            Admin
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
