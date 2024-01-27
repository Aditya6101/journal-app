import { getUser } from "@/auth";
import { SignInButton } from "@/components/SignInButton";
import { prisma } from "@/db";
import { newEntry } from "@/server";

function getEntries(userId: string) {
  return prisma.entry.findMany({
    where: { userId },
  });
}

export default async function Home() {
  const { user } = await getUser();

  if (!user) throw Error("Please login first");

  const entries = await getEntries(user.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        <SignInButton />
      </header>
      {user && `Hey there, ${user.firstName}`}

      {user && (
        <>
          <form action={newEntry}>
            <button>Create Entry</button>
          </form>

          {entries.map((entry) => (
            <div key={entry.id}>
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
              <pre>{entry.category}</pre>
              <time>{new Date(entry.createdAt).getUTCDate()}</time>
            </div>
          ))}
        </>
      )}
    </main>
  );
}
