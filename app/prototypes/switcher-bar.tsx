"use client";

export function SwitcherBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e3e8f2] bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2e6fef] text-white font-black text-xs shadow-xs">
            01
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#15121f]">
                Idea 1: The Pipeline Perch
              </span>
              <span className="rounded-full bg-[#eaf2fe] px-2 py-0.5 text-[10px] font-bold text-[#1f5fd9] border border-[#e3e8f2]">
                Faith Dombe · HNG 15
              </span>
            </div>
            <p className="text-[11px] text-[#5f6577] hidden sm:block">
              Mini Agent Companions on Stage Tabs · Light Mode
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Interactive Localhost &amp; Vercel Ready
          </span>
        </div>
      </div>
    </header>
  );
}
