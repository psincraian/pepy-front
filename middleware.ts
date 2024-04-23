import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export const config = {
    matcher: ['/api/:path*', '/subscriptions']
}

export function middleware(request: NextRequest) {
    try {
        const requestHeaders = new Headers(request.headers)
        const accessToken = request.cookies.getAll().filter(cookie => cookie.name.includes('accessToken'));
        if (accessToken.length === 1) {
            requestHeaders.set('Authorization', 'Bearer ' + accessToken[0].value);
        }
        requestHeaders.set('X-Api-Key', process.env.PEPY_API_KEY!);

        return NextResponse.next({
            request: {
                // New request headers
                headers: requestHeaders,
            },
        });
    } catch (error) {
        console.log(error);
    }

}