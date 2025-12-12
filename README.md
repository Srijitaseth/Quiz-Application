# Real-life Vercel Deployment
- https://quiz-application-sepia-one.vercel.app

# Quiz Application – README

This project is an interactive quiz application built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. It includes animated UI elements, custom SVG/GIF assets, multi-step question flow, score calculation, and a polished visual design closely replicating a provided reference.

---

## Features

### Quiz Engine
- Multi-question quiz flow with next and previous navigation.
- Tracks user selections and restores answers when navigating.
- Calculates final score based on correct answers.
- Animated score reveal using incremental counting.

### User Interface
- Fully responsive and visually polished design.
- Smooth transitions powered by Framer Motion.
- Gradient background and bordered card layout matching the reference design.
- Custom SVG title, speech bubble, and animated paw elements.
- Gradient buttons and clean progress indicators.

### Paw Animation
- Uses a pre-rendered GIF (`/paw.gif`) placed in the public folder.
- Animation appears only on the first question screen.
- Speech bubble and paw are placed outside the card to prevent clipping.
- Precise alignment based on the provided reference design.

### Accessibility
- Buttons are fully keyboard-accessible with focus states.
- SVG images include descriptive alt text.
- Strong color contrast for readability.

---

## Project Structure
root/
│
├── public/
│   ├── paw.gif
│   ├── paw.svg
│   ├── bestofluck.svg
│   └── testyourknowledge.svg
│
├── app/
│   └── page.tsx
│
├── package.json
├── tailwind.config.js
└── README.md

---

## Technology Stack

- Next.js  
- React  
- TypeScript  
- Tailwind CSS  
- Framer Motion  
- Lucide Icons  

---

## Running the Project Locally

### Prerequisites
- Node.js 18+
- npm, pnpm, or yarn installed

### Install Dependencies
```bash
npm install

Start Development Server
npm run dev


Open the App
http://localhost:3000

Building for Production
npm run build
npm start


