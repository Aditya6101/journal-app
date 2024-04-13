import { deleteEntry } from "@/server";
import { $Enums } from "@prisma/client";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { PenIcon, Trash } from "lucide-react";
import SubmitButton from "./SubmitButton";
import Link from "next/link";

type Entries = {
  id: string;
  title: string;
  body: string;
  category: $Enums.Category;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export default function Entries({ entries }: { entries: Entries[] }) {
  return entries.map((entry) => (
    <div key={entry.id} className="py-4 group">
      <div className="flex items-center justify-start gap-2 text-base font-semibold text-blue-500">
        <div className="flex items-center justify-center w-4 h-4 border border-blue-500 rounded-full">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
        </div>

        <p className="flex items-center justify-start gap-2 grow py-2">
          {entry.category} -
          <time>{format(entry.createdAt, "do LLL, yyyy")}</time>
        </p>

        <div className="hidden group-hover:flex">
          <Link href={`/entry/${entry.id}`}>
            <Button variant="ghost" size="icon">
              <PenIcon className="w-4 h-4" />
            </Button>
          </Link>
          <form action={deleteEntry}>
            <input type="hidden" name="id" value={entry.id} />
            <SubmitButton icon={<Trash className="w-4 h-4" />} />
          </form>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-slate-200">{entry.title}</h3>
      <p className="text-base font-normal max-w-prose text-slate-300">
        {entry.body}
      </p>
    </div>
  ));
}
