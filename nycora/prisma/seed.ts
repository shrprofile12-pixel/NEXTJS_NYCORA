import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with dummy products & banners...')

  // Purana data clean karne ke liye (agar zaroorat ho)
  await prisma.banner.deleteMany() // 👈 Purane banners clear karne ke liye
  await prisma.productVariant.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // 1. Create Banners (Hero Carousel)
  await prisma.banner.createMany({
    data: [
      {
        heading: 'MAHIRI',
        description: 'Unstitched Embroidered Collection 2023. Now available in stores & online.',
        imageUrl: '/banner1.png',
        buttonText: 'Shop Now',
        buttonLink: '/shop',
        isActive: true,
        order: 1,
      },
      {
        heading: 'WEDDING FESTIVE',
        description: 'Explore our exclusive luxury wedding collection designed for your special moments.',
        imageUrl: '/banner2.png',
        buttonText: 'Explore Collection',
        buttonLink: '/collections/wedding',
        isActive: true,
        order: 2,
      },
    ],
  })

  // 2. Create Category
  const apparelCategory = await prisma.category.create({
    data: {
      name: 'Apparel & Hoodies',
      slug: 'apparel-hoodies',
      description: 'Premium streetwear and comfortable hoodies designed for everyday style.',
    },
  })

  // 3. Create Dummy Products (Matching your image theme)
  
  // Product 1: The Louthies Hoodie (Featured from image)
  await prisma.product.create({
    data: {
      name: 'Louthies Hoddie!',
      slug: 'louthies-hoddie',
      description: 'Most stylish polished version of this hoodie. Crafted with premium organic cotton and moisture absorber technology.',
      price: 72.00,
      comparePrice: 220.00,
      isFeatured: true,
      stock: 60,
      rating: 4.8,
      reviewCount: 124,
      categoryId: apparelCategory.id,
      images: {
        create: [
          { url: '/Bag.png', alt: 'Louthies Hoodie Front View', position: 0 },
        ],
      },
      variants: {
        create: [
          { size: 'S', color: 'Olive Green', sku: 'LUTH-OLV-S', stock: 15 },
          { size: 'M', color: 'Olive Green', sku: 'LUTH-OLV-M', stock: 25 },
          { size: 'L', color: 'Olive Green', sku: 'LUTH-OLV-L', stock: 20 },
        ],
      },
    },
  })

  // Product 2: Minimalist Oversized Tee
  await prisma.product.create({
    data: {
      name: 'Nycora Minimalist Oversized Tee',
      slug: 'nycora-minimalist-oversized-tee',
      description: 'Relaxed fit heavyweight cotton tee built for breathable daily wear and effortless layering.',
      price: 45.00,
      comparePrice: 90.00,
      isFeatured: false,
      stock: 45,
      rating: 4.6,
      reviewCount: 85,
      categoryId: apparelCategory.id,
      images: {
        create: [
          { url: '/Bag.png', alt: 'Minimalist Tee', position: 0 },
        ],
      },
      variants: {
        create: [
          { size: 'M', color: 'Black', sku: 'NY-TEE-BLK-M', stock: 20 },
          { size: 'L', color: 'Sage', sku: 'NY-TEE-SGE-L', stock: 25 },
        ],
      },
    },
  })

  // Product 3: Urban Techwear Cargo Jacket
  await prisma.product.create({
    data: {
      name: 'Urban Techwear Cargo Jacket',
      slug: 'urban-techwear-cargo-jacket',
      description: 'Weather-resistant technical jacket featuring multi-utility pockets and sleek modern aesthetic.',
      price: 150.00,
      comparePrice: 280.00,
      isFeatured: false,
      stock: 25,
      rating: 4.9,
      reviewCount: 42,
      categoryId: apparelCategory.id,
      images: {
        create: [
          { url: '/Bag.png', alt: 'Cargo Jacket', position: 0 },
        ],
      },
      variants: {
        create: [
          { size: 'M', color: 'Dark Charcoal', sku: 'TCK-CHC-M', stock: 10 },
          { size: 'L', color: 'Dark Charcoal', sku: 'TCK-CHC-L', stock: 15 },
        ],
      },
    },
  })

  // Product 4: Signature Fleece Sweatpants
  await prisma.product.create({
    data: {
      name: 'Signature Fleece Sweatpants',
      slug: 'signature-fleece-sweatpants',
      description: 'Ultra-plush fleece sweatpants designed with tailored cuffs and deep functional pockets.',
      price: 65.00,
      comparePrice: 110.00,
      isFeatured: false,
      stock: 50,
      rating: 4.7,
      reviewCount: 96,
      categoryId: apparelCategory.id,
      images: {
        create: [
          { url: '/Bag.png', alt: 'Fleece Sweatpants', position: 0 },
        ],
      },
      variants: {
        create: [
          { size: 'S', color: 'Olive', sku: 'SWP-OLV-S', stock: 15 },
          { size: 'M', color: 'Olive', sku: 'SWP-OLV-M', stock: 20 },
          { size: 'L', color: 'Olive', sku: 'SWP-OLV-L', stock: 15 },
        ],
      },
    },
  })

  console.log('✨ 2 Banners & 4 Dummy Products seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })