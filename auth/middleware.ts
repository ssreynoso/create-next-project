import { NextResponse, type NextRequest } from 'next/server'
import { nextAuthMiddleware } from './middlewares/next-auth'

// Puedo usar esto si quiero que next-auth se ejecute antes de mi middleware
// export { default } from 'next-auth'

// Si yo quiero ejecutar mi middleware antes que next-auth, tengo que hacer esto:
export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.trim() === '/manifest.json') {
        return NextResponse.next()
    }

    // Control de acceso a la API
    if (req.nextUrl.pathname.startsWith('/api')) {
        const refererHeader = req.headers.get('referer')
        const isSameOrigin  = refererHeader?.startsWith(req.nextUrl.origin)
        const isDev         = process.env.NODE_ENV === 'development'
        if (isSameOrigin || isDev) {
            return NextResponse.next()
        } else {
            return NextResponse.json({ error: 'Operación no permitida' }, { status: 403 })
        }
    }

    // Control de acceso a las rutas
    const authResponse = await nextAuthMiddleware(req)
    if (authResponse.redirect && authResponse.destination) {
        return NextResponse.redirect(authResponse.destination)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!sign-in|sign-up|_next/static|_next/image|favicon.ico).*)',
    ],
}
