"use client";

import { useState, useCallback, useMemo } from "react";
import NextImage from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { 
  validateImageFile, 
  compressImage, 
  generateImageId, 
  fileToPreview,
  DEFAULT_IMAGE_UPLOAD_CONFIG,
  type ImageUploadConfig,
  type ImageFile 
} from "@/utils/imageUtils";

interface ImageUploadProps {
  maxImages?: number;
  maxSizeMB?: number;
  quality?: number;
  maxWidth?: number;
  onChange?: (files: File[]) => void;
}

export default function ImageUpload({ 
  maxImages = DEFAULT_IMAGE_UPLOAD_CONFIG.maxImages,
  maxSizeMB = DEFAULT_IMAGE_UPLOAD_CONFIG.maxSizeMB,
  quality = DEFAULT_IMAGE_UPLOAD_CONFIG.quality,
  maxWidth = DEFAULT_IMAGE_UPLOAD_CONFIG.maxWidth,
  onChange,
}: ImageUploadProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = useMemo<ImageUploadConfig>(() => ({
    maxImages,
    maxSizeMB,
    quality,
    maxWidth,
    allowedTypes: DEFAULT_IMAGE_UPLOAD_CONFIG.allowedTypes,
  }), [maxImages, maxSizeMB, quality, maxWidth]);

  const processFiles = useCallback(async (files: FileList | File[]) => {
    setError(null);
    setIsProcessing(true);

    try {
      const fileArray = Array.from(files);
      const remainingSlots = maxImages - images.length;
      
      if (remainingSlots <= 0) {
        setError(`الحد الأقصى ${maxImages} صور`);
        return;
      }

      const filesToProcess = fileArray.slice(0, remainingSlots);
      const newImages: ImageFile[] = [];

      for (const file of filesToProcess) {
        const validation = validateImageFile(file, config);
        if (!validation.valid) {
          setError(validation.error || "ملف غير صالح");
          continue;
        }

        try {
          const compressedBlob = await compressImage(file, maxWidth, quality);
          const compressedFile = new File([compressedBlob], file.name, { type: "image/jpeg" });
          const preview = await fileToPreview(compressedFile);
          
          newImages.push({
            id: generateImageId(),
            file: compressedFile,
            preview,
            compressed: true,
          });
        } catch {
          const preview = await fileToPreview(file);
          newImages.push({
            id: generateImageId(),
            file,
            preview,
          });
        }
      }

      if (newImages.length > 0) {
        const updated = [...images, ...newImages];
        setImages(updated);
        onChange?.(updated.map(img => img.file));
      }
    } catch (err) {
      setError("حدث خطأ أثناء معالجة الصور");
    } finally {
      setIsProcessing(false);
    }
  }, [images, maxImages, maxWidth, quality, config, onChange]);

  const removeImage = useCallback((id: string) => {
    const updated = images.filter(img => img.id !== id);
    setImages(updated);
    onChange?.(updated.map(img => img.file));
  }, [images, onChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all
          ${isDragging 
            ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20" 
            : "border-slate-300 dark:border-slate-600 hover:border-sky-400"
          }
          ${isProcessing ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        <input
          type="file"
          accept={config.allowedTypes.join(",")}
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="space-y-2">
          {isProcessing ? (
            <Loader2 size={40} className="mx-auto text-sky-500 animate-spin" />
          ) : (
            <Upload size={40} className="mx-auto text-slate-400" />
          )}
          <p className="text-sm text-slate-600 dark:text-slate-400">
            اسحب الصور هنا أو انقر للاختيار
          </p>
          <p className="text-xs text-slate-500">
            PNG, JPG, WebP -_max {maxSizeMB}MB لكل صورة
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((image) => (
            <ImagePreview
              key={image.id}
              image={image}
              onRemove={() => removeImage(image.id)}
            />
          ))}
        </div>
      )}

      {/* Image count */}
      <p className="text-xs text-slate-500 text-center">
        {images.length} / {maxImages} صور
      </p>
    </div>
  );
}

interface ImagePreviewProps {
  image: ImageFile;
  onRemove: () => void;
}

function ImagePreview({ image, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden group bg-slate-100 dark:bg-slate-800">
      <NextImage
        src={image.preview}
        alt="Preview"
        fill
        className="object-cover"
        sizes="100px"
      />
      {image.compressed && (
        <span className="absolute top-1 left-1 bg-sky-500 text-white text-[8px] px-1.5 py-0.5 rounded-full">
          مضغوط
        </span>
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="إزالة الصورة"
      >
        <X size={14} />
      </button>
    </div>
  );
}