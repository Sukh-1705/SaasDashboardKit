# SaaS Dashboard-KIT

A modern, responsive SaaS admin dashboard template built with HTML, CSS, and JavaScript. Includes analytics, user management, settings, and login pages with dark mode support.

## 🚀 Live Demo
[https://saasdashboardkit-bysukh.netlify.app](https://saasdashboardkit-bysukh.netlify.app)

---

## 📁 Folder Structure
```
Saas Dashboard-KIT/
├── analytics.html         # Analytics dashboard page
├── charts/               # Chart.js config and chart scripts
│   └── chart-config.js
├── css/
│   └── style.css         # Main stylesheet (light & dark mode)
├── index.html            # Main dashboard page
├── js/
│   ├── analytics.js      # Analytics page JS
│   ├── login.js          # Login page JS
│   ├── script.js         # Main JS (theme, sidebar, etc.)
│   ├── settings.js       # Settings page JS
│   └── users.js          # Users page JS
├── login.html            # Login page
├── settings.html         # Settings page
├── users.html            # User management page
├── _redirects            # Netlify redirects for pretty URLs
└── README.md             # Project info (this file)
```

## ✨ Features
- Responsive multi-page dashboard UI
- Analytics, Users, Settings, and Login pages
- Dark mode toggle (persists across all pages)
- Pretty URLs (e.g., `/analytics`, `/login`)
- Chart.js integration for analytics
- Toast notifications, modals, dropdowns, and more
- Built for easy deployment on Netlify

## 🛠️ Getting Started
1. **Clone or download this repo**
2. **Open `index.html` in your browser** (for local preview)
3. **To deploy:**
   - Drag & drop the folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or use Netlify CLI:
     ```sh
     npm install -g netlify-cli
     netlify deploy --prod
     ```

## ⚡ Deployment
- **Production:** [https://saasdashboardkit-bysukh.netlify.app](https://saasdashboardkit-bysukh.netlify.app)
- Netlify auto-detects static sites, no build step needed.
- `_redirects` file ensures pretty URLs for main pages.

## 🌓 Dark Mode
- Toggle dark/light mode using the moon/sun icon in the navbar.
- Theme preference is saved and persists across all pages.

## 📄 License
MIT (or specify your license here) 