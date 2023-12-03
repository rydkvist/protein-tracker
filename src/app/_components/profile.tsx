import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

function Profile({ session }: { session: Session | null }) {
  return (
    <div className="mt-2 flex flex-col items-center gap-2">
      <p className="text-xl text-white">
        {session && <span>{session.user?.name}</span>}
      </p>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt="Profile picture"
          className="h-12 w-12 rounded-full"
          width={48}
          height={48}
        />
      )}
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
}

export default Profile;
