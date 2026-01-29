import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimitMap = new Map()

export function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
    const limit = 20
    const windowMs = 60 * 1000

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, { count: 0, lastReset: Date.now() })
    }

    const ipData = rateLimitMap.get(ip)

    if (Date.now() - ipData.lastReset > windowMs) {
        ipData.count = 0
        ipData.lastReset = Date.now()
    }

    if (ipData.count >= limit) {
        return new NextResponse('Too Many Requests', { status: 429 })
    }

    ipData.count += 1

    const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://cdn.sanity.io;
    font-src 'self' data:;
    connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://www.google-analytics.com;
    frame-src https://www.youtube.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s+/g, ' ').trim()

    response.headers.set('Content-Security-Policy', csp)
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')

    return response
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
    ],
}