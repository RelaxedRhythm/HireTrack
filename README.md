# HireTrack 🚀

A modern Applicant Tracking System (ATS) built for recruiters and hiring teams to streamline the recruitment process. HireTrack provides a centralized platform to manage job postings, candidates, applications, hiring pipelines, and recruitment analytics.

---

## ✨ Features

## 🔐 Authentication & Authorization

- Secure authentication using NextAuth/Auth.js
- Role-based access control
- Support for Recruiter and Admin roles
- Protected dashboard routes

---

## 💼 Job Management

- Create, update, delete, and manage job postings
- Job lifecycle management:
  - Draft
  - Open
  - Closed
- Search and filter jobs
- Pagination support
- Recruiter-specific job visibility

---

## 👥 Candidate Management

- Create and manage candidate profiles
- Store candidate information and application history
- Track candidate progress across multiple applications
- Prevent duplicate applications using database constraints

---

## 📄 Application Tracking

Manage the complete hiring workflow:

```
Applied
   ↓
Screening
   ↓
Interview
   ↓
Offer
   ↓
Hired
```

Features:

- Apply candidates to multiple jobs
- Update application status
- Track candidate movement through the hiring pipeline
- Maintain application history

---

## 📊 Recruitment Dashboard

A data-driven dashboard providing actionable hiring insights.

### Statistics

- Total Jobs
- Active Jobs
- Total Candidates
- Interviews
- Hires

### Analytics

- Hiring funnel visualization
- Application trends over time
- Candidate status distribution

### Dashboard Widgets

- Recent jobs
- Recent candidates
- Activity feed
- Quick actions

---

## 🔎 Search & Filtering

- Search jobs by title
- Filter jobs by:
  - Status
  - Location
  - Experience level
- Server-side filtering
- Pagination support

---

# 🛠️ Tech Stack

## Frontend

- Next.js 15 (App Router)
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Recharts

## Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth/Auth.js

## Database

- PostgreSQL
- Prisma Schema
- Prisma Migrations

## Deployment

- Vercel
- Neon PostgreSQL

---

# 🏗️ Project Architecture

```
HireTrack
│
├── app
│   ├── dashboard
│   ├── jobs
│   ├── candidates
│   ├── applications
│   └── api
│
├── components
│   ├── ui
│   ├── jobs
│   ├── candidates
│   └── dashboard
│
├── lib
│   ├── prisma.ts
│   ├── auth.ts
│   └── validations
│
├── prisma
│   └── schema.prisma
│
└── types
```

---

# 🗄️ Database Design

HireTrack follows a relational database architecture.

Main entities:

```
User
 |
 | creates
 |
Job
 |
 | receives
 |
Application
 |
 | belongs to
 |
Candidate


User
 |
 |
Activity
```

### User

Stores recruiter and admin account information.

### Job

Stores job postings created by recruiters.

### Candidate

Stores applicant profiles and personal information.

### Application

Acts as the bridge between candidates and jobs while tracking application status.

### Activity

Tracks important recruiter actions and system events.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

- Node.js >= 18
- PostgreSQL database
- npm/yarn/pnpm

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/hiretrack.git
```

Navigate to the project:

```bash
cd hiretrack
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="your_postgresql_database_url"

AUTH_SECRET="your_auth_secret"

AUTH_URL="http://localhost:3000"

NEXT_PUBLIC_API_URL="http://localhost:3000"
```

---

# Database Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

# Running the Application

Start development server:

```bash
npm run dev
```

Application will be available at:

```
http://localhost:3000
```

---

# Production Build

Create production build:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

# 📡 API Documentation

## Jobs API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Fetch jobs |
| POST | `/api/jobs` | Create a job |
| GET | `/api/jobs/[id]` | Fetch job details |
| PATCH | `/api/jobs/[id]` | Update job |
| DELETE | `/api/jobs/[id]` | Delete job |

---

## Applications API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications` | Fetch applications |
| POST | `/api/applications` | Create application |
| PATCH | `/api/applications/[id]` | Update application status |

---

## Dashboard API

| Endpoint | Description |
|----------|-------------|
| `/api/dashboard/stats` | Recruitment statistics |
| `/api/dashboard/funnel` | Hiring funnel data |
| `/api/dashboard/application-over-time` | Application trends |
| `/api/dashboard/candidate-status` | Candidate distribution |
| `/api/dashboard/recent-jobs` | Recent jobs |
| `/api/dashboard/recent-candidates` | Recent candidates |

---

# 🧪 Development Workflow

Create a feature branch:

```bash
git checkout -b feature-name
```

Commit changes:

```bash
git add .
git commit -m "Add feature"
```

Push changes:

```bash
git push origin feature-name
```

---

# 🔮 Future Improvements

- AI-powered resume parsing
- Automated candidate ranking
- Email notifications
- Interview scheduling
- Calendar integration
- Advanced analytics
- Team collaboration features

---

# 🤝 Contributing

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Rhythm Sharma**

B.Tech Computer Science Engineering

---

⭐ If you like this project, consider giving it a star!
