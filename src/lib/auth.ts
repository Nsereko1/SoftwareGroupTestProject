import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-chars'
)

console.log('🔑 JWT_SECRET loaded:', process.env.JWT_SECRET ? 'Yes (length: ' + process.env.JWT_SECRET.length + ')' : '❌ NO SECRET FOUND!')

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed)
}

export async function generateToken(userId: string): Promise<string> {
  console.log('🔐 Generating token for userId:', userId)
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(JWT_SECRET)
  console.log('✅ Token generated, first 20 chars:', token.substring(0, 20))
  return token
}

export async function verifyToken(token: string) {
  try {
    console.log('🔍 Verifying token, first 20 chars:', token.substring(0, 20))
    const { payload } = await jwtVerify(token, JWT_SECRET)
    console.log('✅ Token verified! Payload:', payload)
    return payload as { userId: string; exp: number }
  } catch (error) {
    console.error('❌ Token verification failed:', error.message)
    return null
  }
}
