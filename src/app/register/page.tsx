import { getJwtSecretKey, workos } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/db";
import assert from "assert";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function register(formData: FormData) {
  "use server";
  let data = Object.fromEntries(formData);
  const cookiesStore = cookies();

  assert.ok(typeof data.email === "string");
  assert.ok(typeof data.firstName === "string");
  assert.ok(typeof data.lastName === "string");
  assert.ok(typeof data.password === "string");

  let user = await workos.userManagement.createUser({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    emailVerified: true,
  });

  let dbUser = await prisma.user.create({
    data: {
      id: user.id,
      email: data.email,
      firstName: data.firstName,
      lastname: data.lastName,
    },
  });

  let token = await new SignJWT({
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

export default function Register() {
  return (
    <form
      action={register}
      className="flex flex-col items-center justify-center w-full pt-8"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 min-w-[500px]">
          <h2 className="text-3xl font-bold leading-8 text-slate-200">
            Create a new account
          </h2>
          <p className="mt-3 text-base leading-6 text-slate-400">
            Start saving what you learned, experienced and enjoyed!
          </p>

          <div className="mt-8">
            <div className="mt-5 flex items-center justify-between">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-base font-medium leading-6 text-slate-500"
                >
                  First Name
                </label>
                <div className="flex w-full mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                  <Input type="text" name="firstName" id="firstName" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-base font-medium leading-6 text-slate-500"
                >
                  Last Name
                </label>
                <div className="flex w-full mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                  <Input type="text" name="lastName" id="lastName" />
                </div>
              </div>
            </div>

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
              <Button type="submit" className="w-full bg-blue-800">
                Register
              </Button>
            </div>

            <p className="mt-5 text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
