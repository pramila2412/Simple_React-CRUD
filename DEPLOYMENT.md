# Deployment Guide

Since this is a React Vite app, it can be deployed for free on Vercel or Netlify.

## Important Note regarding JSON Server
The `json-server` (our local API) **cannot runs on static hosts** like Vercel or Netlify. It requires a backend server (Node.js).

However, I've added a fallback mode:
- When deployed, the API calls will fail.
- The app will automatically switch to **Mock Mode** using LocalStorage.
- This means the app will Work perfectly fine for demos, but data won't persist across different browsers.

---

## Option 1: Vercel (Recommended)

1. Go to [Vercel.com](https://vercel.com) and Sign Up/Login.
2. Click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository.
4. **Framework Preset**: Verify it says `Vite`.
5. **Build Command**: `npm run build` (default).
6. **Output Directory**: `dist` (default).
7. Click **Deploy**.

## Option 2: Netlify

1. Go to [Netlify.com](https://netlify.com) and Sign Up/Login.
2. Click **"Add new site"** -> **"Import from existing project"**.
3. Connect to GitHub and pick your repo.
4. **Build command**: `npm run build`.
5. **Publish directory**: `dist`.
6. Click **Deploy site**.

Once deployed, share the link! The app will be live and usable immediately.
