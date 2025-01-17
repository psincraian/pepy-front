import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/authv2";

export const config = {
    matcher: ['/api/:path*', '/subscriptions']
}

export async function middleware(request: NextRequest) {
    try {
        const requestHeaders = new Headers(request.headers)
        const session = await getAuthSession();
        requestHeaders.delete("cookie");
        if (session.isLoggedIn) {
            requestHeaders.set("Authorization", "Bearer " + session.access_token);
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