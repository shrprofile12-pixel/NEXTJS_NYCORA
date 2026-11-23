"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/adminserverAction/product";
import ImageUploader from "@/components/common/ImageUploader"; // Apne ImageUploader ka exact path check karein
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";

export interface CategoryOption {
  id: string;
  name: string;
}

interface AddProductFormProps {
  categories?: CategoryOption[];
}

function previewSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AddProductForm({
  categories = [],
}: AddProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [slugPreview, setSlugPreview] = useState("");
  const [isManualSlug, setIsManualSlug] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!isManualSlug) {
      setSlugPreview(previewSlug(val));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = previewSlug(e.target.value);
    setSlugPreview(cleaned);
    setIsManualSlug(cleaned.length > 0);
  };

  const handleResetAuto = () => {
    setIsManualSlug(false);
    setSlugPreview(previewSlug(name));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createProduct(formData);

      if (result.success) {
        setFeedback({ type: "success", message: result.message });
        router.push("/product");
        router.refresh();
      } else {
        setFeedback({ type: "error", message: result.message });
      }
    });
  };

  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Add New Product
          </h1>
          <p className="text-sm text-muted-foreground">
            Product name likhein—slug auto ban jayega aur UploadThing se image upload karein.
          </p>
        </div>

        <Button variant="outline" asChild>
          <Link href="/product" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm font-medium ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-xs sm:p-8"
      >
        {/* Hidden input so FormData gets the uploaded ufsUrl */}
        <input type="hidden" name="imageUrl" value={imageUrl} />

        {/* Name + Auto Slug */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Winter Embroidered Suit"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="slugPreview">Slug (Auto-generated)</Label>
              {isManualSlug && (
                <button
                  type="button"
                  onClick={handleResetAuto}
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <Sparkles className="h-3 w-3" />
                  Auto-sync
                </button>
              )}
            </div>
            <Input
              id="slugPreview"
              type="text"
              value={slugPreview}
              onChange={handleSlugChange}
              placeholder="winter-embroidered-suit"
              className="font-mono text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category *</Label>
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue=""
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <option value="" disabled>
              {safeCategories.length > 0
                ? "Select Category"
                : "No categories available"}
            </option>
            {safeCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* UploadThing ImageUploader */}
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <ImageUploader
            imageUrl={imageUrl}
            onChange={setImageUrl}
            label="Product Image"
          />
        </div>

        {/* Price + Compare Price + Stock */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="4990"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comparePrice">Compare Price</Label>
            <Input
              id="comparePrice"
              name="comparePrice"
              type="number"
              step="0.01"
              min="0"
              placeholder="6500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock *</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              required
              defaultValue="10"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            placeholder="Write product details..."
            className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap items-center gap-6 rounded-xl border border-border bg-muted/40 p-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked
              className="h-4 w-4 accent-primary"
            />
            Published
          </label>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
            <input
              type="checkbox"
              name="isFeatured"
              className="h-4 w-4 accent-primary"
            />
            Featured
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" asChild>
            <Link href="/product">Cancel</Link>
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="min-w-36 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Create Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}