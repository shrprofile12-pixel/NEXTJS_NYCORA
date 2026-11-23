// src/components/admin/EditProductForm.tsx
"use client";

import { useState } from "react";
import { updateProduct, deleteProduct } from "@/lib/adminserverAction/product";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/common/ImageUploader";
import { Save, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice: number | null;
  stock: number;
  categoryId: string;
  isFeatured: boolean;
  isPublished: boolean;
  images: { url: string }[];
}

export default function EditProductForm({ product, categories }: { product: Product; categories: Category[] }) {
  const [imageUrl, setImageUrl] = useState(product.images[0]?.url || "");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Bind actions with product ID safely
  const updateProductWithId = updateProduct.bind(null, product.id);
  const deleteProductWithId = deleteProduct.bind(null, product.id);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const res = await updateProductWithId(formData);
    setLoading(false);

    if (res?.success) {
      alert("Product updated successfully!");
    } else {
      alert(res?.message || "Failed to update product.");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    setDeleting(true);
    const res = await deleteProductWithId();
    setDeleting(false);

    if (res && !res.success) {
      alert(res.message || "Failed to delete product.");
    }
  }

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-xs h-fit max-w-2xl mx-auto">
      {/* Header & Delete Button */}
      <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Edit Product</h2>
          <p className="text-xs text-muted-foreground">ID: #{product.id}</p>
        </div>

        {/* Delete Button with Confirmation & State */}
        <Button
          type="button"
          variant="destructive"
          size="sm"
          disabled={deleting}
          onClick={handleDelete}
          className="bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-400 dark:hover:bg-rose-950 border-0 shadow-none gap-1 cursor-pointer"
        >
          <Trash2 className="h-4 w-4" /> {deleting ? "Deleting..." : "Delete Product"}
        </Button>
      </div>

      <form action={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Product Name</label>
          <input
            name="name"
            type="text"
            defaultValue={product.name}
            required
            className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={product.description}
            required
            rows={3}
            className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Price & Compare Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Price (PKR)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              defaultValue={product.price}
              required
              className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Compare Price (Sale)</label>
            <input
              name="comparePrice"
              type="number"
              step="0.01"
              defaultValue={product.comparePrice ?? ""}
              className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Stock & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Stock Qty</label>
            <input
              name="stock"
              type="number"
              defaultValue={product.stock}
              required
              className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Category</label>
            <select
              name="categoryId"
              defaultValue={product.categoryId}
              required
              className="w-full bg-background text-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Checkboxes: Featured & Published */}
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
            <input
              name="isFeatured"
              type="checkbox"
              defaultChecked={product.isFeatured}
              className="w-4 h-4 accent-primary rounded border-input"
            />
            Feature on Homepage
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
            <input
              name="isPublished"
              type="checkbox"
              defaultChecked={product.isPublished}
              className="w-4 h-4 accent-primary rounded border-input"
            />
            Publish Product
          </label>
        </div>

        {/* Image Uploader */}
        <ImageUploader
          label="Product Image"
          imageUrl={imageUrl}
          onChange={setImageUrl}
        />

        <input type="hidden" name="imageUrl" value={imageUrl} />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !imageUrl}
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <Save className="h-4 w-4" /> {loading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}