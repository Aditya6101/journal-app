import Entries from "@/components/Entries";
import EntryForm from "@/components/EntryForm";
import { getEntries } from "@/server";

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
