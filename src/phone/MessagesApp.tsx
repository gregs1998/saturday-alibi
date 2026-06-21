import { useState } from "react";
import type { MessagesAppData, PhoneConversation } from "../types";

interface Props {
  data: MessagesAppData;
  onBack: () => void;
}

export default function MessagesApp({ data, onBack }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const all = [...data.conversations, ...(data.recently_deleted ?? [])];
  const open = openId ? all.find((c) => c.id === openId) ?? null : null;
  const isOpenDeleted = open && (data.recently_deleted ?? []).some((c) => c.id === open.id);

  if (open) {
    return (
      <Thread
        conversation={open}
        recovered={!!isOpenDeleted}
        onBack={() => setOpenId(null)}
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col">
      <Header onBack={onBack} title="Messages" trailing={
        <button
          className={`text-[11px] font-medium ${showDeleted ? "text-rose-400" : "text-blue-400"}`}
          onClick={() => setShowDeleted((v) => !v)}
        >
          {showDeleted ? "Inbox" : "Edit"}
        </button>
      } />

      <div className="flex-1 overflow-y-auto">
        {!showDeleted && (
          <>
            <FolderTeaser
              label="Recently Deleted"
              count={data.recently_deleted?.length ?? 0}
              onClick={() => setShowDeleted(true)}
            />
            <ConversationList conversations={data.conversations} onOpen={setOpenId} />
          </>
        )}
        {showDeleted && (
          <>
            <div className="px-4 py-2 bg-rose-950/30 border-y border-rose-500/20">
              <div className="text-rose-300 text-[11px] font-medium">RECENTLY DELETED · FORENSIC RECOVERY</div>
              <div className="text-rose-400/70 text-[10px] mt-0.5">Messages the user removed are restored below.</div>
            </div>
            <ConversationList
              conversations={data.recently_deleted ?? []}
              onOpen={setOpenId}
              deleted
            />
            {(data.recently_deleted ?? []).length === 0 && (
              <div className="p-6 text-center text-zinc-500 text-sm">No deleted threads.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Header({
  onBack,
  title,
  trailing,
}: {
  onBack: () => void;
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="h-12 bg-zinc-900/90 backdrop-blur border-b border-zinc-700 flex items-center justify-between px-3 text-white">
      <button onClick={onBack} className="text-blue-400 text-[14px] flex items-center gap-1">
        <span>‹</span>
      </button>
      <div className="font-semibold">{title}</div>
      <div className="min-w-[40px] text-right">{trailing}</div>
    </div>
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

function ConversationList({
  conversations,
  onOpen,
  deleted,
}: {
  conversations: PhoneConversation[];
  onOpen: (id: string) => void;
  deleted?: boolean;
}) {
  return (
    <ul className="divide-y divide-zinc-800">
      {conversations.map((c) => {
        const last = c.messages[c.messages.length - 1];
        return (
          <li key={c.id}>
            <button
              onClick={() => onOpen(c.id)}
              className="w-full flex items-center gap-3 px-3 py-3 hover:bg-zinc-800/50 text-left"
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-full ${c.contact_color ?? "bg-zinc-700"} text-white font-semibold flex items-center justify-center`}
              >
                {c.is_unknown ? "?" : initials(c.contact_name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <span className="text-white text-[14px] font-semibold truncate">
                    {c.contact_name}
                    {c.is_unknown && (
                      <span className="ml-1.5 inline-block text-[10px] uppercase tracking-wider text-amber-400 font-medium">
                        Unknown
                      </span>
                    )}
                    {deleted && (
                      <span className="ml-1.5 inline-block text-[10px] uppercase tracking-wider text-rose-400 font-medium">
                        Recovered
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-zinc-500 shrink-0 ml-2">
                    {last?.timestamp.split(" ").slice(-1)[0]}
                  </span>
                </div>
                <div className="text-zinc-400 text-[12px] truncate mt-0.5">
                  {last?.text}
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Thread({
  conversation,
  recovered,
  onBack,
}: {
  conversation: PhoneConversation;
  recovered: boolean;
  onBack: () => void;
}) {
  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col">
      <div className="h-14 bg-zinc-900/90 backdrop-blur border-b border-zinc-700 flex items-center px-3 text-white">
        <button onClick={onBack} className="text-blue-400 text-[14px] mr-2">
          ‹ Messages
        </button>
        <div className="flex-1 text-center">
          <div className="font-semibold text-[13px]">
            {conversation.contact_name}
            {conversation.is_unknown && (
              <span className="text-amber-400 ml-1 text-[10px] uppercase">Unknown</span>
            )}
          </div>
          {conversation.contact_phone && (
            <div className="text-zinc-500 text-[10px]">{conversation.contact_phone}</div>
          )}
        </div>
        <div className="w-12" />
      </div>

      {recovered && (
        <div className="px-4 py-2 bg-rose-950/40 border-b border-rose-500/20 text-rose-300 text-[10px] tracking-wider uppercase">
          ● Recovered from deleted storage
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {conversation.messages.map((m, i) => {
          const showTime =
            i === 0 || conversation.messages[i - 1].timestamp !== m.timestamp;
          return (
            <div key={m.id}>
              {showTime && (
                <div className="text-center text-zinc-500 text-[10px] my-2 font-medium">
                  {m.timestamp}
                </div>
              )}
              <div className={`flex ${m.from === "owner" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-1.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap
                    ${m.from === "owner" ? "bg-blue-500 text-white rounded-br-md" : "bg-zinc-700 text-zinc-100 rounded-bl-md"}`}
                >
                  {m.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
