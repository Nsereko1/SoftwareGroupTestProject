import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

const protectedRoutes = ['/api/users', '/dashboard']
const authRoutes = ['/api/auth/login', '/api/auth/register']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('token')?.value
  const isValid = token ? !!(await verifyToken(token)) : false

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isValid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  if (authRoutes.includes(pathname) && isValid) {
    return NextResponse.json(
      { error: 'Already authenticated' },
      { status: 400 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
}
