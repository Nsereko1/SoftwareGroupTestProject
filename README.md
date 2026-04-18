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
