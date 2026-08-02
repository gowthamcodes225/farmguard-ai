"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClientScans, type Scan } from "@/lib/clientScans";

export default function DashboardPage() {
  const [scans, setScans] = useState<Scan[]>([]);

  useEffect(() => {
    setScans(getClientScans());
  }, []);

  const highRisk = scans.filter((s) => s.severity === "High").length;
  const avgConfidence = scans.length
    ? Math.round(scans.reduce((a, s) => a + s.confidence, 0) / scans.length)
    : 0;

  return (
    <div className="min-h-screen">
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-emerald-400">🌾 FarmGuard AI</div>
        <div className="flex gap-4 text-sm">
          <Link href="/scan" className="text-slate-400 hover:text-white">Scan</Link>
          <Link href="/dashboard" className="text-emerald-400">Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Farmer Dashboard</h1>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{scans.length}</div>
            <div className="text-slate-400 text-sm">Total Scans</div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{highRisk}</div>
            <div className="text-slate-400 text-sm">High Risk</div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{avgConfidence}%</div>
            <div className="text-slate-400 text-sm">Avg Confidence</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 font-semibold">Scan History</div>
          {scans.length === 0 ? (
            <p className="p-6 text-slate-500 text-sm">
              No scans yet. Go to Scan page, upload a leaf image, and click Analyze.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left">Crop</th>
                  <th className="px-6 py-3 text-left">Disease</th>
                  <th className="px-6 py-3 text-left">Confidence</th>
                  <th className="px-6 py-3 text-left">Severity</th>
                  <th className="px-6 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((s) => (
                  <tr key={s.id} className="border-b border-slate-800">
                    <td className="px-6 py-3">{s.cropType}</td>
                    <td className="px-6 py-3">{s.disease}</td>
                    <td className="px-6 py-3 text-emerald-400">{s.confidence}%</td>
                    <td className="px-6 py-3">{s.severity}</td>
                    <td className="px-6 py-3 text-slate-400">
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
