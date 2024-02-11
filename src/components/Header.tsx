import { clearCookie, getUser } from "@/auth";
import { Button } from "./ui/button";

export default async function Header() {
  const { isAuthenticated } = await getUser();

  return (
    <header
      className={`flex items-center p-4 shadow border-b border-b-slate-800 ${
        isAuthenticated ? "justify-between" : "justify-center"
      }`}
    >
      <span className="text-base font-bold tracking-wide border-b text-slate-50 border-b-blue-700">
        Journal App
      </span>

      {isAuthenticated ? (
        <form
          action={async () => {
            "use server";
            await clearCookie();
          }}
        >
          <Button type="submit" className="bg-blue-900">
            Logout
          </Button>
        </form>
      ) : null}
    </header>
  );
}
