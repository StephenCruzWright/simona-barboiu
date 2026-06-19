import { redirect } from "next/navigation";

// /projects/viz is an organizational segment with no page of its own —
// send visitors to the Projects index instead of 404ing.
export default function VizIndex() {
  redirect("/projects");
}
