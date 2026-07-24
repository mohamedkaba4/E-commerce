import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Categories
  const categories = await Promise.all([
    prisma.categories.upsert({
      where: { slug: 'men' },
      update: {},
      create: { name: 'Men', slug: 'men' },
    }),
    prisma.categories.upsert({
      where: { slug: 'women' },
      update: {},
      create: { name: 'Women', slug: 'women' },
    }),
    prisma.categories.upsert({
      where: { slug: 'kids' },
      update: {},
      create: { name: 'Kids', slug: 'kids' },
    }),
    prisma.categories.upsert({
      where: { slug: 'running' },
      update: {},
      create: { name: 'Running', slug: 'running' },
    }),
    prisma.categories.upsert({
      where: { slug: 'nutrition' },
      update: {},
      create: { name: 'Nutrition', slug: 'nutrition' },
    }),
  ])

  const [men, women, kids, running, nutrition] = categories

  // Products
  const products = [
    // MEN
    {
      name: 'Apex Compression Tee',
      slug: 'apex-compression-tee',
      description: 'Engineered with four-way stretch fabric and laser-cut ventilation zones. Stays locked in through every rep, every set.',
      price: 85,
      compareAt: 110,
      categoryId: men.id,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Volt'],
      tags: ['compression', 'training', 'bestseller'],
      featured: true,
    },
    {
      name: 'Stealth Training Short',
      slug: 'stealth-training-short',
      description: '7" inseam with built-in liner. Sweat-wicking, quick-dry fabric with secure zip pocket for essentials.',
      price: 68,
      categoryId: men.id,
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80',
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Charcoal', 'Navy'],
      tags: ['shorts', 'training'],
      featured: true,
    },
    {
      name: 'Mavencrest Pro Hoodie',
      slug: 'mavencrest-pro-hoodie',
      description: 'French terry heavyweight hoodie. Dropped shoulders, kangaroo pocket, embroidered logo. Built for post-session recovery.',
      price: 145,
      compareAt: 180,
      categoryId: men.id,
      images: [
        'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
        'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=80',
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Stone', 'Forest'],
      tags: ['hoodie', 'lifestyle', 'bestseller'],
      featured: true,
    },
    {
      name: 'Technical Track Jacket',
      slug: 'technical-track-jacket',
      description: 'Lightweight ripstop shell with packable design. Full-zip, elastic cuffs and hem, reflective detailing for low-light training.',
      price: 195,
      categoryId: men.id,
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
        'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&q=80',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Volt', 'Slate'],
      tags: ['jacket', 'running', 'technical'],
      inventory: 20,
    },
    // WOMEN
    {
      name: 'Sculpt Seamless Sports Bra',
      slug: 'sculpt-seamless-sports-bra',
      description: 'High-support seamless construction with moisture-wicking yarn. Racerback design, wide underband, removable cups.',
      price: 72,
      categoryId: women.id,
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
        'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&q=80',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Sand', 'Volt', 'Rose'],
      tags: ['sports-bra', 'seamless', 'bestseller'],
      featured: true,
    },
    {
      name: 'Flow High-Rise Legging',
      slug: 'flow-high-rise-legging',
      description: '25" inseam, 4-way stretch with squat-proof guarantee. High-rise waistband with internal pocket. No-dig, no-shift fit.',
      price: 98,
      compareAt: 125,
      categoryId: women.id,
      images: [
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Mauve', 'Sage', 'Navy'],
      tags: ['leggings', 'yoga', 'bestseller'],
      featured: true,
    },
    {
      name: 'Volt Oversized Training Tee',
      slug: 'volt-oversized-training-tee',
      description: 'Relaxed drop-shoulder silhouette in our signature volt colorway. Enzyme-washed for softness. Unisex fit.',
      price: 58,
      categoryId: women.id,
      images: [
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Volt', 'White', 'Black'],
      tags: ['tee', 'lifestyle'],
      inventory: 50,
    },
    // KIDS
    {
      name: 'Junior Sprint Set',
      slug: 'junior-sprint-set',
      description: 'Two-piece matching set — shortsleeve tee + 5" shorts. Lightweight, breathable, machine washable. Built for play.',
      price: 55,
      categoryId: kids.id,
      images: [
        'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80',
        'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=800&q=80',
      ],
      sizes: ['4T', '5T', '6', '7', '8', '10', '12'],
      colors: ['Black', 'Volt', 'Royal Blue'],
      tags: ['kids', 'set', 'bestseller'],
      featured: true,
    },
    // RUNNING
    {
      name: 'Velocity Elite Running Vest',
      slug: 'velocity-elite-running-vest',
      description: 'Hydration-ready race vest with 2L capacity. Bounce-free fit system, front pockets, emergency whistle. Race-legal.',
      price: 165,
      compareAt: 200,
      categoryId: running.id,
      images: [
        'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&q=80',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
      ],
      sizes: ['S/M', 'M/L', 'L/XL'],
      colors: ['Black', 'Volt'],
      tags: ['running', 'hydration', 'race'],
      featured: true,
    },
    {
      name: 'Phantom Running Sock — 3pk',
      slug: 'phantom-running-sock-3pk',
      description: 'Cushioned heel and toe, seamless toe box, arch compression band. Moisture-wicking merino blend. Pack of 3.',
      price: 34,
      categoryId: running.id,
      images: [
        'https://images.unsplash.com/photo-1556906781-9a412961a823?w=800&q=80',
      ],
      sizes: ['S (W5-7)', 'M (W8-10 / M6-8)', 'L (M9-12)'],
      colors: ['Black', 'White', 'Volt'],
      tags: ['socks', 'running', 'accessories'],
      inventory: 5,
    },
    // Nutrition
    {
      name: 'Alpha Performance Whey Protein',
      slug: 'alpha-performance-whey-protein',
      description: '25g of grass-fed whey isolate per scoop. Rapid absorption, zero fillers, clean chocolate flavor. Ideal for hypertrophy training and explosive recovery.',
      price: 55,
      compareAt: 70,
      categoryId: nutrition.id, // <-- Maps to your nutrition category
      images: [
        'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&q=80',
        'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80',
      ],
      sizes: ['2 lbs', '5 lbs'],
      colors: ['Chocolate', 'Vanilla'],
      tags: ['protein', 'nutrition', 'bestseller'],
      featured: true,
    },
    {
      name: 'Pre-Workout Igniter (Volt Flavor)',
      slug: 'pre-workout-igniter-volt',
      description: 'High-intensity formula featuring L-Citrulline, Beta-Alanine, and clean caffeine for explosive energy and supreme vascular blood flow.',
      price: 45,
      categoryId: nutrition.id, // <-- Maps to your nutrition category
      images: [
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
      ],
      sizes: ['30 Servings'],
      colors: ['Volt Sour Apple'],
      tags: ['preworkout', 'nutrition'],
      featured: true,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log(`✅ Seeded ${products.length} products across ${categories.length} categories`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
