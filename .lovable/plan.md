

# Tenant ↔ Super Admin Portal Switching

## Current State
Right now, "Admin Portal" is just another sidebar nav item alongside Dashboard, Campaigns, etc. There is no concept of switching contexts — all items sit in one flat list. This doesn't reflect the real-world separation between a **tenant view** (day-to-day SMS operations) and a **super admin view** (platform-wide management).

## Proposed Change

### Role/Context Switcher in the Sidebar
Add a **context switcher** at the bottom of the sidebar (or top, below the logo) that toggles between two modes:

1. **Tenant Portal** — shows: Dashboard, Campaigns, Contacts & Groups, Sender IDs, Shortcodes, Premium SMS, Reports & Analytics, Settings
2. **Super Admin** — shows: Admin Dashboard (system health KPIs), Tenant Management, User Management, Audit Log, Platform Settings

### How It Works
- A React state (`portalMode: "tenant" | "admin"`) controls which nav items render in the sidebar
- The switcher UI is a dropdown or segmented control showing the current mode with a company/role icon
- Switching mode navigates to the default page of that portal (`/` for tenant, `/admin` for super admin)
- The sidebar header subtly changes to reflect the mode (e.g., accent color or label like "Tenant Portal" vs "Super Admin")
- The top bar can optionally show a breadcrumb or badge indicating the current portal context

### Implementation Details

**New/Modified Files:**
- `src/components/layout/AppSidebar.tsx` — Add portal mode state, context switcher component, and two separate nav item arrays
- `src/components/layout/TopBar.tsx` — Optionally show a portal mode badge
- `src/pages/AdminPortal.tsx` — Break into sub-pages or keep as-is with the tabs (Tenants / Users / Audit), but now accessed via dedicated admin-mode nav items

**Sidebar Nav Items by Mode:**

Tenant mode:
- Dashboard, Campaigns, Contacts & Groups, Sender IDs, Shortcodes, Premium SMS, Reports & Analytics, Settings

Admin mode:
- System Overview (the health cards + admin dashboard)
- Tenant Management
- User Management  
- Audit Log
- Platform Settings

**Context Switcher UI:**
- Positioned above the nav items, below the logo
- Shows current mode with an icon (Building for Tenant, Shield for Admin)
- Click opens a dropdown to switch
- Smooth transition with sidebar items fading/swapping

**State Management:**
- Simple `useState` in AppSidebar, lifted to AppLayout context if TopBar also needs it
- Persisted in localStorage so refreshing keeps the selected mode

### Pages
- The existing `/admin` page content (tenants table, users table, audit log) will be split across admin-mode nav items, or kept as a single page accessible only in admin mode
- No new routes strictly required — the same `/admin` route works, but the sidebar context changes what's visible and navigable

