// src/components/admin/BannerForm.tsx
"use client";

import { useState } from "react";
import { createBanner } from "@/lib/adminserverAction/admin";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/common/ImageUploader";
import { Plus } from "lucide-react";

export function BannerForm() {
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(formData: FormData) {
    const res = await createBanner(formData);
    if (res?.success) {
      setImageUrl(""); // Form submit hone ke baad image state reset kar dein
    }
  }

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-xs h-fit">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Plus className="h-5 w-5" /> Add New Banner
      </h2>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Heading
          </label>
          <input
            name="heading"
            type="text"
            required
            className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="e.g. WEDDING FESTIVE"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Description
          </label>
          <textarea
            name="description"
            className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Banner description..."
          />
        </div>

        <ImageUploader
          label="Banner Image"
          imageUrl={imageUrl}
          onChange={setImageUrl}
        />

        <input
          type="hidden"
          name="imageUrl"
          value={imageUrl}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Button Text
            </label>
            <input
              name="buttonText"
              type="text"
              className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Shop Now"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Button Link
            </label>
            <input
              name="buttonLink"
              type="text"
              className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="/shop"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Display Order
          </label>
          <input
            name="order"
            type="number"
            defaultValue={1}
            className="w-full bg-background text-foreground placeholder:text-muted-foreground border border-input p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <Button
          type="submit"
          disabled={!imageUrl}
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
        >
          Save Banner
        </Button>
      </form>
    </div>
  );
}