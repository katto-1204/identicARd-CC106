# identicARd-CC106

**identicARd-CC106** is a high-fidelity, interactive AR character profile platform built for the web. It showcases individual 3D character models alongside beautiful, dynamically stylized ID cards in a seamless 3D viewing experience.

## ✨ Features

- **Interactive 3D Viewer:** Built with `@react-three/fiber` and `@react-three/drei`, allowing users to spin, interact, and view top-down perspectives of dynamic `.glb` 3D character models.
- **Cinematic Card Animations:** Fluid CSS 3D perspectives make the background identity card lean perfectly into the depth of the screen. Hovering (or long-pressing on mobile) for 3 seconds triggers a beautiful slow-rise leveling animation.
- **Valorant-Inspired UI:** A premium, cyberpunk-esque dark mode aesthetic featuring clean typography, distinct brand gradients, and a frosted-glass UI.
- **Audio Integration:** Each character profile features bespoke voice line playability directly in the browser.
- **Responsive & Mobile-Ready:** Fully optimized for seamless touch controls, preventing default mobile context menus so long-press animations feel native.

## 🚀 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Rendering:** [Three.js](https://threejs.org/) via React Three Fiber
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Styling:** Tailwind CSS + Vanilla CSS
- **Routing:** Wouter
- **Icons:** Lucide React

## 📦 Getting Started

To run this project locally, clone the repository and install its dependencies:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🌐 Deployment (Vercel)

This project is fully optimized for **Vercel** deployment out of the box. 

1. Push your code to your GitHub repository.
2. Log into [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your GitHub repository (`katto-1204/identicARd-CC106`).
4. Vercel will automatically detect the **Vite** preset (`npm run build` and `dist` directory).
5. Click **Deploy**!

## 👥 Team Core — Architects of the Terminal

- **Xander Jyle P. Palma** (Backend Developer)
- **Eliza Marie M. Abing** (UI/UX Designer)
- **Ashlee M. Madriñan** (QA / Tester)
- **Catherine Arnado** (Developer & Designer)

---
*Built for CC106.*
