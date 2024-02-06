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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-4xl mx-auto">
      <h2 className="text-5xl font-bold leading-8 text-neutral-50">
        Work Journal
      </h2>

      <Create />

      <div className="w-full">
        {entries.map((entry) => (
          <div key={entry.id}>
            <span className="text-base font-semibold text-blue-600">
              {format(entry.createdAt, "do LLL, yyyy")}
            </span>
            <h3>{entry.title}</h3>
            <p>{entry.body}</p>
            <pre>{entry.category}</pre>
            <hr />
          </div>
        ))}
      </div>
    </main>
  );
}
