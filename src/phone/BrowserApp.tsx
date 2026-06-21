import { useState } from "react";
import type {
  BrowserAppData,
  BrowserView,
  BrowserSearch,
  BrowserVisit,
  BrowserTab,
  BrowserBookmark,
} from "../types";

interface Props {
  data: BrowserAppData;
  onBack: () => void;
}

export default function BrowserApp({ data, onBack }: Props) {
  const [view, setView] = useState<BrowserView>(data.default_view ?? "search");

  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col">
      <div className="h-12 bg-zinc-900/90 border-b border-zinc-700 flex items-center justify-between px-3 text-white">
        <button onClick={onBack} className="text-blue-400 text-[14px]">
          ‹
        </button>
        <div className="font-semibold">Browser</div>
        <div className="w-6" />
      </div>

      <div className="px-2 pt-2 pb-1 flex gap-1 bg-zinc-900 overflow-x-auto">
        {data.search_history && (
          <TabBtn label="Search" active={view === "search"} onClick={() => setView("search")} />
        )}
        {data.visited_history && (
          <TabBtn label="History" active={view === "history"} onClick={() => setView("history")} />
        )}
        {data.open_tabs && (
          <TabBtn label="Tabs" active={view === "tabs"} onClick={() => setView("tabs")} />
        )}
        {data.bookmarks && (
          <TabBtn
            label="Bookmarks"
            active={view === "bookmarks"}
            onClick={() => setView("bookmarks")}
          />
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {view === "search" && (
          <SearchHistoryView items={data.search_history ?? []} />
        )}
        {view === "history" && (
          <VisitedHistoryView items={data.visited_history ?? []} />
        )}
        {view === "tabs" && <OpenTabsView items={data.open_tabs ?? []} />}
        {view === "bookmarks" && <BookmarksView items={data.bookmarks ?? []} />}
      </div>
    </div>
  );
}

function TabBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors whitespace-nowrap ${
        active
          ? "bg-zinc-700 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
      }`}
    >
      {label}
    </button>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900/80 sticky top-0 z-10 border-b border-zinc-800">
      {children}
    </div>
  );
}

function SearchHistoryView({ items }: { items: BrowserSearch[] }) {
  if (items.length === 0) {
    return <div className="p-6 text-center text-zinc-500 text-sm">No saved searches.</div>;
  }
  return (
    <div>
      <SectionHeader>Recent searches · most recent first</SectionHeader>
      <ul className="divide-y divide-zinc-800">
        {items.map((s) => (
          <li key={s.id} className="px-4 py-3">
            <div className="flex items-start gap-2.5">
              <span className="text-zinc-500 text-[14px] mt-0.5">🔍</span>
              <div className="flex-1 min-w-0">
                <div className="text-white text-[13px] leading-snug">{s.query}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                  {s.timestamp}
                  {s.engine && <span className="ml-2">· {s.engine}</span>}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VisitedHistoryView({ items }: { items: BrowserVisit[] }) {
  if (items.length === 0) {
    return <div className="p-6 text-center text-zinc-500 text-sm">No browsing history.</div>;
  }
  return (
    <div>
      <SectionHeader>Visited pages · most recent first</SectionHeader>
      <ul className="divide-y divide-zinc-800">
        {items.map((v) => (
          <li key={v.id} className="px-4 py-2.5">
            <div className="flex items-start gap-2.5">
              <span className="text-[14px] mt-0.5">{v.icon ?? "🌐"}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white text-[13px] leading-snug truncate">{v.title}</div>
                <div className="text-cyan-300 text-[10px] mt-0.5 font-mono truncate">
                  {v.url}
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                  {v.timestamp}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OpenTabsView({ items }: { items: BrowserTab[] }) {
  if (items.length === 0) {
    return <div className="p-6 text-center text-zinc-500 text-sm">No open tabs.</div>;
  }
  return (
    <div className="p-3 grid grid-cols-1 gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className="rounded-lg bg-zinc-800 border border-zinc-700 p-3"
        >
          <div className="flex items-start gap-2">
            <span className="text-[14px] mt-0.5">{t.icon ?? "🌐"}</span>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[12px] font-semibold truncate">
                {t.title}
              </div>
              <div className="text-cyan-300 text-[10px] mt-0.5 font-mono truncate">
                {t.url}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BookmarksView({ items }: { items: BrowserBookmark[] }) {
  if (items.length === 0) {
    return <div className="p-6 text-center text-zinc-500 text-sm">No bookmarks.</div>;
  }
  const byFolder = items.reduce<Record<string, BrowserBookmark[]>>((acc, b) => {
    const f = b.folder ?? "Bookmarks";
    (acc[f] ??= []).push(b);
    return acc;
  }, {});
  return (
    <div>
      {Object.entries(byFolder).map(([folder, list]) => (
        <div key={folder}>
          <SectionHeader>{folder}</SectionHeader>
          <ul className="divide-y divide-zinc-800">
            {list.map((b) => (
              <li key={b.id} className="px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[14px]">{b.icon ?? "🔖"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-[13px] truncate">{b.title}</div>
                    <div className="text-cyan-300 text-[10px] mt-0.5 font-mono truncate">
                      {b.url}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
