import EntryForm from "@/components/EntryForm";
import { getEntry } from "@/server";

export default async function Page({ params }: { params: { id: string } }) {
  let entry = await getEntry(params.id);

  return (
    <div>
      <EntryForm entry={entry} />
    </div>
  );
}
