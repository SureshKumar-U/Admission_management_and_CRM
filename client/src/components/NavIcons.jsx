const icons = {
  grid: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="currentColor" />
      <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" fill="currentColor" />
      <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor" />
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor" />
    </svg>
  ),
  user: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 1a3 3 0 100 6 3 3 0 000-6zM2 13c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  calendar: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="1" y="2.5" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 2.5V1M10 2.5V1M1 6.5h13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  file: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="2" y="1" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 5h5M5 8h5M5 11h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  chart: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M1.5 11L5.5 6.5l3 3.5 2.5-3.5 3 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  hex: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 1.5L1.5 4.5V10l6 3.5 6-3.5V4.5l-6-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  arrow: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M3 7.5h9M9 4.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  settings: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7.5 1.5v1M7.5 12.5v1M1.5 7.5h1M12.5 7.5h1M3 3l.7.7M11.3 11.3l.7.7M11.3 3l-.7.7M3 12l.7-.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
};

export default function NavIcon({ name }) {
  return icons[name] || null;
}