import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <main>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </main>
    </div>
  );
}
