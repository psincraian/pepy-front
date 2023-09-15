import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('Authentication', 'petru-api')

    // You can also set request headers in NextResponse.rewrite
    var response = NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders,
        },
    })

    return response;
}