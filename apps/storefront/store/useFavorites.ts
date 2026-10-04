'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FavoriteItem {
  id: string
  name: string
  slug: string
  price: number
  compareAt?: number | null
  imageUrl: string
  category?: string
}

interface FavoritesStore {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (id: string) => void
  toggleFavorite: (item: FavoriteItem) => void
  isFavorite: (id: string) => boolean
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (item) =>
        set((state) => {
          const exists = state.favorites.some(
            (favorite) => favorite.id === item.id
          )

          if (exists) {
            return state
          }

          return {
            favorites: [...state.favorites, item],
          }
        }),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (favorite) => favorite.id !== id
          ),
        })),

      toggleFavorite: (item) => {
        const exists = get().favorites.some(
          (favorite) => favorite.id === item.id
        )

        if (exists) {
          get().removeFavorite(item.id)
        } else {
          get().addFavorite(item)
        }
      },

      isFavorite: (id) =>
        get().favorites.some(
          (favorite) => favorite.id === id
        ),
    }),
    {
      name: 'mavencrest-favorites',
    }
  )
)
