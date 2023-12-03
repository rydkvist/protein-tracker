import Link from "next/link";
import { btnConfig } from "./_components/button";
import Image from "next/image";

export default async function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#026d60] to-[#afb2a6] text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <Image
          src="/logo.png"
          alt="Protein Tracker"
          className="h-32 w-32 rounded-full"
          width={128}
          height={128}
        />

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[4rem]">
          Protein <span className="text-[hsl(129,100%,70%)]">Tracker</span>
        </h1>

        <p className="text-center text-3xl font-semibold">
          Start tracking your proteins seamlessly.
        </p>

        <Link href={"/api/auth/signin"} className={btnConfig.base}>
          Sign in
        </Link>
      </div>
    </main>
  );
}
