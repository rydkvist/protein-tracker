import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Macros() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const macros = await api.macros.getAllMacros.query();

  return (
    <div className="container flex flex-col items-center justify-center">
      <h2 className="text-4xl">Macros</h2>

      {macros.map((macro) => (
        <div className="mt-8 flex flex-row items-start justify-center gap-2">
          {JSON.stringify(macro)}
        </div>
      ))}

      <a href="/dashboard" className="mt-4 hover:opacity-75">
        Go back to dashboard
      </a>
    </div>
  );
}
