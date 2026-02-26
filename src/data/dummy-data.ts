// ─── KPI Data ───
export const kpiData = {
  totalMessagesSent: "1,247,893",
  deliveryRate: "94.7%",
  activeCampaigns: 23,
  revenueThisMonth: "$48,250",
  activeSenderIds: 15,
};

// ─── Chart Data: Messages over 30 days ───
export const messagesOverTime = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 1, i + 1);
  const sent = Math.floor(30000 + Math.random() * 20000);
  const delivered = Math.floor(sent * (0.9 + Math.random() * 0.08));
  const failed = sent - delivered;
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    sent,
    delivered,
    failed,
  };
});

// ─── Chart Data: Message type breakdown ───
export const messageTypeBreakdown = [
  { name: "Promotional", value: 485000, fill: "hsl(215, 70%, 45%)" },
  { name: "Transactional", value: 392000, fill: "hsl(142, 72%, 29%)" },
  { name: "Premium", value: 218000, fill: "hsl(38, 92%, 50%)" },
  { name: "Shortcode", value: 152893, fill: "hsl(280, 60%, 50%)" },
];

// ─── Campaigns ───
export type Campaign = {
  id: string;
  name: string;
  type: "Promotional" | "Transactional" | "Premium" | "Shortcode";
  senderId: string;
  recipients: number;
  sent: number;
  delivered: number;
  failed: number;
  status: "Completed" | "Running" | "Scheduled" | "Draft" | "Paused";
  createdDate: string;
};

export const campaigns: Campaign[] = [
  { id: "1", name: "Black Friday Sale 2026", type: "Promotional", senderId: "SHOPNOW", recipients: 125000, sent: 125000, delivered: 118750, failed: 6250, status: "Completed", createdDate: "2026-02-15" },
  { id: "2", name: "OTP Verification", type: "Transactional", senderId: "VERIFY", recipients: 85000, sent: 85000, delivered: 84150, failed: 850, status: "Running", createdDate: "2026-02-20" },
  { id: "3", name: "Valentine's Promo", type: "Promotional", senderId: "DEALS", recipients: 95000, sent: 95000, delivered: 89300, failed: 5700, status: "Completed", createdDate: "2026-02-01" },
  { id: "4", name: "Account Alerts", type: "Transactional", senderId: "ALERTS", recipients: 45000, sent: 45000, delivered: 44550, failed: 450, status: "Running", createdDate: "2026-02-18" },
  { id: "5", name: "Spring Collection Launch", type: "Promotional", senderId: "FASHION", recipients: 200000, sent: 0, delivered: 0, failed: 0, status: "Scheduled", createdDate: "2026-02-25" },
  { id: "6", name: "Premium Weather Updates", type: "Premium", senderId: "40123", recipients: 32000, sent: 32000, delivered: 31040, failed: 960, status: "Running", createdDate: "2026-01-10" },
  { id: "7", name: "Survey Campaign", type: "Shortcode", senderId: "20500", recipients: 15000, sent: 15000, delivered: 14250, failed: 750, status: "Completed", createdDate: "2026-02-05" },
  { id: "8", name: "Loyalty Points Update", type: "Transactional", senderId: "LOYALTY", recipients: 78000, sent: 78000, delivered: 77220, failed: 780, status: "Completed", createdDate: "2026-02-12" },
  { id: "9", name: "Flash Sale Alert", type: "Promotional", senderId: "SALE24", recipients: 110000, sent: 0, delivered: 0, failed: 0, status: "Draft", createdDate: "2026-02-24" },
  { id: "10", name: "Delivery Notifications", type: "Transactional", senderId: "DELIVER", recipients: 62000, sent: 62000, delivered: 61380, failed: 620, status: "Running", createdDate: "2026-02-19" },
  { id: "11", name: "Premium Sports Scores", type: "Premium", senderId: "40555", recipients: 28000, sent: 28000, delivered: 27160, failed: 840, status: "Running", createdDate: "2026-01-15" },
  { id: "12", name: "Feedback Collection", type: "Shortcode", senderId: "20600", recipients: 8500, sent: 8500, delivered: 8075, failed: 425, status: "Completed", createdDate: "2026-02-08" },
  { id: "13", name: "New Year Offers", type: "Promotional", senderId: "NEWYEAR", recipients: 180000, sent: 180000, delivered: 169200, failed: 10800, status: "Completed", createdDate: "2026-01-01" },
  { id: "14", name: "Two-Factor Auth", type: "Transactional", senderId: "SECURE", recipients: 120000, sent: 120000, delivered: 119400, failed: 600, status: "Running", createdDate: "2026-02-01" },
  { id: "15", name: "Weekend Deals", type: "Promotional", senderId: "DEALS", recipients: 75000, sent: 0, delivered: 0, failed: 0, status: "Paused", createdDate: "2026-02-22" },
  { id: "16", name: "App Download Promo", type: "Promotional", senderId: "APPNOW", recipients: 50000, sent: 50000, delivered: 47500, failed: 2500, status: "Completed", createdDate: "2026-02-10" },
];

