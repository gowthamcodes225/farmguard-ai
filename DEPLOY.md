# Deploy FarmGuard AI (5 minutes)

## Step 1 — Push to GitHub

1. Open https://github.com/new
2. Repository name: `farmguard-ai`
3. Keep it **Public**
4. Do NOT add README / .gitignore (already in project)
5. Click **Create repository**

6. In terminal, run (replace YOUR_USERNAME):

```powershell
cd "C:\Users\S.Gowtham\OneDrive\Desktop\1st\farmguard-ai"
git remote add origin https://github.com/YOUR_USERNAME/farmguard-ai.git
git branch -M main
git push -u origin main
```

Login with GitHub when browser opens.

---

## Step 2 — Deploy on Vercel

1. Open https://vercel.com/signup → Sign up with **GitHub**
2. Click **Add New → Project**
3. Import `farmguard-ai` repo
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy** (no env vars needed for demo)
6. Wait ~2 min → you get URL like `https://farmguard-ai.vercel.app`

---

## Step 3 — Submit hackathon

Form: https://forms.gle/V4zMoxnws87GE1wx6

- **Project link:** your Vercel URL
- **GitHub:** `https://github.com/YOUR_USERNAME/farmguard-ai`
- **Login:** `farmer@farmguard.ai` / `demo123`

---

## Alternative — Vercel CLI (terminal)

```powershell
cd "C:\Users\S.Gowtham\OneDrive\Desktop\1st\farmguard-ai"
npx vercel login
npx vercel --prod
```

Follow browser login, then copy the production URL.
