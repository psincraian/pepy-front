import Link from "next/link";
import AppBar from "@/app/components/app_bar";

export default function NotFound() {
  return (
    <div>
      <AppBar />
      <main>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </main>
    </div>
  );
}