// ─── Contact Groups ───
export type ContactGroup = {
  id: string;
  name: string;
  contactCount: number;
  lastUsed: string;
  description: string;
};

export const contactGroups: ContactGroup[] = [
  { id: "1", name: "All Subscribers", contactCount: 245890, lastUsed: "2026-02-25", description: "Master list of all opted-in subscribers" },
  { id: "2", name: "Premium Customers", contactCount: 32450, lastUsed: "2026-02-24", description: "High-value customers with premium plans" },
  { id: "3", name: "New Sign-ups (Feb)", contactCount: 8920, lastUsed: "2026-02-23", description: "Users who signed up in February 2026" },
  { id: "4", name: "Inactive Users", contactCount: 15670, lastUsed: "2026-02-10", description: "Users with no activity in 30+ days" },
  { id: "5", name: "VIP Clients", contactCount: 1250, lastUsed: "2026-02-25", description: "Top-tier enterprise clients" },
  { id: "6", name: "Opted-out", contactCount: 4320, lastUsed: "2026-02-20", description: "Users who opted out of marketing" },
  { id: "7", name: "East Africa Region", contactCount: 89000, lastUsed: "2026-02-22", description: "Contacts in Kenya, Uganda, Tanzania" },
  { id: "8", name: "West Africa Region", contactCount: 67500, lastUsed: "2026-02-21", description: "Contacts in Nigeria, Ghana, Senegal" },
];

// ─── Contacts ───
export type Contact = {
  id: string;
  name: string;
  phone: string;
  tags: string[];
  status: "Active" | "Opted-out";
  dateAdded: string;
  groupId: string;
};

const firstNames = ["James", "Mary", "John", "Sarah", "David", "Grace", "Peter", "Faith", "Joseph", "Rose", "Michael", "Agnes", "Robert", "Jane", "Charles", "Elizabeth", "George", "Ann", "Daniel", "Catherine"];
const lastNames = ["Kimani", "Ochieng", "Mwangi", "Wanjiku", "Otieno", "Njeri", "Kamau", "Akinyi", "Mutua", "Wairimu", "Omondi", "Nyambura", "Kipchoge", "Adhiambo", "Maina", "Chebet", "Ndirangu", "Awuor", "Gitonga", "Moraa"];

export const contacts: Contact[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  name: `${firstNames[i % 20]} ${lastNames[i % 20]}`,
  phone: `+254${700000000 + Math.floor(Math.random() * 99999999)}`,
  tags: [["marketing", "active"], ["vip", "premium"], ["new"], ["inactive"], ["enterprise"]][i % 5],
  status: i % 7 === 0 ? "Opted-out" as const : "Active" as const,
  dateAdded: `2026-0${1 + (i % 2)}-${String(1 + (i % 28)).padStart(2, "0")}`,
  groupId: String(1 + (i % 8)),
}));

// ─── Sender IDs ───
export type SenderId = {
  id: string;
  name: string;
  type: "Promotional" | "Transactional";
  status: "Approved" | "Pending" | "Rejected";
  registeredDate: string;
  expiry: string;
};

