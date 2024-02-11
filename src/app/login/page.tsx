import { getJwtSecretKey, workos } from "@/auth";
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
              <Button type="submit" className="w-full bg-blue-800">
                Login
              </Button>
            </div>

            <p className="mt-10 text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Create
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

// <div>
//           <label
//             htmlFor="email"
//             className="block text-base font-medium leading-6 text-slate-500"
//           >
//             Email
//           </label>
//           <div className="mt-2">
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>

//         <div>
//           <div className="flex items-center justify-between">
//             <label
//               htmlFor="password"
//               className="block text-base font-medium leading-6 text-slate-500"
//             >
//               Password
//             </label>
//           </div>

//           <div className="mt-2">
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               required
//               className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>

//         <div>
//           <button
//             type="submit"
//             className="flex w-full justify-center rounded-md bg-blue-600 py-1.5 px-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//           >
//             Log in
//           </button>
//         </div>
