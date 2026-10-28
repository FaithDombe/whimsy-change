import { SwitcherBar } from "./switcher-bar";

export const metadata = {
  title: "Ziki Whimsical Pipeline Prototypes",
  description: "3 interactive prototypes rethinking human-agent interaction on the Ziki pipeline.",
};

export default function PrototypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zk-bg text-zk-text antialiased flex flex-col font-sans">
      <SwitcherBar />
      <main className="flex-1 pb-16">{children}</main>
    </div>
  );
}
