import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ziki Issues · Whimsical Pipeline Perch",
  description: "Whimsical agent pipeline prototype for Ziki by Faith Dombe.",
};

export default function Page() {
  redirect("/prototypes");
}
