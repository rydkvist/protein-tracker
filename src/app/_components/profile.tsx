import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { btnConfig } from "./button";

function Profile({ session }: { session: Session }) {
  const firstName = session.user.name?.split(" ")[0];

  return (
    <div className="mt-2 flex flex-col items-center gap-4">
      <div className="inline-flex items-center gap-4">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={`Profile of ${firstName}`}
            className="h-12 w-12 rounded-full"
            width={48}
            height={48}
          />
        )}
        <Link href={"/api/auth/signout"} className={btnConfig.base}>
          Sign out
        </Link>
      </div>
    </div>
  );
}

export default Profile;
