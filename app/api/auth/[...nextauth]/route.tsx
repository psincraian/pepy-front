import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

export const runtime = 'nodejs'

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };