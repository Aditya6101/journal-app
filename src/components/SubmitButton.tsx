"use client";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import type { ReactNode } from "react";

type Props = {
  text?: string;
  icon?: ReactNode
};

export default function SubmitButton({ text = "Submit", icon }: Props) {
  let { pending } = useFormStatus();

  if (icon) {
    return (
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        aria-disabled={pending}
        disabled={pending}
      >
        {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {!pending && icon}
      </Button>
    )
  }

  return (
    <Button
      type="submit"
      className="w-full bg-blue-800"
      aria-disabled={pending}
      disabled={pending}
    >
      {!icon && pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {text}
    </Button>
  );
}
