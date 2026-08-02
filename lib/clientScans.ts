export interface Scan {
  id: string;
  cropType: string;
  disease: string;
  confidence: number;
  treatment: string;
  severity: string;
  createdAt: string;
}

const KEY = "farmguard_scans";

export function getClientScans(): Scan[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveClientScan(scan: Scan): void {
  const scans = getClientScans();
  scans.unshift(scan);
  localStorage.setItem(KEY, JSON.stringify(scans));
}

export function compressImage(file: File, maxWidth = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image"));
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas error"));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.75).split(",")[1]);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
