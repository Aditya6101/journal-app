import { getJwtSecretKey, workos } from "@/auth";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import assert from "assert";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";
  const data = Object.fromEntries(formData);
  const cookiesStore = cookies();

  assert.ok(typeof data.email === "string");
  assert.ok(typeof data.password === "string");
  assert.ok(typeof process.env.WORKOS_CLIENT_ID === "string");

  const user = await workos.userManagement.authenticateWithPassword({
    email: data.email,
    password: data.password,
    clientId: process.env.WORKOS_CLIENT_ID,
  });

  const token = await new SignJWT({
    user,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(getJwtSecretKey());

  cookiesStore.set({
    name: "token",
    value: token,
    path: "/",
    httpOnly: true,
  });

  return redirect("/");
}

export default function Login() {
  return (
    <form
      action={login}
      className="flex flex-col items-center justify-center w-full pt-8"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 min-w-[500px]">
          <h2 className="text-3xl font-bold leading-8 text-slate-200">
            Log in to your account
          </h2>
          <p className="mt-3 text-base leading-6 text-slate-400">
            Start saving what you learned, experienced and enjoyed!
          </p>

          <div className="mt-8">
            <div className="mt-5">
              <label
                htmlFor="email"
                className="block text-base font-medium leading-6 text-slate-500"
              >
                Email Address
              </label>

              <div className="flex w-full mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                <Input type="email" name="email" id="email" />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-base font-medium leading-6 text-slate-500"
              >
                Password
              </label>

              <div className="flex w-full mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                <Input type="password" name="password" id="password" />
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-10">
              <SubmitButton text="Login" />
            </div>

            <p className="mt-10 text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Register
              </Link>{" "}
              to get started
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
