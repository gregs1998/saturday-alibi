import { useState } from "react";
import type { CallsAppData, PhoneCall, CallDirection } from "../types";

interface Props {
  data: CallsAppData;
  onBack: () => void;
}

type Tab = "all" | "missed";

export default function CallsApp({ data, onBack }: Props) {
  const [tab, setTab] = useState<Tab>("all");
  const [showDeleted, setShowDeleted] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const all = [...data.calls, ...(data.recently_deleted ?? [])];
  const open = openId ? all.find((c) => c.id === openId) ?? null : null;
  const isOpenDeleted = open && (data.recently_deleted ?? []).some((c) => c.id === open.id);

  if (open) {
    return (
      <CallDetail
        call={open}
        recovered={!!isOpenDeleted}
        onBack={() => setOpenId(null)}
      />
    );
  }

  const visible = showDeleted
    ? data.recently_deleted ?? []
    : tab === "missed"
      ? data.calls.filter((c) => c.direction === "missed")
      : data.calls;

  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col">
      <div className="h-12 bg-zinc-900/90 border-b border-zinc-700 flex items-center justify-between px-3 text-white">
        <button onClick={onBack} className="text-blue-400 text-[14px]">
          ‹
        </button>
        <div className="font-semibold">Phone</div>
        <button
          className={`text-[11px] font-medium ${showDeleted ? "text-rose-400" : "text-blue-400"}`}
          onClick={() => setShowDeleted((v) => !v)}
        >
          {showDeleted ? "Recents" : "Edit"}
        </button>
      </div>

      {!showDeleted && (
        <div className="px-3 pt-2 pb-1 flex gap-1 bg-zinc-900">
          <TabBtn label="All" active={tab === "all"} onClick={() => setTab("all")} />
          <TabBtn
            label="Missed"
            active={tab === "missed"}
            onClick={() => setTab("missed")}
          />
        </div>
      )}

      {showDeleted && (
        <div className="px-4 py-2 bg-rose-950/30 border-y border-rose-500/20">
          <div className="text-rose-300 text-[11px] font-medium">
            RECENTLY DELETED · FORENSIC RECOVERY
          </div>
          <div className="text-rose-400/70 text-[10px] mt-0.5">
            Calls the user removed are restored below.
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {!showDeleted && (
          <FolderTeaser
            label="Recently Deleted"
            count={data.recently_deleted?.length ?? 0}
            onClick={() => setShowDeleted(true)}
          />
        )}
        <CallList calls={visible} onOpen={setOpenId} recovered={showDeleted} />
        {visible.length === 0 && (
          <div className="p-6 text-center text-zinc-500 text-sm">No calls.</div>
        )}
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
      className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${
        active
          ? "bg-zinc-700 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
      }`}
    >
      {label}
    </button>
  );
}

function FolderTeaser({
  label,
  count,
  onClick,
}: {
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-2.5 bg-zinc-800/50 border-b border-zinc-700/50 hover:bg-zinc-800 transition-colors"
    >
      <div className="flex items-center gap-2 text-zinc-200 text-[13px]">
        <span className="text-rose-400">🗑️</span>
        {label}
      </div>
      <div className="flex items-center gap-1 text-zinc-500 text-[11px]">
        <span>{count}</span>
        <span>›</span>
      </div>
    </button>
  );
}

function CallList({
  calls,
  onOpen,
  recovered,
}: {
  calls: PhoneCall[];
  onOpen: (id: string) => void;
  recovered: boolean;
}) {
  return (
    <ul className="divide-y divide-zinc-800">
      {calls.map((c) => (
        <li key={c.id}>
          <button
            onClick={() => onOpen(c.id)}
            className="w-full flex items-center gap-3 px-3 py-3 hover:bg-zinc-800/50 text-left"
          >
            <DirectionIcon direction={c.direction} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <span
                  className={`text-[14px] font-semibold truncate ${
                    c.direction === "missed" ? "text-rose-400" : "text-white"
                  }`}
                >
                  {c.contact_name}
                  {c.is_unknown && (
                    <span className="ml-1.5 inline-block text-[10px] uppercase tracking-wider text-amber-400 font-medium">
                      Unknown
                    </span>
                  )}
                  {recovered && (
                    <span className="ml-1.5 inline-block text-[10px] uppercase tracking-wider text-rose-400 font-medium">
                      Recovered
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-zinc-500 shrink-0 ml-2">
                  {c.timestamp.split(" ").slice(-2).join(" ")}
                </span>
              </div>
              <div className="text-zinc-400 text-[12px] truncate mt-0.5">
                {directionLabel(c.direction)}
                {c.duration_seconds !== undefined && c.direction !== "missed" && (
                  <span className="ml-1.5 text-zinc-500">
                    · {formatDuration(c.duration_seconds)}
                  </span>
                )}
                {c.contact_phone && (
                  <span className="ml-1.5 text-zinc-500">· {c.contact_phone}</span>
                )}
                {c.voicemail_transcript && (
                  <span className="ml-1.5 text-blue-400">· 🎙️ Voicemail</span>
                )}
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

function CallDetail({
  call,
  recovered,
  onBack,
}: {
  call: PhoneCall;
  recovered: boolean;
  onBack: () => void;
}) {
  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col text-white">
      <div className="h-12 bg-zinc-900/90 border-b border-zinc-700 flex items-center px-3">
        <button onClick={onBack} className="text-blue-400 text-[14px]">
          ‹ Phone
        </button>
        <div className="flex-1 text-center font-semibold text-[13px]">Call Detail</div>
        <div className="w-12" />
      </div>

      <div className="flex flex-col items-center pt-6 pb-4 bg-zinc-900">
        <div
          className={`w-20 h-20 rounded-full ${call.contact_color ?? "bg-zinc-700"} text-white font-semibold flex items-center justify-center text-2xl mb-3`}
        >
          {call.is_unknown ? "?" : initials(call.contact_name)}
        </div>
        <div className="text-[18px] font-semibold">{call.contact_name}</div>
        {call.contact_phone && (
          <div className="text-zinc-400 text-[12px] mt-0.5">{call.contact_phone}</div>
        )}
        {call.tags?.length ? (
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {call.tags.map((t, i) => (
              <span
                key={i}
                className="text-[9px] uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {recovered && (
        <div className="px-4 py-2 bg-rose-950/30 border-y border-rose-500/20">
          <div className="text-rose-300 text-[11px] font-medium">
            RECOVERED FROM RECENTLY DELETED
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="bg-zinc-800/60 border border-zinc-700 rounded-lg p-3 space-y-1.5 text-[11px] font-mono">
          <div className="text-zinc-500 uppercase tracking-wider text-[10px] mb-1">
            CALL METADATA
          </div>
          <MetaRow label="Direction" value={directionLabel(call.direction)} />
          <MetaRow label="When" value={call.timestamp} />
          {call.duration_seconds !== undefined && call.direction !== "missed" && (
            <MetaRow label="Duration" value={formatDuration(call.duration_seconds)} />
          )}
          {call.contact_phone && <MetaRow label="Number" value={call.contact_phone} />}
        </div>

        {call.voicemail_transcript && (
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-zinc-500 uppercase tracking-wider text-[10px]">
              <span className="text-blue-400">🎙️</span>
              Voicemail · Transcript
            </div>
            <p className="text-[12px] leading-relaxed text-zinc-200 whitespace-pre-wrap">
              {call.voicemail_transcript}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DirectionIcon({ direction }: { direction: CallDirection }) {
  const map: Record<CallDirection, { symbol: string; color: string }> = {
    incoming: { symbol: "↙", color: "text-emerald-400" },
    outgoing: { symbol: "↗", color: "text-blue-400" },
    missed: { symbol: "↙", color: "text-rose-400" },
  };
  const { symbol, color } = map[direction];
  return (
    <div
      className={`shrink-0 w-10 h-10 rounded-full bg-zinc-800 ${color} font-semibold flex items-center justify-center text-lg`}
    >
      {symbol}
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-zinc-500">{label}</span>
      <span className="text-cyan-300 text-right">{value}</span>
    </div>
  );
}

function directionLabel(d: CallDirection): string {
  if (d === "incoming") return "Incoming";
  if (d === "outgoing") return "Outgoing";
  return "Missed";
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
