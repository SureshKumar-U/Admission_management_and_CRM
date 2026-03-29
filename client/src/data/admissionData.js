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

  export const programs = [
    { id: 1, deptId: 1, name: "B.E. Computer Science", code: "CSE", type: "UG", intake: 120, academicYear: "2025-26",
      quotas: { KCET: { total: 60, filled: 42 }, COMEDK: { total: 30, filled: 18 }, Management: { total: 30, filled: 20 } } },
    { id: 2, deptId: 2, name: "B.E. Electronics & Comm.", code: "ECE", type: "UG", intake: 60, academicYear: "2025-26",
      quotas: { KCET: { total: 30, filled: 30 }, COMEDK: { total: 15, filled: 9 }, Management: { total: 15, filled: 5 } } },
    { id: 3, deptId: 3, name: "B.E. Mechanical", code: "ME", type: "UG", intake: 60, academicYear: "2025-26",
      quotas: { KCET: { total: 30, filled: 12 }, COMEDK: { total: 15, filled: 4 }, Management: { total: 15, filled: 3 } } },
  ]
 export const applicants = [
    { id: 1, name: "Aarav Sharma", email: "aarav@email.com", phone: "9876543210", category: "GM", entryType: "Regular", quota: "KCET", programId: 1, allotmentNo: "KCT2025001", marks: 185, docStatus: "Verified", feeStatus: "Paid", status: "Confirmed", admissionNo: "VIT/2025/UG/CSE/KCET/0001" },
    { id: 2, name: "Priya Nair", email: "priya@email.com", phone: "9876543211", category: "SC", entryType: "Regular", quota: "COMEDK", programId: 1, allotmentNo: "CMD2025045", marks: 171, docStatus: "Submitted", feeStatus: "Pending", status: "Pending", admissionNo: null },
    { id: 3, name: "Rohan Patel", email: "rohan@email.com", phone: "9876543212", category: "OBC", entryType: "Regular", quota: "Management", programId: 2, allotmentNo: null, marks: 162, docStatus: "Pending", feeStatus: "Pending", status: "Pending", admissionNo: null },
    { id: 4, name: "Sneha Reddy", email: "sneha@email.com", phone: "9876543213", category: "GM", entryType: "Lateral", quota: "KCET", programId: 3, allotmentNo: "KCT2025099", marks: 178, docStatus: "Verified", feeStatus: "Paid", status: "Confirmed", admissionNo: "VIT/2025/UG/ME/KCET/0001" },
    { id: 5, name: "Kiran Kumar", email: "kiran@email.com", phone: "9876543214", category: "ST", entryType: "Regular", quota: "KCET", programId: 2, allotmentNo: "KCT2025060", marks: 159, docStatus: "Pending", feeStatus: "Pending", status: "Pending", admissionNo: null },
  ]
