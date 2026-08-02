"use client";

import { useState } from "react";
import Link from "next/link";
import { compressImage, saveClientScan, type Scan } from "@/lib/clientScans";

export default function ScanPage() {
  const [cropType, setCropType] = useState("Tomato");
  const [preview, setPreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Scan | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    try {
      const base64 = await compressImage(file);
      setImageBase64(base64);
      setPreview(`data:image/jpeg;base64,${base64}`);
      setResult(null);
    } catch {
      setError("Could not load image. Try a smaller JPG/PNG file.");
    }
  }

  async function analyze() {
    if (!imageBase64) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64, cropType }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Analysis failed. Please try again.");
        return;
      }
      saveClientScan(data);
      setResult(data);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const severityColor =
    result?.severity === "High" ? "text-red-400" :
    result?.severity === "Medium" ? "text-yellow-400" : "text-emerald-400";

  return (
    <div className="min-h-screen">
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-emerald-400">🌾 FarmGuard AI</div>
        <div className="flex gap-4 text-sm">
          <Link href="/scan" className="text-emerald-400">Scan</Link>
          <Link href="/dashboard" className="text-slate-400 hover:text-white">Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Crop Disease Scanner</h1>
          <p className="text-slate-400 text-sm mt-1">Upload a leaf photo for AI-powered disease detection</p>
        </div>

        {error && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Crop Type</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2"
              >
                <option>Tomato</option>
                <option>Potato</option>
                <option>Corn</option>
                <option>Rice</option>
                <option>Cotton</option>
              </select>
            </div>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-xl p-8 cursor-pointer hover:border-emerald-500 transition">
              {preview ? (
                <img src={preview} alt="preview" className="max-h-48 rounded-lg object-cover" />
              ) : (
                <>
                  <div className="text-4xl mb-2">📷</div>
                  <span className="text-slate-400 text-sm">Click to upload leaf image</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>

            <button
              onClick={analyze}
              disabled={!imageBase64 || loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Analyzing with AI..." : "🔍 Analyze Disease"}
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-4">AI Results</h2>
            {!result ? (
              <p className="text-slate-500 text-sm">Upload an image and click Analyze to see results here.</p>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Disease</span>
                  <span className="font-bold text-lg">{result.disease}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Confidence</span>
                  <span className="font-bold text-emerald-400">{result.confidence}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Severity</span>
                  <span className={`font-bold ${severityColor}`}>{result.severity}</span>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-400 mb-1">Treatment Recommendation</p>
                  <p className="text-sm">{result.treatment}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
