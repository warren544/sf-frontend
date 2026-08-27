"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function PhotoField({
  defaultValue,
}: {
  defaultValue?: string | null;
}) {
  const [photoUrl, setPhotoUrl] = useState(defaultValue ?? "");
  const [error, setError] = useState("");

  function handleFileChange(file: File | undefined) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Photo must be 5 MB or smaller.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoUrl(reader.result);
        setError("");
      }
    };

    reader.onerror = () => {
      setError("The photo could not be read.");
    };

    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setPhotoUrl("");
    setError("");
  }

  return (
    <div className="flex items-center gap-4">
      <div className="contact-avatar relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full font-display text-xl font-semibold">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt="Contact profile preview"
            fill
            sizes="64px"
            unoptimized
            className="object-cover"
          />
        ) : (
          <span aria-hidden="true">?</span>
        )}
      </div>

      <div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">
          <ImagePlus className="h-4 w-4" aria-hidden="true" />

          {photoUrl ? "Replace photo" : "Add photo"}

          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="sr-only"
            onChange={(event) =>
              handleFileChange(event.target.files?.[0])
            }
          />
        </label>

        {photoUrl ? (
          <button
            type="button"
            onClick={removePhoto}
            className="ml-3 text-xs text-muted-foreground hover:text-destructive"
          >
            <Trash2
              className="mr-1 inline h-3.5 w-3.5"
              aria-hidden="true"
            />
            Remove
          </button>
        ) : null}

        <input
          type="hidden"
          name="photo_url"
          value={photoUrl}
          readOnly
        />

        <p className="mt-1.5 text-xs text-muted-foreground">
          JPG, PNG, GIF, or WebP up to 5 MB.
        </p>

        {error ? (
          <p role="alert" className="mt-1 text-xs text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
