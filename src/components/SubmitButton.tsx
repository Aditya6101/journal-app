"use client";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type Props = {
  text?: string;
};

export default function SubmitButton({ text = "Submit" }: Props) {
  let { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-blue-800"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {text}
    </Button>
  );
}
