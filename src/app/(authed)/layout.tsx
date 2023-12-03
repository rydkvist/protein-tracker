import { getServerAuthSession } from "@/server/auth";
import Profile from "../_components/profile";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <main>
      <section>
        <nav className="text-righ flex w-full flex-row justify-end px-8 py-4">
          <Profile session={session} />
        </nav>

        {children}
      </section>
    </main>
  );
}
