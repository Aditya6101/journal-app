"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { login } from "@/server";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, formAction] = useFormState(login, { error: "" });

  return (
    <form
      action={formAction}
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
                <Input type="email" name="email" id="email" required />
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
                <Input type="password" name="password" id="password" required />
              </div>
            </div>

            <p className="h-4 mt-3 text-sm leading-6 text-red-700">
              {state.error}
            </p>

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
