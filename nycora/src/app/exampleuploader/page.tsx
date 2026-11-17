
"use client";

import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

export default function ExampleUploaderPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="max-w-xl mx-auto p-8 mt-10 border rounded-xl bg-white">
      <h1 className="text-2xl font-bold mb-6">
        Test UploadThing
      </h1>

      <div className="space-y-4">
        <label className="block font-medium">
          Upload Banner Image (Max 4MB)
        </label>

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
            },
            allowedContent: {
              color: "#6b7280",
              fontSize: "12px",
            },
          }}
          onClientUploadComplete={(res) => {
            if (res?.[0]) {
              setImageUrl(res[0].ufsUrl);
              alert("Image uploaded successfully!");
              console.log("Image URL:", res[0].ufsUrl);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`Upload failed: ${error.message}`);
            console.error(error);
          }}
        />

        {imageUrl && (
          <div className="mt-6 space-y-3">
            <p className="text-green-600 font-semibold">
              Image uploaded successfully!
            </p>

            <img
              src={imageUrl}
              alt="Uploaded banner"
              className="w-full h-48 object-cover rounded-lg border"
            />

            <p className="text-xs break-all text-gray-500">
              {imageUrl}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
