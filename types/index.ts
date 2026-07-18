export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAt?: number | null;
  images: string[];
  inventory: number;
  sizes: string[];
  colors: string[];
  tags: string[];
  featured: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  size: string;
  color: string;
  quantity: number;
}
