<div align="center">
  <img src="./public/logo2.png" alt="Texas Ethics Law Book" width="120" />

  # 🏛️ Texas Ethics Law Book - Premium Frontend

  **A Next-Generation Digital Law Library & Practice Guide**

  <p>
    <a href="https://texas-ethics-book-frontend.vercel.app" target="_blank">View Live Website</a>
    ·
    <a href="https://documenter.getpostman.com/view/34968572/2sBY4SLyYk" target="_blank">API Documentation</a>
  </p>

  ![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
  ![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)
  ![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux)
</div>

<br />

> **Welcome to the Texas Ethics Law Book frontend repository!** This project is designed with a strong focus on **Premium Aesthetics**, **Fluid Animations**, and **Seamless User Experience**. It serves as the digital front door for law students, professionals, and anyone preparing for the Texas Ethics exam.

---

## ✨ Premium Interface & Animations

We believe a modern web application should feel alive. That's why this frontend is heavily optimized for a buttery-smooth, premium user experience:

- 🎭 **Framer Motion Integration:** Staggered fade-ins, floating hero images, and scroll-reveals that make the UI feel highly interactive without compromising performance.
- 🎨 **Modern Tailwind CSS v4 Architecture:** Beautiful glassmorphism, soft shadows, sleek dark mode transitions, and highly tailored custom color palettes.
- 🧩 **Radix UI & Accessible Components:** Built with headless Radix UI primitives ensuring high accessibility and pristine custom styling.
- ⚡ **Next.js 16 App Router:** Lightning-fast page transitions, Server-Side Rendering (SSR), and advanced caching for a truly "app-like" experience on the web.

## 🛠️ Technology Stack

| Category | Technologies Used |
|----------|------------------|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Styling & UI** | Tailwind CSS v4, Radix UI, Lucide React |
| **Animations** | Framer Motion, Lottie React |
| **State Management** | Redux Toolkit (RTK), Redux Persist |
| **Forms & Validation** | React Hook Form, Zod |
| **Authentication** | NextAuth.js |
| **Payments** | Stripe Checkout Integration (`@stripe/react-stripe-js`) |
| **Rich Text Editor** | TipTap |

## 🚀 Getting Started

### 1. Clone & Install
Ensure you have **Node.js (v18+)** installed.

```bash
git clone https://github.com/forhadislamse/texas_ethics_book_frontend.git
cd texas_ethics_book_frontend

# Install dependencies using npm
npm install
```

### 2. Environment Variables
You will need to set up the environment variables to connect to the backend and Stripe.

1. Locate the `.env.example` file in the root directory.
2. Create a new file named `.env.local` and copy the contents over.
3. Fill in the required keys (e.g., `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`).

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Folder Structure

```
├── public/                # Static assets (images, logos, SVGs)
├── src/
│   ├── app/               # Next.js 16 App Router (Pages, Layouts, API Routes)
│   ├── components/        # Reusable UI components (Buttons, Modals, Cards)
│   ├── lib/               # Utility functions, Redux store, and hooks
│   ├── types/             # TypeScript type definitions
│   └── styles/            # Global styles and Tailwind configuration
├── .env.example           # Example environment variables
└── package.json           # Dependencies and scripts
```

## 💎 Key Features

- **📖 Interactive Reader Dashboard:** A focused, distraction-free reading mode with progress tracking, bookmarks, and rich text rendering (TipTap).
- **💳 Seamless Checkout:** Stripe-powered subscription plans integrated directly into the UI with instant success/failure handling.
- **🔐 Secure User Portal:** Protected routes via NextAuth, allowing users to update their profile, change passwords, and manage subscriptions safely.
- **📱 Fully Responsive:** Carefully crafted mobile and tablet experiences ensuring the premium feel remains intact across all screen sizes.

---

<p align="center">
  <i>Designed and built for excellence. Happy Coding! 🚀</i>
</p>
