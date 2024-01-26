import { getToken } from 'next-auth/jwt'
import { type NextRequest } from 'next/server'

export const nextAuthMiddleware = async (req: NextRequest) => {
    const { pathname, search, origin, basePath } = req.nextUrl

    const signInPage = '/sign-in'
    const errorPage = '/api/auth/error'
    // const authPath    = parseUrl(process.env.NEXTAUTH_URL).path
    // const publicPaths = ['/_next', '/favicon.ico']

    const secret = process.env.NEXTAUTH_SECRET

    if (!secret) {
        console.error('[next-auth][error][NO_SECRET]', '\nhttps://next-auth.js.org/errors#no_secret')

        const errorUrl = new URL(`${basePath}${errorPage}`, origin)
        errorUrl.searchParams.append('error', 'Configuration')

        return { redirect: true, destination: errorUrl }
    }

    const token = await getToken({ req, secret })

    if (!token) {
        // the user is not logged in, redirect to the sign-in page
        const signInUrl = new URL(`${basePath}${signInPage}`, origin)
        signInUrl.searchParams.append('callbackUrl', `${basePath}${pathname}${search}`)
        return { redirect: true, destination: signInUrl }
    }

    return { redirect: false, token }
}
