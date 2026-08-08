import dotenv from "dotenv";

if (!process.env.DATABASE_URL) {
  dotenv.config({
    path: "./apps/storefront/.env",
  });
}

import prisma from "../apps/storefront/lib/prisma";

const products = [
  {
    name: "Adidas Continental 80",
    slug: "adidas-continental-80",
    price: 180,
    description: "Extreme comfort and timeless design.",
    images: ["/adidas80.jpg"],
    sizes: ["8", "9", "10"],
    colors: ["White", "Black"],
    category: "men",
  },
  {
    name: "Apex Elite Court Shoes",
    slug: "apex-elite-court",
    price: 140,
    description: "Maximum lateral stability for high-intensity court play.",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["9", "10", "11"],
    colors: ["White", "Blue"],
    category: "men",
  },
  {
    name: "Vanguard Training Hoodie",
    slug: "vanguard-hoodie",
    price: 85,
    description: "Thermal regulation fabric engineered for outdoor sessions.",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Gray", "Black"],
    category: "women",
  },
  {
    name: "AeroShell Windbreaker",
    slug: "aeroshell-windbreaker",
    price: 110,
    description: "Ultra-lightweight weather resistance.",
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Volt"],
    category: "running",
  },
  {
    name: "Pro-Isolate Hydration Matrix",
    slug: "pro-isolate-hydration",
    price: 45,
    description: "Pure whey isolate with optimal amino recovery profile.",
    images: [
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["2 lbs"],
    colors: ["Chocolate"],
    category: "nutrition",
  },
];

async function main() {
  console.log("Updating/creating products...");

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },

      update: {
        name: p.name,
        price: p.price,
        description: p.description,
        images: p.images,
        sizes: p.sizes,
        colors: p.colors,
        featured: true,
        category: {
          connect: {
            slug: p.category,
          },
        },
      },

      create: {
        name: p.name,
        slug: p.slug,
        price: p.price,
        description: p.description,
        images: p.images,
        sizes: p.sizes,
        colors: p.colors,
        featured: true,
        category: {
          connect: {
            slug: p.category,
          },
        },
      },
    });

    console.log("✓", product.name);
  }

  console.log(`Done. ${products.length} products updated/created.`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
