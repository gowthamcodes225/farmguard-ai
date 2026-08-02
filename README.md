# FarmGuard AI 🌾

**FutureTech HackFest 2026** — Theme: *Innovating Tomorrow with Emerging Technologies*

AI-powered full-stack crop disease detection platform for smart agriculture.

## Problem
Small farmers lose 20-40% of crops due to late disease detection. Expert agronomists are scarce in rural areas.

## Solution
FarmGuard AI lets farmers upload a leaf photo and instantly get disease identification, confidence score, severity level, and treatment recommendations — powered by Machine Learning.

## Tech Stack (Full Stack)
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, Tailwind CSS |
| Backend | Next.js API Routes (Node.js) |
| Database | JSON file persistence (scans history) |
| AI/ML | Hugging Face Vision Transformer model |
| Auth | JWT-style session (demo login) |

## Features
- 🔐 Farmer login & authentication
- 📷 Upload crop leaf image
- 🤖 AI disease detection with confidence score
- 💊 Treatment recommendations
- 📊 Dashboard with scan history & analytics
- ⚠️ Severity classification (Low / Medium / High)

## Focus Areas
- Agriculture Technology
- Artificial Intelligence & Machine Learning
- Sustainable and Green Technologies

## Quick Start
```bash
cd farmguard-ai
npm install
npm run dev
```
Open http://localhost:3000

**Demo Login:** `farmer@farmguard.ai` / `demo123`

## Optional: Real AI
Add Hugging Face token to `.env.local`:
```
HF_TOKEN=your_token_here
```

## Demo Flow
1. Login with demo credentials
2. Go to Scan → upload leaf image
3. Click "Analyze Disease" → see AI results
4. Check Dashboard for history & stats

## Team
Individual Participation — FutureTech HackFest 2026

## Contact
[Your Name] | [Your Email] | [Your Phone]
