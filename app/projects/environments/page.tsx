import { redirect } from "next/navigation";

// /projects/environments is an organizational segment with no page of its own.
export default function EnvironmentsIndex() {
  redirect("/projects");
}
