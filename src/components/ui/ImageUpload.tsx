"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  compressed?: boolean;
}

interface ImageUploadProps {
  maxImages?: number;
  maxSizeMB?: number;
  quality?: number;
  maxWidth?: number;
  onChange?: (files: File[]) => void;
}

const MAX_DEFAULT = 5;
const MAX_SIZE_MB = 5;
const QUALITY = 0.8;
const MAX_WIDTH = 1920;

function compressImage(file: File, maxWidth: number, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Compression failed"));
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function ImageUpload({
  maxImages = MAX_DEFAULT,
  maxSizeMB = MAX_SIZE_MB,
  quality = QUALITY,
  maxWidth = MAX_WIDTH,
  onChange,
}: ImageUploadProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const remaining = maxImages - images.length;
      const toAdd = fileArray.slice(0, remaining);

      const validFiles = toAdd.filter((f) => {
        if (!f.type.startsWith("image/")) return false;
        if (f.size > maxSizeMB * 1024 * 1024) return false;
        return true;
      });

      if (validFiles.length === 0) return;

      setIsCompressing(true);

      const newImages: ImageFile[] = [];

      for (const file of validFiles) {
        try {
          const compressedBlob = await compressImage(file, maxWidth, quality);
          const compressedFile = new File([compressedBlob], file.name.replace(/\.[^.]+$/, ".jpg"), {
            type: "image/jpeg",
          });

          const preview = URL.createObjectURL(compressedFile);
          newImages.push({
            id: crypto.randomUUID(),
            file: compressedFile,
            preview,
            compressed: true,
          });
        } catch {
          const preview = URL.createObjectURL(file);
          newImages.push({
            id: crypto.randomUUID(),
            file,
            preview,
          });
        }
      }

      setImages((prev) => {
        const updated = [...prev, ...newImages];
        onChange?.(updated.map((img) => img.file));
        return updated;
      });

      setIsCompressing(false);
    },
    [images.length, maxImages, maxSizeMB, maxWidth, quality, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFiles(e.target.files);
    },
    [handleFiles]
  );

  const removeImage = useCallback(
    (id: string) => {
      setImages((prev) => {
        const img = prev.find((i) => i.id === id);
        if (img) URL.revokeObjectURL(img.preview);
        const updated = prev.filter((i) => i.id !== id);
        onChange?.(updated.map((i) => i.file));
        return updated;
      });
    },
    [onChange]
  );

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        role="button"
        tabIndex={0}
        aria-label="تحميل صور المنتج"
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-sky-500 bg-sky-50 scale-[1.02]"
            : "border-slate-200 hover:border-sky-400 hover:bg-slate-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleInputChange}
          className="hidden"
          aria-hidden="true"
        />

        {isCompressing ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="text-sky-500 animate-spin" />
            <p className="text-slate-600 font-medium">جاري ضغط الصور...</p>
          </div>
        ) : (
          <>
            <Upload size={32} className="text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">
              {isDragging ? "أفلت الصور هنا" : "اسحب الصور هنا أو انقر للتحميل"}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              PNG, JPG حتى {maxSizeMB}MB • حد أقصى {maxImages} صور
            </p>
          </>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200">
              <img
                src={img.preview}
                alt="معاينة الصورة"
                className="w-full h-full object-cover"
              />
              {img.compressed && (
                <span className="absolute top-1.5 left-1.5 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                  مضغوط
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(img.id);
                }}
                className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label="إزالة الصورة"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {images.length < maxImages && (
            <button
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-sky-400 hover:bg-sky-50 transition-colors text-slate-400"
            >
              <ImageIcon size={24} />
              <span className="text-xs">إضافة صورة</span>
            </button>
          )}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-slate-500">
          {images.length}/{maxImages} صورة • الحجم الإجمالي:{" "}
          {(images.reduce((sum, img) => sum + img.file.size, 0) / 1024 / 1024).toFixed(2)} MB
        </p>
      )}
    </div>
  );
}