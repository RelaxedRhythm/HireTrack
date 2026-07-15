Product Requirements Document (PRD)
HireTrack — Applicant Tracking System (MVP)
________________________________________
1. Product Vision
Problem Statement
Small startups and growing companies often manage hiring through spreadsheets, emails, and messaging apps. This creates fragmented communication, poor visibility into candidate progress, duplicated work, and difficulty collaborating across recruiters and hiring managers.
HireTrack provides a simple, collaborative Applicant Tracking System that helps hiring teams manage jobs, candidates, and hiring pipelines from one centralized application.
________________________________________
Target Audience
Primary users:
•	Recruiters
•	Hiring Managers
•	Small startups (5–200 employees)
•	HR teams without enterprise ATS solutions
________________________________________
Value Proposition
HireTrack enables hiring teams to:
•	Track every applicant in one place
•	Collaborate through a shared hiring pipeline
•	Search candidates instantly
•	Monitor hiring activity through dashboards
•	Reduce manual spreadsheet management
The emphasis is simplicity, speed, and usability rather than enterprise complexity.
________________________________________
Goals
•	Build a polished production-quality ATS MVP
•	Enable complete hiring workflow from job creation to candidate progression
•	Support multiple user roles
•	Deliver responsive experience across desktop and mobile
•	Demonstrate strong engineering practices suitable for portfolio presentation
________________________________________
Non-goals
The MVP will not include:
•	Resume parsing
•	AI candidate ranking
•	Email automation
•	Calendar integration
•	Video interviews
•	Offer management
•	Payroll
•	Employee onboarding
•	Multi-company tenancy
•	Custom workflow builder
________________________________________
2. User Personas
Recruiter
Motivations
•	Fill open positions quickly
•	Keep candidate information organized
•	Reduce repetitive administrative work
•	Easily track application status
Frustrations
•	Spreadsheet tracking
•	Losing candidate information
•	Poor visibility into hiring progress
•	Difficult collaboration
Daily Workflow
•	Log in
•	Review dashboard
•	Create job postings
•	Add candidates
•	Move candidates through stages
•	Search applicants
•	Review hiring metrics
________________________________________
Hiring Manager
Motivations
•	Monitor hiring progress
•	Review qualified candidates
•	Collaborate with recruiters
•	Make informed hiring decisions
Frustrations
•	Lack of visibility
•	Delayed updates
•	Scattered communication
•	Inconsistent candidate information
Daily Workflow
•	View dashboard
•	Review assigned jobs
•	Open candidate profiles
•	Track pipeline progress
•	Monitor hiring metrics
________________________________________
3. User Stories
Authentication
P0
As a recruiter,
I want to securely log in
So that I can access hiring data.
P0
As a recruiter,
I want to log out
So that my account remains secure.
P0
As an admin,
I want to invite users
So that new recruiters can access the system.
________________________________________
Dashboard
P0
As a recruiter,
I want to see hiring statistics
So that I understand current hiring progress.
P1
As a recruiter,
I want recent activity
So that I know what changed recently.
________________________________________
Jobs
P0
As a recruiter,
I want to create jobs
So that I can accept applications.
P0
As a recruiter,
I want to edit jobs
So that information stays accurate.
P0
As a recruiter,
I want to archive jobs
So that inactive positions remain available for historical reference.
________________________________________
Candidates
P0
As a recruiter,
I want to add candidates
So that I can track applicants.
P0
As a recruiter,
I want candidate profiles
So that all information is centralized.
P1
As a recruiter,
I want notes
So that interview feedback stays organized.
________________________________________
Pipeline
P0
As a recruiter,
I want to move candidates between stages
So that hiring progress is visible.
P1
As a hiring manager,
I want to view pipeline stages
So that I understand recruitment progress.
________________________________________
Search
P0
As a recruiter,
I want global search
So that I quickly find candidates or jobs.
________________________________________
Analytics
P1
As a recruiter,
I want hiring statistics
So that I can evaluate recruiting performance.
________________________________________
Settings
P1
As an admin,
I want to manage users
So that system access remains controlled.
________________________________________
4. MVP Scope
Must Have
•	Authentication
•	Role-based authorization
•	Dashboard
•	Job management
•	Candidate management
•	Hiring pipeline
•	Search
•	Responsive UI
•	Activity log
•	User management
________________________________________
Should Have
•	Analytics dashboard
•	Candidate notes
•	Archive jobs
•	Advanced filters
________________________________________
Could Have
•	Candidate tags
•	Export CSV
•	Dark mode preference
•	Saved filters
________________________________________
Won't Build
•	AI features
•	Resume parser
•	Email integration
•	Calendar sync
•	Offer letters
•	Interview scheduling
•	Notifications
•	Multiple organizations
________________________________________
5. Functional Requirements
________________________________________
Authentication
Purpose
Secure user access.
Required Screens
•	Login
•	Forgot password (placeholder or basic reset flow)
•	User invitation (Admin)
Core Actions
•	Login
•	Logout
•	Session validation
Validations
•	Required email
•	Valid email
•	Password required
Permissions
Authenticated users only.
Edge Cases
•	Invalid credentials
•	Expired session
•	Unauthorized access
________________________________________
Dashboard
Purpose
Provide hiring overview.
Required Screens
Dashboard
Core Actions
•	View KPIs
•	View activity
•	Open jobs
•	Navigate to candidates
Validations
None
Permissions
Authenticated users
Edge Cases
•	No jobs
•	No candidates
________________________________________
Jobs
Purpose
Manage job postings.
Required Screens
•	Job list
•	Create
•	Edit
•	Job details
Core Actions
•	Create
•	Update
•	Archive
•	Delete (Admin only)
Validations
•	Title required
•	Department required
•	Status required
Permissions
Recruiter/Admin
Edge Cases
•	Duplicate titles
•	Archived job editing
________________________________________
Candidates
Purpose
Track applicants.
Required Screens
•	Candidate list
•	Candidate details
•	Create candidate
Core Actions
•	Add candidate
•	Edit candidate
•	Add notes
•	Assign job
Validations
•	Name required
•	Email required
•	Unique email
Permissions
Recruiter/Admin
Edge Cases
•	Duplicate candidate
•	Invalid email
________________________________________
Pipeline
Purpose
Track candidate progress.
Required Screens
Pipeline board
Core Actions
•	Move stage
•	View candidate
Validations
Valid stage only.
Permissions
Recruiter/Admin
Edge Cases
•	Invalid stage transition
•	Archived jobs
________________________________________
Search
Purpose
Quick discovery.
Required Screens
Search bar
Core Actions
Search jobs and candidates.
Validations
Trim whitespace.
Permissions
Authenticated users.
Edge Cases
No results.
________________________________________
Filters
Purpose
Narrow results.
Core Actions
Filter by:
•	Status
•	Department
•	Stage
•	Recruiter
________________________________________
Analytics
Purpose
Display hiring insights.
Required Screens
Analytics page
Core Actions
View charts and KPIs.
Permissions
Recruiter/Admin
________________________________________
Settings
Purpose
Manage account.
Required Screens
•	Profile
•	User Management
Core Actions
•	Update profile
•	Change password
•	Manage users
________________________________________
6. Non Functional Requirements
Performance
•	Initial page load <2 seconds on broadband
•	API responses under 500 ms for common operations
•	Search results within 300 ms for typical datasets
•	Support at least 5,000 candidates without noticeable UI degradation
________________________________________
Accessibility
•	WCAG 2.1 AA compliant where practical
•	Full keyboard navigation
•	Proper labels and ARIA attributes
•	Sufficient color contrast
•	Visible focus indicators
________________________________________
Security
•	JWT authentication
•	Password hashing
•	Role-based authorization
•	Input validation
•	Output sanitization
•	HTTPS in production
•	Rate limiting on authentication endpoints
•	CSRF protection where applicable
________________________________________
Responsiveness
•	Desktop-first with mobile support
•	Functional from 320 px width upward
•	Responsive tables with horizontal scrolling or card layout on small screens
________________________________________
Error Handling
•	User-friendly error messages
•	Retry options for recoverable failures
•	Standardized API error responses
•	Error boundaries for unexpected UI failures
________________________________________
Loading States
•	Skeleton loaders for tables and dashboard widgets
•	Button loading indicators during form submission
•	Progressive loading for large datasets
________________________________________
Empty States
•	Meaningful illustrations or icons
•	Clear explanation
•	Primary call-to-action (e.g., "Create your first job")
________________________________________
SEO
•	Basic metadata
•	Meaningful page titles
•	Robots exclusion for authenticated pages
•	Not a primary concern since the application is authenticated
________________________________________
Maintainability
•	Modular architecture
•	Reusable UI components
•	Consistent API conventions
•	Centralized validation
•	Logging for critical actions
________________________________________
7. Acceptance Criteria
Login
Given a registered user
When valid credentials are submitted
Then the user is authenticated and redirected to the dashboard.
________________________________________
Create Job
Given a recruiter is authenticated
When a valid job form is submitted
Then the job appears in the jobs list and dashboard metrics update.
________________________________________
Add Candidate
Given a recruiter is viewing a job
When a valid candidate is created
Then the candidate is assigned to that job and appears in the first pipeline stage.
________________________________________
Move Candidate
Given a candidate exists in the pipeline
When the recruiter changes the stage
Then the updated stage is persisted and immediately reflected in the UI.
________________________________________
Search
Given jobs or candidates exist
When the user enters a search term
Then matching records are displayed within the current context.
________________________________________
Role Permissions
Given a viewer account
When attempting to edit a job
Then access is denied and no changes are saved.
________________________________________
8. Data Model
User
Fields
•	ID
•	First name
•	Last name
•	Email
•	Password hash
•	Role
•	Avatar URL
•	Created at
•	Updated at
Relationships
•	Creates many jobs
•	Creates many candidates
•	Records many activities
Constraints
•	Email unique
•	Role required
Indexes
•	Email
•	Role
Validation Rules
•	Valid email format
•	Password meets minimum length
________________________________________
Job
Fields
•	ID
•	Title
•	Department
•	Location
•	Employment type
•	Description
•	Status
•	Created by
•	Created at
•	Updated at
Relationships
•	Has many candidates
•	Belongs to one user
Constraints
•	Title required
•	Status required
Indexes
•	Status
•	Department
•	Created at
Validation Rules
•	Non-empty title
•	Valid employment type
________________________________________
Candidate
Fields
•	ID
•	Full name
•	Email
•	Phone
•	Resume URL
•	Current stage
•	Notes
•	Job ID
•	Created at
•	Updated at
Relationships
•	Belongs to one job
•	Has many activity records
Constraints
•	Email unique per workspace
•	Job required
Indexes
•	Email
•	Stage
•	Job ID
Validation Rules
•	Valid email
•	Required name
________________________________________
Activity
Fields
•	ID
•	User ID
•	Candidate ID
•	Job ID
•	Action
•	Timestamp
Relationships
•	Belongs to user
•	Belongs to candidate
•	Belongs to job
Constraints
•	Action required
Indexes
•	Timestamp
•	User ID
•	Candidate ID
Validation Rules
•	Action must be from predefined event types
________________________________________
9. API Requirements
Authentication
Method	Route	Description
POST	/auth/login	Authenticate user
POST	/auth/logout	End session
GET	/auth/me	Current user
________________________________________
Users
Method	Route
GET	/users
POST	/users
PATCH	/users/:id
DELETE	/users/:id
________________________________________
Jobs
Method	Route
GET	/jobs
GET	/jobs/:id
POST	/jobs
PATCH	/jobs/:id
DELETE	/jobs/:id
________________________________________
Candidates
Method	Route
GET	/candidates
GET	/candidates/:id
POST	/candidates
PATCH	/candidates/:id
DELETE	/candidates/:id
________________________________________
Pipeline
Method	Route
PATCH	/candidates/:id/stage
________________________________________
Dashboard
Method	Route
GET	/dashboard
________________________________________
Analytics
Method	Route
GET	/analytics
For every endpoint:
•	Authentication Required: Yes (except login)
•	Request Body: Depends on resource creation or update; validated server-side
•	Response: Standard JSON with resource data or status message
•	Error Cases: 400 (validation), 401 (unauthenticated), 403 (forbidden), 404 (not found), 409 (conflict), 500 (server error)
________________________________________
10. Permissions
Action	Admin	Recruiter	Viewer
Login	✅	✅	✅
View Dashboard	✅	✅	✅
Create Job	✅	✅	❌
Edit Job	✅	✅	❌
Delete Job	✅	❌	❌
View Candidates	✅	✅	✅
Add Candidate	✅	✅	❌
Edit Candidate	✅	✅	❌
Delete Candidate	✅	❌	❌
Move Pipeline	✅	✅	❌
View Analytics	✅	✅	✅
Manage Users	✅	❌	❌
Change Settings	✅	✅	Limited (own profile only)
________________________________________
11. UI Requirements
Navigation
•	Persistent left sidebar on desktop
•	Bottom navigation or collapsible drawer on mobile
•	Top bar with search, notifications placeholder, and user menu
________________________________________
Sidebar
•	Dashboard
•	Jobs
•	Candidates
•	Pipeline
•	Analytics
•	Settings
________________________________________
Dashboard Widgets
•	Total Jobs
•	Open Jobs
•	Total Candidates
•	Candidates by Stage
•	Recent Activity
________________________________________
Tables
•	Sticky headers
•	Sortable columns
•	Pagination
•	Row actions menu
•	Bulk selection deferred beyond MVP
________________________________________
Forms
•	Inline validation
•	Required field indicators
•	Autosave not included
•	Disable submit while processing
________________________________________
Cards
•	Job summary cards
•	Candidate profile cards
•	KPI summary cards
________________________________________
Search UX
•	Global search in header
•	Debounced input
•	Highlight matching text
•	Preserve filters during search
________________________________________
Mobile Behaviour
•	Responsive layouts
•	Drawer navigation
•	Card-based presentation for dense tables
•	Touch-friendly controls
________________________________________
Dark Mode
•	System preference detection
•	Manual theme toggle
•	Theme persisted per user
________________________________________
Loading Skeletons
•	Dashboard widgets
•	Tables
•	Candidate profile
•	Job detail page
________________________________________
Empty States
•	No jobs
•	No candidates
•	No search results
•	No analytics data
Each should include explanatory text and a relevant primary action.
________________________________________
Toast Notifications
•	Success (create, update, delete)
•	Warning (validation issues)
•	Error (API failures)
•	Informational (status changes)
________________________________________
12. Success Metrics
The MVP will be considered successful if:
•	A recruiter can complete the full hiring workflow without external tools.
•	100% of core P0 user stories are implemented and tested.
•	Page load time remains under 2 seconds for common views.
•	Search returns relevant results in under 300 ms for typical datasets.
•	No critical or high-severity defects remain before release.
•	Lighthouse accessibility score is at least 90.
•	Lighthouse performance score is at least 85 on desktop.
________________________________________
13. Risks
Technical Risks
•	Role-based authorization bugs
•	State synchronization between pipeline and candidate views
•	Performance degradation with large candidate lists
•	Inconsistent validation between client and server
________________________________________
Product Risks
•	Building too many secondary features instead of polishing the core workflow
•	Complex navigation reducing usability
•	Insufficient feedback during long-running actions
________________________________________
Scope Risks
•	Analytics becoming overly ambitious
•	Overengineering permissions
•	Spending excessive time on visual polish at the expense of functionality
•	Attempting integrations that are outside the MVP
________________________________________
14. Development Roadmap
Day 1 — Foundation
•	Project setup
•	Authentication
•	Role-based authorization
•	Layout and navigation
Testable Outcome: Users can log in and access role-appropriate screens.
________________________________________
Day 2 — Jobs
•	Job CRUD
•	Validation
•	Job listing
•	Job details
Testable Outcome: Recruiters can create, edit, archive, and view jobs.
________________________________________
Day 3 — Candidates
•	Candidate CRUD
•	Candidate profiles
•	Job assignment
•	Notes
Testable Outcome: Candidates can be created, edited, and linked to jobs.
________________________________________
Day 4 — Pipeline
•	Pipeline board
•	Stage transitions
•	Activity logging
Testable Outcome: Candidates move through hiring stages with updates reflected immediately.
________________________________________
Day 5 — Dashboard & Search
•	Dashboard KPIs
•	Recent activity
•	Global search
•	Filters
Testable Outcome: Users can monitor hiring progress and quickly locate jobs or candidates.
________________________________________
Day 6 — Analytics & UI Polish
•	Analytics page
•	Responsive refinements
•	Dark mode
•	Loading and empty states
•	Accessibility improvements
Testable Outcome: Application is polished across desktop and mobile with complete user feedback states.
________________________________________
Day 7 — Stabilization & Release
•	Bug fixing
•	End-to-end testing
•	Performance optimization
•	Documentation
•	Deployment preparation
Testable Outcome: Release candidate passes the Definition of Done checklist.
________________________________________
15. Definition of Done
Product
•	All P0 user stories implemented
•	MVP scope completed
•	No placeholder functionality in core workflows
Engineering
•	Code reviewed
•	No critical or high-severity bugs
•	Consistent coding standards applied
•	API contracts documented
•	Validation implemented on both client and server
•	Authorization enforced for all protected actions
User Experience
•	Responsive across supported screen sizes
•	Accessible via keyboard
•	Loading, empty, and error states implemented
•	Clear validation messages
•	Toast notifications for key actions
Quality Assurance
•	Core user flows manually tested
•	Acceptance criteria verified
•	No console errors in production build
•	Performance targets met
•	Cross-browser smoke testing completed
Deployment
•	Environment variables configured
•	Production build generated successfully
•	Database migrations applied
•	Seed data available for demos
•	Monitoring and error logging enabled
•	README updated with setup, architecture, and deployment instructions

