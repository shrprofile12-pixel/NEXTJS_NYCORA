// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with Pakistani fashion categories & products...');

  // 1. Clean existing data in proper relation order
  await prisma.banner.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Create Banners (Hero Carousel)
  await prisma.banner.createMany({
    data: [
      {
        heading: 'MAHIRI UNSTITCHED',
        description:
          'Unstitched Embroidered Lawn & Jacquard Collection. Now available in stores & online.',
        imageUrl: '/banner1.png',
        buttonText: 'Shop Unstitched',
        buttonLink: '/category/unstitched',
        isActive: true,
        order: 1,
      },
      {
        heading: 'WINTER EDIT',
        description:
          'Explore our exclusive khaddar, karandi, and luxury shawl ensembles for the season.',
        imageUrl: '/banner2.png',
        buttonText: 'Explore Winter',
        buttonLink: '/category/winter',
        isActive: true,
        order: 2,
      },
    ],
  });

  // 3. Create Categories (Matching FilterProducts Tabs + Storefront Grid)
  const winterCategory = await prisma.category.create({
    data: {
      name: 'Winter',
      slug: 'winter',
      description: 'Warm khaddar, marina, karandi, and embroidered shawl 3-piece ensembles.',
    },
  });

  const unstitchedCategory = await prisma.category.create({
    data: {
      name: 'Unstitched',
      slug: 'unstitched',
      description: '2-piece and 3-piece unstitched lawn, cambric, and embroidered fabric suits.',
    },
  });

  const pretCategory = await prisma.category.create({
    data: {
      name: 'Ready to Wear',
      slug: 'ready-to-wear',
      description: 'Everyday stitched kurtis, embroidered shirts, and modern eastern co-ords.',
    },
  });

  const sweatersCategory = await prisma.category.create({
    data: {
      name: 'Sweaters',
      slug: 'sweaters',
      description: 'Cozy cable-knit sweaters, cardigans, and winter layering essentials.',
    },
  });

  const menswearCategory = await prisma.category.create({
    data: {
      name: 'Menswear',
      slug: 'menswear',
      description: 'Tailored shalwar kameez, wash-and-wear suits, and embroidered waistcoats.',
    },
  });

  const fragranceCategory = await prisma.category.create({
    data: {
      name: 'Fragrance',
      slug: 'fragrance',
      description: 'Signature eastern oud, floral mists, and long-lasting eau de parfum.',
    },
  });

  const beautyCategory = await prisma.category.create({
    data: {
      name: 'Beauty',
      slug: 'beauty',
      description: 'Velvet matte lip tints, luminizers, and everyday essentials.',
    },
  });

  // 4. Create Published Products Across Every Category
  const productsData = [
    // WINTER (4 products so carousel loops & scrolls smoothly)
    {
      name: 'Embroidered Khaddar 3-Piece Shawl Suit',
      slug: 'embroidered-khaddar-3-piece-shawl-suit',
      description:
        'Heavyweight winter khaddar shirt with intricate neckline embroidery, dyed khaddar trouser, and woven wool shawl.',
      price: 6990,
      comparePrice: 8500,
      isFeatured: true,
      isPublished: true,
      stock: 45,
      rating: 4.9,
      reviewCount: 112,
      categoryId: winterCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'S', color: 'Deep Plum', sku: 'WNT-KHD-S', stock: 15 },
        { size: 'M', color: 'Deep Plum', sku: 'WNT-KHD-M', stock: 15 },
        { size: 'L', color: 'Deep Plum', sku: 'WNT-KHD-L', stock: 15 },
      ],
    },
    {
      name: 'Vibrant Floral Quilted Kantha Longline Jacket',
      slug: 'vibrant-floral-quilted-kantha-longline-jacket',
      description:
        'Handcrafted-style quilted patchwork longline coat bursting with vibrant floral artistry and running-stitch kantha texture.',
      price: 8950,
      comparePrice: 11500,
      isFeatured: true,
      isPublished: true,
      stock: 30,
      rating: 4.9,
      reviewCount: 62,
      categoryId: winterCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'S', color: 'Multi-Floral', sku: 'VFK-MLT-S', stock: 10 },
        { size: 'M', color: 'Multi-Floral', sku: 'VFK-MLT-M', stock: 12 },
        { size: 'L', color: 'Multi-Floral', sku: 'VFK-MLT-L', stock: 8 },
      ],
    },
    {
      name: 'Printed Marina Winter Co-Ord Set',
      slug: 'printed-marina-winter-co-ord-set',
      description:
        'Soft brushed marina two-piece co-ord set featuring botanical border motifs and tailored straight trousers.',
      price: 5490,
      comparePrice: 6800,
      isFeatured: false,
      isPublished: true,
      stock: 40,
      rating: 4.7,
      reviewCount: 48,
      categoryId: winterCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'S', color: 'Olive Green', sku: 'MRN-OLV-S', stock: 15 },
        { size: 'M', color: 'Olive Green', sku: 'MRN-OLV-M', stock: 15 },
        { size: 'L', color: 'Olive Green', sku: 'MRN-OLV-L', stock: 10 },
      ],
    },
    {
      name: 'Dyed Karandi Embroidered Formal Suit',
      slug: 'dyed-karandi-embroidered-formal-suit',
      description:
        'Rich winter karandi ensemble detailed with antique tilla threadwork and a contrast jacquard shawl.',
      price: 9450,
      comparePrice: 11900,
      isFeatured: true,
      isPublished: true,
      stock: 25,
      rating: 4.8,
      reviewCount: 34,
      categoryId: winterCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'S', color: 'Crimson Red', sku: 'KRD-CRM-S', stock: 8 },
        { size: 'M', color: 'Crimson Red', sku: 'KRD-CRM-M', stock: 10 },
        { size: 'L', color: 'Crimson Red', sku: 'KRD-CRM-L', stock: 7 },
      ],
    },

    // UNSTITCHED
    {
      name: 'Zari Embroidered 3-Piece Lawn Suit',
      slug: 'zari-embroidered-3-piece-lawn-suit',
      description:
        '3-piece unstitched digital printed lawn shirt with zari neckline embroidery, dyed cambric trouser, and chiffon dupatta.',
      price: 5490,
      comparePrice: 6800,
      isFeatured: true,
      isPublished: true,
      stock: 80,
      rating: 4.7,
      reviewCount: 145,
      categoryId: unstitchedCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'Unstitched', color: 'Teal Green', sku: 'ZRI-3PC-TEL', stock: 40 },
        { size: 'Unstitched', color: 'Maroon', sku: 'ZRI-3PC-MRN', stock: 40 },
      ],
    },
    {
      name: 'Classic Jacquard 3-Piece Unstitched Suit',
      slug: 'classic-jacquard-3-piece-unstitched-suit',
      description:
        'Self-woven cotton jacquard shirt piece paired with dyed trouser fabric and an organza zari dupatta.',
      price: 6250,
      comparePrice: 7500,
      isFeatured: false,
      isPublished: true,
      stock: 60,
      rating: 4.6,
      reviewCount: 53,
      categoryId: unstitchedCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'Unstitched', color: 'Ivory Gold', sku: 'JCQ-3PC-IVR', stock: 60 },
      ],
    },

    // READY TO WEAR
    {
      name: 'Patchwork Heritage Collared Tunic Shirt',
      slug: 'patchwork-heritage-collared-tunic-shirt',
      description:
        'Relaxed-fit button-down collared tunic shirt featuring an intricate tapestry of earthy patchwork prints in emerald, mustard, and crimson.',
      price: 4250,
      comparePrice: 5500,
      isFeatured: true,
      isPublished: true,
      stock: 50,
      rating: 4.8,
      reviewCount: 94,
      categoryId: pretCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'XS', color: 'Multi-Earth', sku: 'PHC-MLT-XS', stock: 10 },
        { size: 'S', color: 'Multi-Earth', sku: 'PHC-MLT-S', stock: 15 },
        { size: 'M', color: 'Multi-Earth', sku: 'PHC-MLT-M', stock: 15 },
        { size: 'L', color: 'Multi-Earth', sku: 'PHC-MLT-L', stock: 10 },
      ],
    },
    {
      name: 'Classic Embroidered Cambric Culottes',
      slug: 'classic-embroidered-cambric-culottes',
      description:
        'Breathable cotton cambric wide-leg culottes finished with delicate schiffli cutwork detailing at the hem.',
      price: 1850,
      comparePrice: 2400,
      isFeatured: false,
      isPublished: true,
      stock: 100,
      rating: 4.6,
      reviewCount: 112,
      categoryId: pretCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'S', color: 'Off-White', sku: 'CEC-WHT-S', stock: 30 },
        { size: 'M', color: 'Off-White', sku: 'CEC-WHT-M', stock: 40 },
        { size: 'L', color: 'Off-White', sku: 'CEC-WHT-L', stock: 30 },
      ],
    },

    // SWEATERS
    {
      name: 'Cable Knit Merino Blend Cardigan',
      slug: 'cable-knit-merino-blend-cardigan',
      description:
        'Relaxed button-front cable knit cardigan crafted for lightweight warmth and effortless layering.',
      price: 5990,
      comparePrice: 7200,
      isFeatured: true,
      isPublished: true,
      stock: 35,
      rating: 4.8,
      reviewCount: 41,
      categoryId: sweatersCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'S', color: 'Oatmeal', sku: 'SWT-OAT-S', stock: 12 },
        { size: 'M', color: 'Oatmeal', sku: 'SWT-OAT-M', stock: 13 },
        { size: 'L', color: 'Oatmeal', sku: 'SWT-OAT-L', stock: 10 },
      ],
    },

    // MENSWEAR
    {
      name: 'Men’s Blended Boski Shalwar Kameez',
      slug: 'mens-blended-boski-shalwar-kameez',
      description:
        'Tailored straight-collar men’s shalwar kameez crafted from soft drape blended boski fabric.',
      price: 8490,
      comparePrice: 9900,
      isFeatured: true,
      isPublished: true,
      stock: 40,
      rating: 4.9,
      reviewCount: 76,
      categoryId: menswearCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'M', color: 'Cream', sku: 'MNS-BSK-M', stock: 15 },
        { size: 'L', color: 'Cream', sku: 'MNS-BSK-L', stock: 15 },
        { size: 'XL', color: 'Cream', sku: 'MNS-BSK-XL', stock: 10 },
      ],
    },

    // FRAGRANCE
    {
      name: 'Oud & Amber Eau De Parfum (100ml)',
      slug: 'oud-and-amber-eau-de-parfum',
      description:
        'Warm woody notes of aged agarwood layered with saffron, rose, and golden amber.',
      price: 4950,
      comparePrice: 5800,
      isFeatured: true,
      isPublished: true,
      stock: 70,
      rating: 4.8,
      reviewCount: 89,
      categoryId: fragranceCategory.id,
      image: '/Bag.png',
      variants: [
        { size: '100ml', color: 'Amber Gold', sku: 'FRG-OUD-100', stock: 70 },
      ],
    },

    // BEAUTY
    {
      name: 'Velvet Matte Lip & Cheek Tint',
      slug: 'velvet-matte-lip-and-cheek-tint',
      description:
        'Weightless, buildable rosewood pigment enriched with vitamin E for a soft-focus matte finish.',
      price: 1850,
      comparePrice: 2200,
      isFeatured: false,
      isPublished: true,
      stock: 90,
      rating: 4.7,
      reviewCount: 64,
      categoryId: beautyCategory.id,
      image: '/Bag.png',
      variants: [
        { size: 'Standard', color: 'Rosewood', sku: 'BTY-LIP-RSW', stock: 45 },
        { size: 'Standard', color: 'Berry Crimson', sku: 'BTY-LIP-BRY', stock: 45 },
      ],
    },
  ];

  for (const product of productsData) {
    const { image, variants, ...productFields } = product;

    await prisma.product.create({
      data: {
        ...productFields,
        images: {
          create: [{ url: image, alt: productFields.name, position: 0 }],
        },
        variants: {
          create: variants,
        },
      },
    });
  }

  console.log('✨ Categories & products seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });