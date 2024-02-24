"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { register } from "@/server";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Register() {
  const [state, formAction] = useFormState(register, { error: "" });

  return (
    <form
      action={formAction}
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
            <div className="flex items-center justify-between mt-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-base font-medium leading-6 text-slate-500"
                >
                  First Name
                </label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-base font-medium leading-6 text-slate-500"
                >
                  Last Name
                </label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="email"
                className="block text-base font-medium leading-6 text-slate-500"
              >
                Email Address
              </label>

              <Input
                type="email"
                name="email"
                id="email"
                required
                className="mt-2"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-base font-medium leading-6 text-slate-500"
              >
                Password
              </label>

              <Input
                type="password"
                name="password"
                id="password"
                required
                className="mt-2"
              />
            </div>

            <p className="h-4 mt-3 text-sm leading-6 text-red-700">
              {state.error}
            </p>

            <div className="flex items-center justify-center w-full mt-10">
              <SubmitButton text="Register" />
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
