import { SwitcherBar } from "./switcher-bar";
import { ForceLightMode } from "./force-light-mode";

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
    <div
      data-theme="light"
      style={{
        colorScheme: "light",
        ["--background" as string]: "#f5f7fc",
        ["--foreground" as string]: "#15121f",
        ["--card" as string]: "#ffffff",
        ["--zk-bg" as string]: "#f5f7fc",
        ["--zk-surface" as string]: "#ffffff",
        ["--zk-text" as string]: "#15121f",
        ["--zk-text2" as string]: "#3e4a63",
        ["--zk-muted" as string]: "#5f6577",
        ["--zk-border" as string]: "#e3e8f2",
        ["--zk-divider" as string]: "#eef1f7",
        ["--zk-tint" as string]: "#eaf2fe",
        ["--zk-chip" as string]: "#f0f2f7",
        ["--zk-seg" as string]: "#eef1f6",
        ["--zk-accent" as string]: "#1f5fd9",
      }}
      className="min-h-screen bg-zk-bg text-zk-text antialiased flex flex-col font-sans"
    >
      <ForceLightMode />
      <SwitcherBar />
      <main className="flex-1 pb-16">{children}</main>
    </div>
  );
}
