import EntryForm from "@/components/EntryForm";
import { Button } from "@/components/ui/button";
import { deleteEntry, getEntries } from "@/server";
import { format } from "date-fns/format";
import { Trash } from "lucide-react";

export default async function Home() {
  let entries = await getEntries();

  return (
    <div>
      <EntryForm />

      <div className="w-full my-8 border-t border-t-slate-700">
        {entries.map((entry) => (
          <div key={entry.id} className="py-4">
            <div className="flex items-center justify-start gap-2 text-base font-semibold text-blue-500">
              <div className="flex items-center justify-center w-4 h-4 border border-blue-500 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              </div>

              <p className="flex items-center justify-start gap-2 grow">
                {entry.category} -
                <time>{format(entry.createdAt, "do LLL, yyyy")}</time>
              </p>

              <form action={deleteEntry}>
                <input type="hidden" name="id" value={entry.id} />
                <Button variant="ghost" size="icon">
                  <Trash className="w-4 h-4" />
                </Button>
              </form>
            </div>

            <h3 className="py-2 text-xl font-semibold text-slate-200">
              {entry.title}
            </h3>
            <p className="text-base font-normal max-w-prose text-slate-300">
              {entry.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
