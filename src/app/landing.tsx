import Link from "next/link";

export default async function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#026d60] to-[#afb2a6] text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Protein <span className="text-[hsl(129,100%,70%)]">Tracker</span>
        </h1>

        <p className="text-center text-3xl font-semibold">
          Start tracking your protein seamlessly.
        </p>

        <Link
          href={"/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
