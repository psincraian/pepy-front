import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export const config = {
    matcher: '/api/:path*',
}

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    const accessToken = request.cookies.get('CognitoIdentityServiceProvider.67oda21n4538a52ub88r0tav24.petru.accessToken');
    requestHeaders.set('Authorization', 'Bearer ' + accessToken?.value)
    return NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders,
        },
    });
}