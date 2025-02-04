import { getToken } from "next-auth/jwt"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export const middleware = async (req) => {
    const token = cookies(req).get('__Secure-next-auth.session-token')
    const secret = process.env.NEXT_PUBLIC_AUTH_SECRET
    const tokenSecret = await getToken({ req, secret })

    console.log('path name check', req.nextUrl.pathname)

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        if (!tokenSecret || tokenSecret.role !== 'admin') {
            const response = NextResponse.redirect(new URL('/signin', req.url))
            response.cookies.set("next-auth.session-token", "", { maxAge: 0 })
            return response
        }
    }


    if (!token) {
        return NextResponse.redirect(new URL('/signin', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/profile', '/dashboard', '/dashboard/doctors', '/dashboard/patients', '/dashboard/doctors-request', '/dashboard/appoinments']
}