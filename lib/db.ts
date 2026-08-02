import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export interface Scan {
  id: string;
  cropType: string;
  disease: string;
  confidence: number;
  treatment: string;
  severity: string;
  createdAt: string;
}

const DATA_DIR = join(process.cwd(), "data");
const SCANS_FILE = join(DATA_DIR, "scans.json");

// In-memory fallback for Vercel/serverless (filesystem is ephemeral)
let memoryScans: Scan[] = [];

function useMemoryStore() {
  return process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
}

function ensureFile() {
  if (useMemoryStore()) return;
  if (!existsSync(DATA_DIR)) {
    const { mkdirSync } = require("fs");
    mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!existsSync(SCANS_FILE)) {
    writeFileSync(SCANS_FILE, "[]", "utf-8");
  }
}

export function getScans(): Scan[] {
  if (useMemoryStore()) return memoryScans;
  ensureFile();
  return JSON.parse(readFileSync(SCANS_FILE, "utf-8"));
}

export function addScan(scan: Scan): Scan {
  if (useMemoryStore()) {
    memoryScans.unshift(scan);
    return scan;
  }
  const scans = getScans();
  scans.unshift(scan);
  writeFileSync(SCANS_FILE, JSON.stringify(scans, null, 2), "utf-8");
  return scan;
}
