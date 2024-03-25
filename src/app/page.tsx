import Entries from "@/components/Entries";
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
        <Entries entries={entries} />
      </div>
    </div>
  );
}
