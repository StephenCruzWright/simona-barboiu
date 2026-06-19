import { redirect } from "next/navigation";

// /projects/interactive is an organizational segment with no page of its own.
export default function InteractiveIndex() {
  redirect("/projects");
}
