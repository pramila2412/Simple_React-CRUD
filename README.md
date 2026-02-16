# MedLink Admin Dashboard

Internal dashboard for managing medical entities (hospitals, clinics, distributors). 

## Tech Stack
- React + TypeScript (Vite)
- Material UI (Custom Theme)
- JSON Server (Local Dev API)

## Setup

1. **Install**
   ```bash
   npm install
   ```

2. **Run Dev Environment**
   ```bash
   # Starts both Vite and JSON Server
   npm run dev
   npm run server
   ```

   - App: http://localhost:5173
   - API: http://localhost:3001

## Notes
- **Config**: Form fields are generated from `src/config/userSchema.ts`. To add a field, just update the schema object.
- **Deployment**: Read [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel/Netlify instructions. (Includes info on the Mock Mode fallback).
