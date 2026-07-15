# rules.md
# HireTrack Engineering Rules
These rules must be followed for EVERY response and EVERY code generation.
---
# General
- This project is built by a developer who is learning TypeScript.
- Prefer readability over cleverness.
- Never optimize prematurely.
- Always choose the simplest implementation that is correct.
- Never generate code that requires advanced TypeScript knowledge.
---
# Tech Stack
Use ONLY:
- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL (Neon)
- Auth.js (NextAuth)
- React Hook Form
- Zod
- TanStack Query
- Recharts
Do not introduce additional libraries unless explicitly requested.
---
# TypeScript Rules
Avoid advanced TypeScript.
DO NOT use:
- decorators
- namespaces
- declaration merging
- overloads
- conditional types
- mapped types
- infer
- complex generics
- recursive types
- utility types unless necessary
Prefer:
- interfaces
- type aliases
- explicit return types
- explicit parameter types
Never use:
any
except when explicitly approved.
Prefer:
unknown
if necessary.
Always explain every unfamiliar TypeScript syntax after generating code.
---
# Code Style
Prefer:
Simple functions
Small components
Readable variable names
No clever one-liners
No unnecessary abstraction
Maximum:
250 lines per file
Maximum:
1 responsibility per component
---
# Component Rules
One component = one responsibility.
Separate:
UI
Business Logic
Database Logic
Validation
Never mix them.
---
# Folder Rules
Respect the architecture.
Never invent new folders.
Never duplicate functionality.
Use:
app/
components/
lib/
actions/
hooks/
types/
validators/
services/
repositories/
prisma/
---
# Database Rules
Always use Prisma.
Never write raw SQL unless requested.
Every table must include:
id
createdAt
updatedAt
Relationships must be explicit.
Explain every Prisma relation.
---
# API Rules
Every endpoint must:
Validate with Zod
Handle errors
Return typed responses
Never trust client input.
Never duplicate validation.
---
# Error Handling
Always handle:
Loading
Empty
Success
Validation Error
Authentication Error
Authorization Error
404
500
Never ignore errors.
---
# Authentication
Always use Auth.js.
Never build custom authentication.
Never expose sensitive data.
Protect all authenticated routes.
Explain authentication flow whenever new auth code is generated.
---
# UI Rules
Use shadcn/ui components.
Maintain consistent spacing.
Responsive by default.
Mobile-first.
Every page must include:
Loading state
Empty state
Error state
Success state
---
# Accessibility
Every form requires:
Labels
Keyboard navigation
ARIA where appropriate
Focus states
Accessible buttons
---
# React Rules
Prefer:
Server Components
Only use Client Components when necessary.
Avoid unnecessary useEffect.
Prefer Server Actions when appropriate.
Keep state local.
Avoid prop drilling.
---
# Forms
Always use:
React Hook Form
+
Zod
Never manually validate forms.
---
# State Management
Server state:
TanStack Query
Local state:
useState
Never use Redux.
Never introduce Zustand unless requested.
---
# Naming
Use consistent names.
Good:
CandidateCard
JobTable
CreateJobDialog
CandidateService
Bad:
Helper
Utils2
Temp
Component1
---
# Comments
Comment WHY.
Do not comment WHAT.
Avoid obvious comments.
---
# AI Generation Rule
Never generate an entire application at once.
Generate one feature at a time.
Feature order:
1. Schema
2. Types
3. API
4. Validation
5. UI
6. Testing
Wait for approval before generating the next feature.
# Explanation
Whenever code is generated:
Explain:
What was created
Why it exists
How it works
How it connects with existing code
Explain any TypeScript syntax that may be unfamiliar.
Assume the developer is learning.
---
# Testing
Every feature should include:
Expected behavior
Manual testing steps
Possible edge cases
Do not generate automated tests unless requested.
---
# Refactorin
If there is a simpler implementation,
prefer it.
If code becomes difficult to understand,
rewrite it.
Readability always wins.
# Documentation
Whenever a new module is created,
update documentation if necessary.
Keep architecture synchronized with implementation.
---
# Golden Rule
Generate code that a junior full-stack developer can confidently understand, debug, modify, and explain in an interview
Never sacrifice clarity for cleverness.
