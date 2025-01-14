import { getSession } from "@/lib/authv2";
import Login from "@/app/auth-test/Login";

export default async function Home() {
  const session = await getSession();
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Welcome back
        </h1>
        <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue.</p>
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
        <Login />
      </div>
    </main>
  );
}