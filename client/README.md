# Admission Management Dashboard

A component-based React + Tailwind CSS dashboard for college/university admission management.

## Project Structure

```
src/
├── App.jsx                          # Entry point
├── data/
│   └── admissionData.js             # All mock data (stats, applications, pipeline, etc.)
└── components/
    ├── ui/                          # Reusable primitives
    │   ├── Badge.jsx                # Coloured badge (success / info / warning / danger)
    │   ├── StatusPill.jsx           # Application status pill
    │   └── NavIcon.jsx              # SVG icon resolver for sidebar nav
    └── dashboard/                   # Feature components
        ├── Dashboard.jsx            # Root layout — composes all sections
        ├── Sidebar.jsx              # Left nav with branding + user profile
        ├── TopBar.jsx               # Header with search + actions
        ├── StatsGrid.jsx            # 4-column KPI stat cards
        ├── MonthlyChart.jsx         # Bar chart — current vs previous year
        ├── PipelineFunnel.jsx       # Admission stage funnel with progress bars
        ├── ApplicationsTable.jsx    # Filterable applications table
        ├── ActivityFeed.jsx         # Timestamped recent activity list
        └── ProgrammeBreakdown.jsx   # Per-programme application breakdown
```

## Quick Start

```bash
# 1. Create a new Vite + React project
npm create vite@latest admission-app -- --template react

# 2. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Copy this src/ folder into your project

# 4. Configure tailwind.config.js
#    content: ["./index.html", "./src/**/*.{js,jsx}"]

# 5. Add Tailwind directives to src/index.css
#    @tailwind base;
#    @tailwind components;
#    @tailwind utilities;

# 6. Run
npm run dev
```

## Customising Data

All data lives in `src/data/admissionData.js`. Update the exported arrays and objects to connect to your real API — no component changes needed.

## Adding a New Page

1. Create `src/components/YourPage/YourPage.jsx`
2. Add a route (if using React Router) or swap `<Dashboard />` in `App.jsx`
3. Reuse `<Badge>`, `<StatusPill>`, and `<NavIcon>` from `src/components/ui/`