import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
    matcher: ['/api/:path*', '/subscriptions']
}

export async function middleware(request: NextRequest) {
    try {
        const requestHeaders = new Headers(request.headers)
        if (request.cookies.has("access_token")) {
            let accessToken = request.cookies.get("access_token");
            requestHeaders.set("Authorization", "Bearer " + accessToken!.value);
        }
        requestHeaders.delete("cookie");
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