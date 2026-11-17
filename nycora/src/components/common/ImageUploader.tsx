
"use client";

import { UploadButton } from "@/utils/uploadthing";

interface ImageUploaderProps {
  imageUrl: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({
  imageUrl,
  onChange,
  label = "Upload Image",
}: ImageUploaderProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      {imageUrl ? (
        <div className="space-y-3">
          {/* Image Preview */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden border">
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-xs text-green-600 font-semibold">
            ✓ Image uploaded successfully!
          </p>

          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-500 underline hover:text-red-700"
          >
            Change Image
          </button>
        </div>
      ) : (
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            container: {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
            },
            button: {
              backgroundColor: "#111827",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "inline-flex",
              minWidth: "180px",
              justifyContent: "center",
            },
            allowedContent: {
              color: "#6b7280",
              fontSize: "12px",
            },
          }}
          onClientUploadComplete={(res) => {
            if (res?.[0]) {
              onChange(res[0].ufsUrl);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`Upload failed: ${error.message}`);
            console.error(error);
          }}
        />
      )}
    </div>
  );
}
