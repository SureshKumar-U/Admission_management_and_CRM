export const stats = [
  { label: "Total Applications", value: "3,142", badge: "↑ 14%", badgeType: "success", sub: "vs last year", accent: "#14b8a6" },
  { label: "Under Review", value: "718", badge: "Active", badgeType: "info", sub: "in pipeline", accent: "#378add" },
  { label: "Offer Letters Sent", value: "524", badge: "↑ 9%", badgeType: "success", sub: "vs last year", accent: "#639922" },
  { label: "Enrolled Students", value: "389", badge: "74%", badgeType: "warning", sub: "conversion", accent: "#ef9f27" },
];

export const monthlyData = {
  months: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
  current: [95, 280, 560, 810, 690, 510, 340, 190, 120],
  previous: [80, 230, 490, 720, 600, 440, 290, 160, 90],
};

export const pipeline = [
  { name: "Applied", count: 3142, pct: 100, color: "#14b8a6" },
  { name: "Screened", count: 2180, pct: 69, color: "#378add" },
  { name: "Written Test", count: 1240, pct: 39, color: "#ef9f27" },
  { name: "Interview", count: 780, pct: 25, color: "#9f77dd" },
  { name: "Offer Sent", count: 524, pct: 17, color: "#639922" },
  { name: "Enrolled", count: 389, pct: 12, color: "#0c1e3c" },
];

export const applications = [
  { id: 1, name: "Ananya Sharma", initials: "AS", avatarBg: "#e6f1fb", avatarColor: "#185fa5", programme: "B.Tech CSE", dept: "Engineering", date: "20 Mar", score: 94, status: "accepted" },
  { id: 2, name: "Rohit Verma", initials: "RV", avatarBg: "#e1f5ee", avatarColor: "#0f6e56", programme: "MBA (Finance)", dept: "Management", date: "21 Mar", score: 81, status: "review" },
  { id: 3, name: "Priya Nair", initials: "PN", avatarBg: "#faeeda", avatarColor: "#854f0b", programme: "M.Sc Data Sci", dept: "Science", date: "22 Mar", score: 87, status: "pending" },
  { id: 4, name: "Kiran Rao", initials: "KR", avatarBg: "#fcebeb", avatarColor: "#a32d2d", programme: "B.Tech ECE", dept: "Engineering", date: "22 Mar", score: 61, status: "rejected" },
  { id: 5, name: "Sneha Patel", initials: "SP", avatarBg: "#eaf3de", avatarColor: "#3b6d11", programme: "BBA", dept: "Management", date: "23 Mar", score: 76, status: "accepted" },
  { id: 6, name: "Arjun Mehta", initials: "AM", avatarBg: "#eeedfe", avatarColor: "#534ab7", programme: "B.Tech CSE", dept: "Engineering", date: "24 Mar", score: 72, status: "review" },
  { id: 7, name: "Divya Iyer", initials: "DI", avatarBg: "#fbeaf0", avatarColor: "#993556", programme: "M.Sc Chemistry", dept: "Science", date: "25 Mar", score: 83, status: "pending" },
];

export const recentActivity = [
  { id: 1, dot: "#639922", name: "Ananya Sharma", action: "accepted for B.Tech CSE", time: "5 min ago" },
  { id: 2, dot: "#ef9f27", name: "Rohit Verma", action: "interview scheduled for 28 Mar", time: "22 min ago" },
  { id: 3, dot: "#378add", name: "System", action: "56 new applications received today", time: "1 hr ago" },
  { id: 4, dot: "#a32d2d", name: "Kiran Rao", action: "application rejected — low entrance score", time: "2 hr ago" },
  { id: 5, dot: "#14b8a6", name: "Sneha Patel", action: "documents verified and approved", time: "3 hr ago" },
  { id: 6, dot: "#9f77dd", name: "Arjun Mehta", action: "moved to interview stage", time: "4 hr ago" },
];

export const programmes = [
  { name: "B.Tech CSE", count: 980, pct: 31, color: "#14b8a6" },
  { name: "MBA", count: 720, pct: 23, color: "#378add" },
  { name: "B.Tech ECE", count: 540, pct: 17, color: "#ef9f27" },
  { name: "M.Sc Data Sci", count: 460, pct: 15, color: "#9f77dd" },
  { name: "BBA", count: 280, pct: 9, color: "#639922" },
  { name: "Others", count: 162, pct: 5, color: "#888780" },
];

