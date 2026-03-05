import fs from "fs/promises";
import path from "path";

export interface StorageProvider {
  upload(filename: string, buffer: Buffer): Promise<string>;
}

class LocalStorage implements StorageProvider {
  async upload(filename: string, buffer: Buffer) {
    const clean = `${Date.now()}-${filename}`.replace(/[^a-zA-Z0-9._-]/g, "");
    const rel = `/uploads/${clean}`;
    const full = path.join(process.cwd(), "public", rel);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, buffer);
    return rel;
  }
}

export const storageProvider: StorageProvider = new LocalStorage();
