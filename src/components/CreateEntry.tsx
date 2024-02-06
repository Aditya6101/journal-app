import { getUser } from "@/auth";
import { prisma } from "@/db";
import { Category } from "@prisma/client";
import assert from "assert";
import { redirect } from "next/navigation";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

async function createEntry(formData: FormData) {
  "use server";
  let data = Object.fromEntries(formData);

  assert.ok(typeof data.title === "string");
  assert.ok(typeof data.body === "string");
  assert.ok(
    data.category === "Work" ||
      data.category === "Learning" ||
      data.category === "Interesting" ||
      data.category === "Personal"
  );

  let title = data.title;
  let body = data.body;
  let category: Category = data.category;
  let { user, isAuthenticated } = await getUser();

  if (!user || !isAuthenticated) throw new Error("User not found");

  let { firstName, id } = user;

  firstName = firstName || "";

  await prisma.entry.create({
    data: {
      title,
      body,
      category,
      user: {
        connect: {
          id,
        },
      },
    },
  });

  return redirect("/");
}

export default function Create() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <form action={createEntry}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 min-w-[500px]">
            <h2 className="text-2xl font-bold leading-8 text-slate-200">
              Add Entry
            </h2>
            <p className="mt-2 text-base leading-6 text-slate-400">
              Share what you learned, experienced and enjoyed!
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-base font-medium leading-6 text-slate-500"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="A nice title..."
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="body"
                  className="block text-base font-medium leading-6 text-slate-500"
                >
                  Description
                </label>
                <div className="mt-2">
                  <Textarea id="body" name="body" rows={3} defaultValue={""} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Write a few sentences about how it went
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-base font-medium leading-6 text-slate-500"
                >
                  Category
                </label>
                <div className="mt-2">
                  <Select name="category">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Work">Work</SelectItem>
                        <SelectItem value="Learning">Learning</SelectItem>
                        <SelectItem value="Interesting">Interesting</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button type="submit" className="bg-blue-900">
            Save
          </Button>
          <Button type="button" variant={"outline"}>
            Cancel
          </Button>
        </div>
      </form>
    </main>
  );
}
