export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  compressed?: boolean;
}

export interface ImageUploadConfig {
  maxImages: number;
  maxSizeMB: number;
  quality: number;
  maxWidth: number;
  allowedTypes: string[];
}

export const DEFAULT_IMAGE_UPLOAD_CONFIG: ImageUploadConfig = {
  maxImages: 5,
  maxSizeMB: 5,
  quality: 0.8,
  maxWidth: 1920,
  allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
};

export function validateImageFile(file: File, config: ImageUploadConfig): { valid: boolean; error?: string } {
  if (!config.allowedTypes.includes(file.type)) {
    return { valid: false, error: `نوع الملف ${file.type} غير مدعوم` };
  }
  
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > config.maxSizeMB) {
    return { valid: false, error: `حجم الصورة يجب أن يكون أقل من ${config.maxSizeMB}MB` };
  }
  
  return { valid: true };
}

export function compressImage(file: File, maxWidth: number, quality: number): Promise<Blob> {
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

export function generateImageId(): string {
  return `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function fileToPreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}