import { createEntry } from "@/server";
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

export default function EntryForm() {
  return (
    <form action={createEntry} className="w-full pt-8">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 min-w-[500px]">
          <h2 className="text-2xl font-bold leading-8 text-slate-200">
            Add Entry
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

            <div>
              <label
                htmlFor="title"
                className="block text-base font-medium leading-6 text-slate-500"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <Input type="text" name="title" id="title" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="body"
                className="block text-base font-medium leading-6 text-slate-500"
              >
                Description
              </label>
              <div className="mt-2">
                <Textarea id="body" name="body" rows={5} />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Write a few sentences about how was it
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-end gap-3">
        <SubmitButton text="Create Entry" />
        <Button type="reset" variant={"outline"} className="w-full">
          Cancel
        </Button>
      </div>
    </form>
  );
}