export const senderIds: SenderId[] = [
  { id: "1", name: "SHOPNOW", type: "Promotional", status: "Approved", registeredDate: "2025-06-15", expiry: "2026-06-15" },
  { id: "2", name: "VERIFY", type: "Transactional", status: "Approved", registeredDate: "2025-08-01", expiry: "2026-08-01" },
  { id: "3", name: "DEALS", type: "Promotional", status: "Approved", registeredDate: "2025-09-10", expiry: "2026-09-10" },
  { id: "4", name: "ALERTS", type: "Transactional", status: "Approved", registeredDate: "2025-07-20", expiry: "2026-07-20" },
  { id: "5", name: "FASHION", type: "Promotional", status: "Pending", registeredDate: "2026-02-20", expiry: "-" },
  { id: "6", name: "SECURE", type: "Transactional", status: "Approved", registeredDate: "2025-05-01", expiry: "2026-05-01" },
  { id: "7", name: "LOYALTY", type: "Transactional", status: "Approved", registeredDate: "2025-11-15", expiry: "2026-11-15" },
  { id: "8", name: "SALE24", type: "Promotional", status: "Pending", registeredDate: "2026-02-22", expiry: "-" },
  { id: "9", name: "DELIVER", type: "Transactional", status: "Approved", registeredDate: "2025-10-05", expiry: "2026-10-05" },
  { id: "10", name: "NEWYEAR", type: "Promotional", status: "Rejected", registeredDate: "2025-12-20", expiry: "-" },
  { id: "11", name: "APPNOW", type: "Promotional", status: "Approved", registeredDate: "2025-04-10", expiry: "2026-04-10" },
  { id: "12", name: "BANKNG", type: "Transactional", status: "Approved", registeredDate: "2025-03-01", expiry: "2026-03-01" },
];

// ─── Shortcodes ───
export type Shortcode = {
  id: string;
  code: string;
  keyword: string;
  service: string;
  status: "Active" | "Inactive" | "Pending";
  monthlyVolume: number;
  revenue: string;
};

export const shortcodes: Shortcode[] = [
  { id: "1", code: "20500", keyword: "VOTE", service: "Voting & Polling Service", status: "Active", monthlyVolume: 45000, revenue: "$13,500" },
  { id: "2", code: "20600", keyword: "INFO", service: "Information Services", status: "Active", monthlyVolume: 32000, revenue: "$9,600" },
  { id: "3", code: "40123", keyword: "WEATHER", service: "Weather Updates", status: "Active", monthlyVolume: 28000, revenue: "$14,000" },
  { id: "4", code: "40555", keyword: "SCORE", service: "Sports Score Alerts", status: "Active", monthlyVolume: 52000, revenue: "$26,000" },
  { id: "5", code: "20700", keyword: "QUIZ", service: "Interactive Quiz Service", status: "Inactive", monthlyVolume: 0, revenue: "$0" },
  { id: "6", code: "40800", keyword: "NEWS", service: "Breaking News Alerts", status: "Pending", monthlyVolume: 0, revenue: "$0" },
];

// ─── Premium SMS ───
export type PremiumService = {
  id: string;
  serviceName: string;
  shortcode: string;
  keyword: string;
  tariff: string;
  subscriptions: number;
  revenue: string;
  status: "Active" | "Suspended" | "Pending";
};

export const premiumServices: PremiumService[] = [
  { id: "1", serviceName: "Daily Weather Forecast", shortcode: "40123", keyword: "WEATHER", tariff: "$0.50", subscriptions: 18500, revenue: "$9,250", status: "Active" },
  { id: "2", serviceName: "Live Sports Scores", shortcode: "40555", keyword: "SCORE", tariff: "$0.50", subscriptions: 42000, revenue: "$21,000", status: "Active" },
  { id: "3", serviceName: "Daily Horoscope", shortcode: "40123", keyword: "STARS", tariff: "$0.30", subscriptions: 12000, revenue: "$3,600", status: "Active" },
  { id: "4", serviceName: "Stock Market Alerts", shortcode: "40555", keyword: "STOCKS", tariff: "$1.00", subscriptions: 8500, revenue: "$8,500", status: "Suspended" },
  { id: "5", serviceName: "Health Tips Daily", shortcode: "40800", keyword: "HEALTH", tariff: "$0.25", subscriptions: 25000, revenue: "$6,250", status: "Pending" },
];

// ─── Reports: Daily delivery data ───
export const dailyDeliveryData = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(2026, 1, 12 + i);
  const delivered = Math.floor(35000 + Math.random() * 15000);
  const failed = Math.floor(1000 + Math.random() * 3000);
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    delivered,
    failed,
  };
});

// ─── Reports: Revenue over time ───
export const revenueOverTime = [
  { month: "Sep", revenue: 32000 },
  { month: "Oct", revenue: 38000 },
  { month: "Nov", revenue: 41000 },
  { month: "Dec", revenue: 52000 },
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 48250 },
];

