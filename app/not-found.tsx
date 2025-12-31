import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-4 py-20 bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-semibold">404 — Page not found</h1>
      <p className="mt-4 opacity-80">
        The page you’re looking for doesn’t exist (or it was moved).
      </p>

      <div className="mt-8 flex gap-4">
        <Link href="/" className="underline underline-offset-4">
          Go home
        </Link>
        <Link href="/work" className="underline underline-offset-4">
          View work
        </Link>
      </div>
    </main>
  );
}