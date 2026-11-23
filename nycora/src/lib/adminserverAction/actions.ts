'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface CreateProductState {
  error?: string;
  success?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function createProduct(
  _prevState: CreateProductState,
  formData: FormData
): Promise<CreateProductState> {
  try {
    const name = String(formData.get('name') ?? '').trim();
    const rawSlug = String(formData.get('slug') ?? '').trim();
    const slug = slugify(rawSlug || name);
    const description = String(formData.get('description') ?? '').trim();
    const categoryId = String(formData.get('categoryId') ?? '').trim();
    const imageUrl = String(formData.get('imageUrl') ?? '').trim();

    const priceNum = Number(formData.get('price'));
    const comparePriceRaw = String(formData.get('comparePrice') ?? '').trim();
    const comparePriceNum = comparePriceRaw ? Number(comparePriceRaw) : null;
    const stockNum = Number(formData.get('stock') ?? 0);

    const isFeatured = formData.get('isFeatured') === 'on';
    const isPublished = formData.get('isPublished') === 'on';

    if (!name) {
      return { error: 'Product name zaroori hai.' };
    }

    if (!slug) {
      return { error: 'Valid slug generate nahi ho saka.' };
    }

    if (Number.isNaN(priceNum) || priceNum < 0) {
      return { error: 'Valid price enter karein.' };
    }

    if (comparePriceNum !== null && (Number.isNaN(comparePriceNum) || comparePriceNum < 0)) {
      return { error: 'Valid compare price enter karein.' };
    }

    if (Number.isNaN(stockNum) || stockNum < 0) {
      return { error: 'Valid stock quantity enter karein.' };
    }

    // Agar slug pehle se exist karta ho toh unique suffix laga dein
    const existingSlug = await prisma.product.findUnique({ where: { slug } });
    const finalSlug = existingSlug ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        description,
        price: priceNum,
        comparePrice: comparePriceNum,
        stock: Math.floor(stockNum),
        isFeatured,
        isPublished,
        ...(categoryId ? { categoryId } : {}),
        ...(imageUrl
          ? {
              images: {
                create: [{ url: imageUrl }],
              },
            }
          : {}),
      },
    });

    revalidatePath('/');
    revalidatePath('/admin/products');
  } catch (err) {
    console.error('CREATE PRODUCT ERROR:', err);
    return { error: 'Product save karte waqt error aaya. Dobara try karein.' };
  }

  redirect('/admin/products');
}