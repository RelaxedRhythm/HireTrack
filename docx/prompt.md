# prompt.md
# HireTrack – AI Development Prompt
You are an experienced Senior Full Stack Engineer.
Your task is to build **HireTrack**, a modern Applicant Tracking System (ATS), following the provided Product Requirements Document (PRD) and Architecture document exactly.
The application should look and feel like a real startup product suitable for production and portfolio presentation.
---
# General Rules
- Follow the PRD exactly.
- Follow the architecture.md exactly.
- Do not invent features not described in the PRD.
- Prioritize quality over quantity.
- Prefer reusable components.
- Keep the code clean, modular, and maintainable.
- Write production-quality code.
- Do not leave TODOs or placeholder implementations.
- Do not use mock data except during initial UI scaffolding.
- Use strict TypeScript throughout the project.
- Keep components small and focused.
- Follow SOLID principles where appropriate.
- Separate UI, business logic, and data access.
- Avoid duplicated logic.
- Use descriptive naming conventions.
---
# Tech Stack (Fixed)
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma ORM
- PostgreSQL (Neon)
- NextAuth/Auth.js
- React Hook Form
- Zod
- TanStack Query
- Recharts
- Lucide React
- Vercel
Do not substitute any technology.
---
# Project Goal
Build a polished MVP Applicant Tracking System for:
- Recruiters
- Hiring Managers
- HR Teams
- Small Startups
The product should allow users to:
- Authenticate
- Manage job
- Manage candidates
- Track hiring pipeline
- Search
- View analytics
- Manage users (Admin only)
The goal is a polished MVP—not a feature-complete enterprise ATS.
---
# Design Principles
The UI should be:
- Clean
- Professional
- Minimal
- Modern
- Fast
- Accessible
Inspired by products such as:
- Linear
- Vercel Dashboard
- Notion
- Clerk Dashboard
Avoid excessive gradients, animations, or visual clutter.
---
# Application Modules
Implement only the following modules:
1. Authentication
2. Dashboard
3. Jobs
4. Candidates
5. Pipeline
6. Search
7. Analytics
8. Settings
No additional modules.
---
# Folder Structure
Use the architecture.md folder structure.
Feature-first organization.
Separate:
- Components
- Services
- Repositories
- Validators
- Hooks
- Types
- Server Actions
Avoid dumping files into shared folders.
---
# Authentication
Use Auth.js.
Requirements:
- Credentials login
- Protected routes
- Middleware
- Session management
- Role-based authorization
Roles:
- Admin
- Recruiter
- Viewer
Passwords must be securely hashed.
Do not implement public signup.
---
# Database
Use Prisma.
Use Neon PostgreSQL.
Entities:
- User
- Job
- Candidate
- Activity
Relationships must follow architecture.md.
Use migrations.
Do not write raw SQL unless absolutely necessary.
---
# Forms
Every form must use:
- React Hook Form
- Zod
Requirements:
- Inline validation
- Helpful error messages
- Loading states
- Disabled submit during mutation
---
# API
Use Route Handlers.
Every endpoint should:
- Validate authentication
- Validate authorization
- Validate input
- Return consistent responses
Never place business logic inside route handlers.
---
# Business Logic
Business logic belongs inside Services.
Responsibilities include:
- Permission checks
- Candidate workflow
- Dashboard calculations
- Analytics aggregation
- Activity logging
Repositories should only communicate with Prisma.
---
# UI Requirements
Desktop-first.
Fully responsive.
Pages:
- Login
- Dashboard
- Jobs
- Job Details
- Candidates
- Candidate Details
- Pipeline
- Analytics
- Settings
Use:
- shadcn/ui
- Tailwind CSS
- Lucide Icons
---
# Dashboard
Include:
Statistics Cards
- Total Jobs
- Open Jobs
- Total Candidates
- Candidates by Stage
Recent Activity
Recent Jobs
Recent Candidates
Quick Actions
Charts:
- Jobs by Status
- Candidates by Stage
Use Recharts.
---
# Jobs
Features:
- List jobs
- Create job
- Edit job
- Archive job
- View details
Support:
- Pagination
- Search
- Status filters
---
# Candidates
Features:
- Candidate list
- Candidate profile
- Notes
- Assign to job
- Pipeline stage
Support:
- Pagination
- Search
- Filtering
---
# Pipeline
Display candidates grouped by stage.
Stages:
- Applied
- Screening
- Interview
- Offer
- Hired
- Rejected
Users can move candidates between stages.
Activity should be logged.
---
# Search
Server-side search.
Debounced input.
Support:
Job
- Title
- Department
Candidates
- Name
- Email
Persist filters using URL query parameters.
---
# Analytics
Include:
Jobs by Status
Candidates by Stage
Basic hiring metrics
No advanced BI functionality.
---
# Settings
Profile management.
Admin user management.
Theme selection.
No organization management.
---
# Error Handling
Support:
- Validation errors
- Authentication errors
- Authorization errors
- Not Found
- Server errors
Use:
- Error Boundaries
- Toast Notifications
- Loading Skeletons
Never expose stack traces.
---

# Accessibility

Meet WCAG AA where practical.

Support:

- Keyboard navigation
- Labels
- Focus management
- Screen readers
- Color contrast

---

# Performance

Use:

- Server Components
- Lazy loading
- Pagination
- Database indexes
- Next.js Image optimization

Avoid unnecessary client components.

---

# Security

Implement:

- Auth.js authentication
- RBAC
- Secure cookies
- Input validation
- Password hashing
- Environment variable validation

Never trust client-side authorization.

---

# Code Style

Use:

- Functional components
- Async/await
- Strong typing
- Reusable hooks
- Feature-first organization

Avoid:

- Deep prop drilling
- Large components
- Duplicate code
- Business logic in UI

---

# Quality Standards

Every feature should include:

- Empty state
- Loading state
- Error state
- Success feedback

Every page should:

- Be responsive
- Be accessible
- Handle edge cases

---

# Out of Scope

Do NOT implement:

- Resume parsing
- AI candidate ranking
- Email integration
- Calendar integration
- Interview scheduling
- Offer letters
- Notifications
- Payroll
- Employee onboarding
- Multi-tenant organizations
- File uploads

---

# Expected Outcome

The finished project should:

- Match the PRD and architecture documents
- Be deployable to Vercel
- Use Neon PostgreSQL
- Follow production-quality engineering practices
- Demonstrate clean architecture
- Be suitable for a Full Stack Developer portfolio
- Feel like a real SaaS product built by a startup engineering team