// ─── Admin: Tenants ───
export type Tenant = {
  id: string;
  company: string;
  contactPerson: string;
  plan: "Starter" | "Business" | "Enterprise";
  smsBalance: number;
  status: "Active" | "Suspended" | "Trial";
};

export const tenants: Tenant[] = [
  { id: "1", company: "Safaricom PLC", contactPerson: "John Ngumi", plan: "Enterprise", smsBalance: 5000000, status: "Active" },
  { id: "2", company: "KCB Group", contactPerson: "Mary Wangari", plan: "Enterprise", smsBalance: 2500000, status: "Active" },
  { id: "3", company: "Jumia Kenya", contactPerson: "Ahmed Hassan", plan: "Business", smsBalance: 850000, status: "Active" },
  { id: "4", company: "Twiga Foods", contactPerson: "Grace Muthoni", plan: "Business", smsBalance: 320000, status: "Active" },
  { id: "5", company: "M-Kopa Solar", contactPerson: "Peter Oloo", plan: "Starter", smsBalance: 75000, status: "Trial" },
  { id: "6", company: "Sendy Logistics", contactPerson: "Faith Cherop", plan: "Business", smsBalance: 0, status: "Suspended" },
  { id: "7", company: "Cellulant Corp", contactPerson: "David Otieno", plan: "Enterprise", smsBalance: 8200000, status: "Active" },
  { id: "8", company: "iPay Africa", contactPerson: "Rose Adhiambo", plan: "Starter", smsBalance: 150000, status: "Active" },
];

// ─── Admin: System Health ───
export const systemHealth = {
  apiUptime: "99.97%",
  queueDepth: 1247,
  throughput: "3,842 msgs/sec",
  avgLatency: "145ms",
};

// ─── Admin: Users ───
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "User";
  status: "Active" | "Inactive";
  lastLogin: string;
};

export const adminUsers: AdminUser[] = [
  { id: "1", name: "Alex Mutiso", email: "alex@bulksms.co.ke", role: "Super Admin", status: "Active", lastLogin: "2026-02-26 09:15" },
  { id: "2", name: "Sarah Kimani", email: "sarah@bulksms.co.ke", role: "Admin", status: "Active", lastLogin: "2026-02-26 08:30" },
  { id: "3", name: "James Ochieng", email: "james@bulksms.co.ke", role: "Admin", status: "Active", lastLogin: "2026-02-25 17:45" },
  { id: "4", name: "Grace Njeri", email: "grace@bulksms.co.ke", role: "User", status: "Active", lastLogin: "2026-02-25 14:20" },
  { id: "5", name: "Peter Maina", email: "peter@bulksms.co.ke", role: "User", status: "Inactive", lastLogin: "2026-01-15 10:00" },
  { id: "6", name: "Faith Wambui", email: "faith@bulksms.co.ke", role: "User", status: "Active", lastLogin: "2026-02-24 16:30" },
];

// ─── Admin: Audit Log ───
export type AuditEntry = {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
};

export const auditLog: AuditEntry[] = [
  { id: "1", action: "Campaign Created", user: "Sarah Kimani", timestamp: "2026-02-26 09:12", details: "Created 'Spring Collection Launch' campaign" },
  { id: "2", action: "Sender ID Requested", user: "Alex Mutiso", timestamp: "2026-02-26 08:45", details: "Requested new sender ID 'FASHION'" },
  { id: "3", action: "User Suspended", user: "Alex Mutiso", timestamp: "2026-02-25 17:30", details: "Suspended tenant 'Sendy Logistics' for non-payment" },
  { id: "4", action: "Contacts Imported", user: "Grace Njeri", timestamp: "2026-02-25 14:15", details: "Imported 2,500 contacts to 'East Africa Region'" },
  { id: "5", action: "Campaign Completed", user: "System", timestamp: "2026-02-25 12:00", details: "'Valentine's Promo' campaign completed. 89,300 delivered." },
  { id: "6", action: "API Key Generated", user: "James Ochieng", timestamp: "2026-02-25 10:20", details: "Generated new API key for production environment" },
  { id: "7", action: "Shortcode Registered", user: "Sarah Kimani", timestamp: "2026-02-24 16:00", details: "Registered shortcode 40800 for 'Breaking News Alerts'" },
  { id: "8", action: "Billing Updated", user: "Alex Mutiso", timestamp: "2026-02-24 11:30", details: "Updated billing plan for KCB Group to Enterprise" },
];
