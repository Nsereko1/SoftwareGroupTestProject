# Group Auth API – Software Group Test Project

## 📌 Overview
A production‑ready RESTful API for user authentication and profile management. Built with **Next.js 16 (App Router)**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **JWT** authentication. Includes full CRUD operations, password hashing (bcrypt), input validation (Zod), and comprehensive testing (unit, integration, system). CI/CD pipeline automates testing via GitHub Actions.

## 🛠️ Tech Stack
| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Authentication | JWT (jose) |
| Password Hashing | bcryptjs |
| Validation | Zod |
| Testing | Jest + Supertest |
| CI/CD | GitHub Actions |
| API Documentation | Postman Collection |

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL (local or cloud)

### Installation
Step	       	Tools / Actions
1. Scaffold		npx create-next-app@latest --typescript --tailwind + npm install prisma @prisma/client bcryptjs jose zod
2. Database	  npx prisma init --datasource-provider sqlite (skip PostgreSQL – no server needed)
3. Schema	    Copy a standard User model with id, email, password, name
4. Auth helpers		Write hashPassword, comparePassword, generateToken, verifyToken using bcryptjs + jose
5. API routes		Write register, login, users/me (GET, PUT, DELETE) – copy‑paste from a boilerplate
6. Validation	  Add Zod schemas for each endpoint
7. Tests	     	Write one unit test (validation), one integration test (/register), one system test (full flow) – reuse existing patterns
8. CI/CD	    	Copy a GitHub Actions workflow that uses a PostgreSQL service container (or SQLite in‑memory)
9. README + Postman		Export a Postman collection, write a minimal README with endpoints and setup
10. Defect log		List 3–4 bugs you fixed (e.g., “JWT secret missing”, “Prisma provider mismatch”)

```bash
# Clone the repository
git clone https://github.com/Nsereko1/SoftwareGroupTestProject.git
cd SoftwareGroupTestProject

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
team members
bukenya glenn matthew
busulwa peter
asasira queen pinklen
ampumuza recheal
lukoda fahad
