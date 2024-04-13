import { updateEntry, createEntry } from "@/server";
import SubmitButton from "./SubmitButton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Entry } from "@prisma/client";
import { redirect } from "next/navigation";

export default function EntryForm({ entry }: { entry?: Entry }) {
  async function handleSubmit(formData: FormData) {
    "use server";
    if (!entry) {
      return await createEntry(formData);
    }

    if (!entry?.id) throw new Error("id not found");

    await updateEntry({ formData, id: entry?.id });
    return redirect("/");
  }

  return (
    <form action={handleSubmit} className="w-full pt-8">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 min-w-[500px]">
          <h2 className="text-2xl font-bold leading-8 text-slate-200">
            {entry ? "Update" : "Add"} Entry
          </h2>
          <p className="mt-2 text-base leading-6 text-slate-400">
            Share what you learned, experienced and enjoyed!
          </p>

          <div className="w-full mt-5 space-y-5">
            <div>
              <label
                htmlFor="category"
                className="block text-base font-medium leading-6 text-slate-500"
              >
                Category
              </label>
              <div className="mt-2">
                <Select name="category" required defaultValue={entry?.category}>
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

            <div>
              <label
                htmlFor="title"
                className="block text-base font-medium leading-6 text-slate-500"
              >
                Title
              </label>
              <Input
                type="text"
                name="title"
                id="title"
                className="mt-2"
                defaultValue={entry?.title}
              />
            </div>

            <div>
              <label
                htmlFor="body"
                className="block text-base font-medium leading-6 text-slate-500"
              >
                Description
              </label>
              <Textarea
                id="body"
                name="body"
                rows={5}
                className="mt-2"
                defaultValue={entry?.body}
              />
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Write a few sentences about how was it
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-end gap-3">
        <SubmitButton text={`${entry ? "Update" : "Create"} Entry`} />
        <Button type="reset" variant={"outline"} className="w-full">
          Cancel
        </Button>
      </div>
    </form>
  );
}
