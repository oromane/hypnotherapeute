const ADMIN_PASSWORD_HASH = "admin_secured_access_2024"

export function hashPassword(password: string): string {
  // In production, use bcrypt or similar
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

export function verifyPassword(password: string): boolean {
  const attempt = hashPassword(password)
  const correct = hashPassword("Lefi2^10£0qk#F5jvTc")
  return attempt === correct
}

export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
