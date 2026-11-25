"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProduct } from "@/lib/adminserverAction/product";

interface ProductRowActionsProps {
  productId: string;
  productSlug: string;
  productName: string;
}

export function ProductRowActions({
  productId,
  productSlug,
  productName,
}: ProductRowActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = () => {
    setErrorMessage(null);

    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"?`
    );
    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteProduct(productId);

      if (!result.success) {
        setErrorMessage(result.message ?? "Could not delete product.");
        return;
      }

      router.refresh();
    });
  };

  return (
    <div className="inline-flex flex-col items-end gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              aria-label={`Actions for ${productName}`}
              className="h-8 w-8 rounded-full bg-gray-50 p-0 hover:bg-gray-100 disabled:opacity-50"
            />
          }
        >
          <MoreHorizontal className="h-4 w-4 text-gray-500" aria-hidden="true" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem render={<Link href={`/product/${productSlug}`} />}>
            View Details
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href={`/product/edit/${productId}`} />}>
            Edit Product
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={isPending}
            onClick={handleDelete}
            className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
          >
            {isPending ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {errorMessage && (
        <span role="alert" className="max-w-[220px] text-right text-xs text-red-600">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default ProductRowActions;