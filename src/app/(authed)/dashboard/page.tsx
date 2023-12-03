import { CreateDailyMacros } from "@/app/_components/create-daily-macros";
import { CreatePost } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { RouterOutputs } from "@/trpc/shared";

const columnClass =
  "flex flex-1 flex-col gap-4 p-8 bg-green-700 rounded-xl shadow-md border border-green-800 self-stretch";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const today = new Date();
  const latestMacros = await api.macros.getLatest.query();

  return (
    <div className="container flex flex-col items-center justify-center">
      <h2 className="text-4xl">Dashboard</h2>

      <div className="mt-4 inline-flex items-center justify-center gap-8 rounded-xl bg-white bg-opacity-25 px-8 py-4">
        <a href="/history" className=" hover:bg-slate-100 ">
          Check previous day
        </a>
        <span className="flex items-center rounded-full bg-slate-600 px-2 py-1 text-center text-lg">
          Today
          <br />
          {today.toLocaleDateString()}
        </span>
        <a href="/history" className=" hover:bg-slate-100 ">
          Check next day
        </a>
      </div>

      <a href="/macros" className="mt-4 hover:opacity-75">
        See all saved macros
      </a>

      <div className="mt-8 flex flex-row items-start justify-center gap-2 pb-16">
        <div className={columnClass}>
          <h3 className="text-center text-2xl">Daily Protein</h3>

          <CreateDailyMacros initialData={latestMacros} />
        </div>
      </div>
    </div>
  );
}
