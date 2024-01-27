import { getUser } from "@/auth";
import { SignInButton } from "@/components/SignInButton";

export default async function Home() {
  const { isAuthenticated, user } = await getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        <SignInButton />
      </header>
      {user && `Hey there, ${user.firstName}`}
    </main>
  );
}
