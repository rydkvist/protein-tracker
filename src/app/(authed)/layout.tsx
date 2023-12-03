import { getServerAuthSession } from "@/server/auth";
import Profile from "../_components/profile";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#026d60] to-[#afb2a6] text-white">
      <nav className="flex flex-row justify-between px-8 py-4">
        <Image
          src="/logo.png"
          alt="Protein Tracker"
          className="h-16 w-16 rounded-full"
          width={64}
          height={64}
        />
        <Profile session={session} />
      </nav>

      <section className="container mx-auto flex flex-col">{children}</section>
    </main>
  );
}
