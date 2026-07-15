phases.md
HireTrack — Development Phases
Project Overview
HireTrack is a modern Applicant Tracking System (ATS) built as a polished MVP within a 7-day development cycle.
The project is intentionally divided into phases to ensure predictable progress, reduce technical debt, simplify debugging, and maintain a stable codebase. Each phase builds upon the previous one and should be fully completed before moving forward.
The objective is not to build every possible ATS feature.
The objective is to build a production-quality MVP with excellent code quality, user experience, documentation, and maintainability.
________________________________________
Development Rules
Before starting any phase:
•	Verify the previous phase is complete.
•	Never skip phases.
•	Never build future features early.
•	Finish one module before starting another.
•	Keep commits small and meaningful.
•	Test every feature immediately after implementation.
•	Refactor continuously.
•	Keep documentation synchronized with the project.
________________________________________
Phase 0 — Planning
Objective
Create the engineering blueprint before writing application code.
Deliverables
•	Product Requirements Document (PRD)
•	architecture.md
•	rules.md
•	phases.md
•	Prisma schema design
•	Entity Relationship Diagram (ERD)
•	Folder structure
•	Environment variable documentation
•	Git repository initialization
•	Initial README
•	Development roadmap
Tasks
•	Finalize project scope
•	Remove unnecessary features
•	Define MVP boundaries
•	Design database entities
•	Plan application architecture
•	Define routing
•	Select libraries
•	Define coding standards
•	Configure Git repository
Exit Criteria
•	Product scope approved
•	Architecture finalized
•	Database design completed
•	Folder structure approved
•	No implementation questions remain
Checklist
•	PRD completed
•	Architecture completed
•	Rules completed
•	Development phases completed
•	Prisma schema designed
•	ER diagram completed
•	Folder structure finalized
•	Git repository initialized
________________________________________
Phase 1 — Project Setup
Objective
Prepare a stable development environment.
Tasks
Project Initialization
•	Create Next.js project
•	Configure TypeScript
•	Configure ESLint
•	Configure Prettier
•	Configure Tailwind CSS
Dependencies
Install:
•	Prisma
•	PostgreSQL Driver
•	Auth.js
•	React Hook Form
•	Zod
•	TanStack Query
•	shadcn/ui
•	Recharts
Database
•	Configure Prisma
•	Connect Neon database
•	Test connection
•	Generate initial migration
Authentication Setup
•	Configure Auth.js
•	Configure environment variables
UI Foundation
•	Install shadcn/ui
•	Create global layout
•	Configure fonts
•	Configure theme
•	Create sidebar
•	Create navbar
Routing
Create placeholder pages for:
•	Dashboard
•	Jobs
•	Candidates
•	Settings
•	Login
Deliverables
•	Working project
•	Database connection
•	Base layout
•	Navigation
•	Theme
•	Environment configuration
Exit Criteria
•	Application runs successfully
•	Database connected
•	No TypeScript errors
•	No lint errors
•	Layout responsive
Manual Testing
•	App loads
•	Navigation works
•	Theme works
•	Database connects
•	No console errors
________________________________________
Phase 2 — Authentication
Objective
Secure the application.
Tasks
Authentication
•	Signup
•	Login
•	Logout
Sessions
•	Session creation
•	Session persistence
•	Session expiration
Authorization
•	Route protection
•	Middleware
•	Role-based access
Profile
•	User profile
•	Update profile
•	Change password (optional)
Deliverables
•	Working authentication
•	Protected routes
•	Session management
Exit Criteria
•	Users can authenticate
•	Protected routes cannot be accessed anonymously
•	Sessions persist correctly
Testing Checklist
•	Signup
•	Login
•	Logout
•	Invalid credentials
•	Protected routes
•	Session persistence
•	Role validation
Edge Cases
•	Invalid password
•	Expired session
•	Unauthorized access
•	Missing cookies
•	Duplicate email
________________________________________
Phase 3 — Jobs Module
Objective
Implement complete job management.
Tasks
Database
•	Job model
•	Relationships
•	Validation
API
•	Create Job
•	Update Job
•	Delete Job
•	List Jobs
•	View Job
UI
•	Jobs table
•	Create dialog
•	Edit dialog
•	Delete confirmation
•	Job details page
Features
•	CRUD
•	Search
•	Filters
•	Pagination
•	Sorting
Deliverables
•	Complete Jobs module
Exit Criteria
•	CRUD fully operational
•	Validation working
•	Search functional
•	Pagination working
Testing Checklist
•	Create job
•	Update job
•	Delete job
•	Search
•	Filters
•	Pagination
•	Validation errors
________________________________________
Phase 4 — Candidates Module
Objective
Manage applicants throughout the hiring process.
Tasks
Database
•	Candidate model
•	Relationships
API
•	Candidate CRUD
UI
•	Candidate table
•	Candidate profile
•	Candidate form
Features
•	Resume URL
•	Candidate status
•	Job assignment
•	Search
•	Filters
•	Pagination
Deliverables
•	Complete Candidates module
Exit Criteria
•	Candidate management complete
•	Search functional
•	Relationships working
Testing Checklist
•	Create candidate
•	Edit candidate
•	Delete candidate
•	Assign job
•	Status update
•	Search
•	Filters
________________________________________
Phase 5 — Dashboard
Objective
Provide recruiters with actionable insights.
Tasks
Statistics
•	Total jobs
•	Active jobs
•	Candidates
•	Interviews
•	Hires
Charts
•	Hiring funnel
•	Applications over time
•	Candidate status distribution
Widgets
•	Recent jobs
•	Recent candidates
•	Activity feed
•	Quick actions
Deliverables
•	Functional dashboard
Exit Criteria
•	Dashboard populated
•	Charts working
•	Statistics accurate
Testing Checklist
•	Statistics
•	Charts
•	Activity feed
•	Quick actions
________________________________________
Phase 6 — Polish
Objective
Transform the MVP into a production-ready application.
Tasks
User Experience
•	Responsive design
•	Dark mode
•	Loading skeletons
•	Empty states
•	Error pages
•	Success feedback
•	Toast notifications
Accessibility
•	Keyboard navigation
•	Focus management
•	Labels
•	ARIA attributes
•	Color contrast
Performance
•	Image optimization
•	Pagination optimization
•	Lazy loading
•	Memoization where appropriate
Quality
•	Code cleanup
•	Remove dead code
•	Improve naming
•	Documentation updates
Deliverables
•	Production-quality UI
Exit Criteria
•	Responsive
•	Accessible
•	No obvious UX issues
•	Good performance
Testing Checklist
•	Mobile
•	Tablet
•	Desktop
•	Dark mode
•	Loading states
•	Error states
•	Accessibility
________________________________________
Phase 7 — Deployment
Objective
Prepare and release the production application.
Tasks
Infrastructure
•	Production environment variables
•	Database migration
•	Production build
Deployment
•	Deploy to Vercel
•	Connect Neon database
•	Verify production
Documentation
•	README
•	Architecture
•	Screenshots
•	Demo account
•	Demo video
Deliverables
•	Live production application
•	Complete documentation
Exit Criteria
•	Production deployment successful
•	All documentation complete
•	Application fully functional
Deployment Checklist
•	Build succeeds
•	Environment variables configured
•	Database migrations applied
•	Authentication works
•	Production tested
•	README completed
•	Screenshots added
•	Demo video recorded
________________________________________
Definition of Done
A phase is complete only when all of the following are true:
•	Feature requirements implemented
•	Code compiles successfully
•	TypeScript reports zero errors
•	ESLint passes
•	No console errors
•	Manual testing completed
•	Edge cases tested
•	Documentation updated
•	Git commit created
•	Ready for code review
________________________________________
AI Workflow
Every feature should follow the same engineering workflow.
1.	Understand the requirements.
2.	Review the relevant architecture.
3.	Design the schema (if required).
4.	Generate TypeScript types.
5.	Generate validation using Zod.
6.	Implement backend logic.
7.	Implement frontend UI.
8.	Explain every generated file.
9.	Perform manual testing.
10.	Refactor for readability.
11.	Commit changes.
Never generate multiple phases simultaneously.
Do not begin the next phase until the current phase has been reviewed and approved.
________________________________________
Progress Tracker
Overall Progress
•	Phase 0 — Planning
•	Phase 1 — Project Setup
•	Phase 2 — Authentication
•	Phase 3 — Jobs Module
•	Phase 4 — Candidates Module
•	Phase 5 — Dashboard
•	Phase 6 — Polish
•	Phase 7 — Deployment
________________________________________
Daily Development Plan
Day 1
•	Complete Phase 0
•	Complete Phase 1
Day 2
•	Complete Phase 2
Day 3
•	Complete Phase 3
Day 4
•	Complete Phase 4
Day 5
•	Complete Phase 5
Day 6
•	Complete Phase 6
Day 7
•	Complete Phase 7
________________________________________
Milestone Review
Before starting a new phase, ask the following questions:
•	Is the previous phase complete?
•	Has the code been reviewed?
•	Does the application compile?
•	Does lint pass?
•	Have all manual tests passed?
•	Is the documentation updated?
•	Is the project still within MVP scope?
If the answer to any question is No, resolve it before moving forward.

