import { getServerAuthSession } from "@/server/auth";

import Landing from "./landing";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return <Landing />;
}
