// src/components/admin/ProductForm.tsx
"use client";

import { useState } from "react";
import { createProduct } from "../../lib/adminserverAction/product";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/common/ImageUploader";
import { Plus } from "lucide-react";

// Categories ki type define ki hai jo server se props mein milengi
interface Category {
  id: string;
  name: string;
}

export function ProductForm({ categories }: { categories: Category[] }) {
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(formData: FormData) {
    const res = await createProduct(formData);
    if (res?.success) {
      setImageUrl("");
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-xs h-fit">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Plus className="h-5 w-5" /> Add New Product
      </h2>

      <form action={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            name="name"
            type="text"
            required
            className="w-full border p-2 rounded-lg text-sm focus:outline-black"
            placeholder="e.g. Silk Embroidered Suit"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            required
            className="w-full border p-2 rounded-lg text-sm focus:outline-black"
            placeholder="Product details, fabric, etc..."
          />
        </div>

        {/* Price & Compare Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (PKR)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              className="w-full border p-2 rounded-lg text-sm focus:outline-black"
              placeholder="5500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Compare Price (Sale)</label>
            <input
              name="comparePrice"
              type="number"
              step="0.01"
              className="w-full border p-2 rounded-lg text-sm focus:outline-black"
              placeholder="7000"
            />
          </div>
        </div>

        {/* Stock & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Stock Qty</label>
            <input
              name="stock"
              type="number"
              defaultValue={10}
              required
              className="w-full border p-2 rounded-lg text-sm focus:outline-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="categoryId"
              required
              className="w-full border p-2 rounded-lg text-sm bg-white focus:outline-black"
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
          <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <input name="isFeatured" type="checkbox" className="w-4 h-4 accent-black" />
            Feature on Homepage
          </label>

          <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <input name="isPublished" type="checkbox" defaultChecked className="w-4 h-4 accent-black" />
            Publish Product
          </label>
        </div>

        {/* Image Uploader */}
        <ImageUploader
          label="Product Image"
          imageUrl={imageUrl}
          onChange={setImageUrl}
        />

        <input type="hidden" name="imageUrl" value={imageUrl} required />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!imageUrl}
          className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          Save Product
        </Button>
      </form>
    </div>
  );
}