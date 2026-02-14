# MeloloTube

A video streaming platform built with React and Vite.

## 🚀 Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

This project uses GitHub Pages for deployment with a custom domain (sonzaix.me).

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Deploy the `dist/` folder to the `gh-pages` branch

### Custom Domain

The CNAME file in the `public/` directory ensures that the custom domain (`sonzaix.me`) is preserved after deployment.

## 📦 Project Structure

```
.
├── public/          # Static assets (copied to dist)
│   └── CNAME       # GitHub Pages custom domain
├── src/
│   ├── App.jsx     # Main React component
│   ├── main.jsx    # Application entry point
│   └── index.css   # Global styles (Tailwind CSS)
├── index.html      # HTML template
├── vite.config.js  # Vite configuration
└── package.json    # Dependencies and scripts
```

## 🛠️ Technologies

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Lucide React** - Icon library
- **gh-pages** - GitHub Pages deployment tool

## 📝 License

This is a private project.
