import { getUser } from "@/auth";
import Create from "@/components/CreateEntry";
import { prisma } from "@/db";
import { format } from "date-fns/format";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getEntries(userId: string) {
  let entries = await prisma.entry.findMany({
    where: { userId },
  });

  return entries;
}

export default async function Home() {
  let { user, isAuthenticated } = await getUser();

  if (!isAuthenticated || !user) redirect("/login");

  let entries = await getEntries(user.id);

  return (
    <div>
      <Create />

      <div className="w-full my-8 border-t border-t-slate-700">
        {entries.map((entry) => (
          <div key={entry.id} className="py-4">
            <div className="flex items-center justify-start gap-2 text-base font-semibold text-blue-500">
              <div className="flex items-center justify-center w-4 h-4 border border-blue-500 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              </div>

              <p className="flex items-center justify-start gap-2 ">
                {entry.category}
                <time>{format(entry.createdAt, "do LLL, yyyy")}</time>
              </p>
            </div>

            <h3 className="py-2 text-xl font-semibold text-slate-200">
              {entry.title}
            </h3>
            <p className="text-base font-normal max-w-prose text-slate-300">
              {entry.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
