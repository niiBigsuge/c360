# TheCrown360 - Current Project State

## Active Branch
`main`

## Current Status
**Phase:** Standard Feature Delivery
**Task:** Initial Project Setup & MVP Scaffold

## Subtasks for MVP Implementation
- [x] **Subtask 1: Project Initialization**
- [x] **Subtask 2: Database & Auth Setup (Backend)**
  - Connect to Servbay PostgreSQL.
  - Setup Custom Authentication (Auth.js) with bcryptjs and Credentials Provider.
  - Add admin securely via `prisma/seed.ts`
- [x] **Subtask 3: Landing Page & UI Framework**
- [x] **Subtask 4: Booking Engine**
  - Implement full booking multi-step form with guest and authenticated paths.
- [x] **Subtask 5: Admin Dashboard & Dynamic Data**
  - Admin UI for bookings and hairstyles.
  - Image Uploads for Hairstyles saving to `public/uploads`.
  - Admin login securely routes directly to Admin dashboard.

- [x] **Subtask 6: Route Security & Customer Experience**
  - Secured `/admin` routes using Auth.js layout-level checks.
  - Built Customer Dashboard (`/profile`) for authenticated users to view booking history.
  - Updated login/registration flows to route customers directly to their profile.

- [x] **Subtask 7: Smart Scheduling Engine**
  - Enforced 9 AM to 5 PM operating hours.
  - Limited concurrent bookings to a maximum of 3 per timeslot.
  - Added inline form validation.

- [x] **Subtask 8: Customer Booking Cancellations**
  - Allowed customers to cancel `PENDING` bookings within 15 minutes of creation via `/profile`.

- [x] **Subtask 9: Stylist Assignments & Toast Notifications**
  - Expanded Prisma schema to include `stylistId` relationships for the `STYLIST` role.
  - Added Assignment UI to the Admin Dashboard.
  - Replaced email logic with smooth in-app pop-up notifications (sonner) for bookings, cancellations, and assignments.
  - Added active Logout/Sign Out navigation to the Customer Profile.

- [x] **Subtask 10: Unified Login/Signup Modal UI**
  - Consolidated authentication into a single drop-down popover modal.
  - Form switches dynamically between Login and Registration states.
  - Removed outdated `/register` standalone page and standalone header links.
  - Suppressed unneeded Next.js `<img>` ESLint warnings.

## Memory & Blockers
- **Pending:** Awaiting next feature request for the landing page (Our Team, About Us, or Contact).
