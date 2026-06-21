import { useState } from "react";
import type { NotesAppData, Note } from "../types";

interface Props {
  data: NotesAppData;
  onBack: () => void;
}

type View = { kind: "folders" } | { kind: "folder"; folder: string };

const DEFAULT_FOLDER = "Notes";

export default function NotesApp({ data, onBack }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [view, setView] = useState<View>(() => {
    const folders = collectFolders(data.notes);
    // If there's only one folder, skip the folder list and go straight in.
    return folders.length <= 1
      ? { kind: "folder", folder: folders[0] ?? DEFAULT_FOLDER }
      : { kind: "folders" };
  });

  const open = openId ? data.notes.find((n) => n.id === openId) ?? null : null;
  if (open) {
    return <NoteDetail note={open} onBack={() => setOpenId(null)} />;
  }

  if (view.kind === "folders") {
    return (
      <FolderList
        notes={data.notes}
        onBack={onBack}
        onOpenFolder={(folder) => setView({ kind: "folder", folder })}
      />
    );
  }

  const folders = collectFolders(data.notes);
  const inFolder = data.notes.filter(
    (n) => (n.folder ?? DEFAULT_FOLDER) === view.folder,
  );
  const showBackToFolders = folders.length > 1;

  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col">
      <div className="h-12 bg-zinc-900/90 border-b border-zinc-700 flex items-center justify-between px-3 text-white">
        <button
          onClick={() =>
            showBackToFolders ? setView({ kind: "folders" }) : onBack()
          }
          className="text-amber-400 text-[14px]"
        >
          ‹{showBackToFolders ? " Folders" : ""}
        </button>
        <div className="font-semibold">{view.folder}</div>
        <div className="w-6" />
      </div>

      <div className="px-3 py-2 text-amber-300/80 text-[12px] uppercase tracking-wider font-medium">
        {inFolder.length} Note{inFolder.length === 1 ? "" : "s"}
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-zinc-800">
          {inFolder.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => setOpenId(n.id)}
                className="w-full text-left px-4 py-3 hover:bg-zinc-800/50"
              >
                <div className="text-white text-[13px] font-semibold">
                  {n.title}
                </div>
                <div className="flex items-baseline gap-2 mt-1 text-[11px]">
                  <span className="text-zinc-500">{n.modified_at ?? ""}</span>
                  <span className="text-zinc-600 truncate">
                    {n.body.split("\n")[0]}
                  </span>
                </div>
              </button>
            </li>
          ))}
          {inFolder.length === 0 && (
            <li className="p-6 text-center text-zinc-500 text-sm">
              No notes in this folder.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function FolderList({
  notes,
  onBack,
  onOpenFolder,
}: {
  notes: Note[];
  onBack: () => void;
  onOpenFolder: (folder: string) => void;
}) {
  const folders = collectFolders(notes);
  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col">
      <div className="h-12 bg-zinc-900/90 border-b border-zinc-700 flex items-center justify-between px-3 text-white">
        <button onClick={onBack} className="text-amber-400 text-[14px]">
          ‹
        </button>
        <div className="font-semibold">Folders</div>
        <div className="w-6" />
      </div>
      <ul className="flex-1 overflow-y-auto divide-y divide-zinc-800">
        {folders.map((f) => {
          const count = notes.filter(
            (n) => (n.folder ?? DEFAULT_FOLDER) === f,
          ).length;
          return (
            <li key={f}>
              <button
                onClick={() => onOpenFolder(f)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800/50 text-left"
              >
                <div className="flex items-center gap-2.5 text-white text-[14px]">
                  <span className="text-amber-400 text-[16px]">📁</span>
                  {f}
                </div>
                <div className="flex items-center gap-1 text-zinc-500 text-[11px]">
                  <span>{count}</span>
                  <span>›</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function collectFolders(notes: Note[]): string[] {
  const seen = new Set<string>();
  for (const n of notes) seen.add(n.folder ?? DEFAULT_FOLDER);
  // Default folder first if present, then alphabetical.
  const result = [...seen].sort();
  if (result.includes(DEFAULT_FOLDER)) {
    return [DEFAULT_FOLDER, ...result.filter((f) => f !== DEFAULT_FOLDER)];
  }
  return result;
}

function NoteDetail({ note, onBack }: { note: Note; onBack: () => void }) {
  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col text-white">
      <div className="h-12 bg-zinc-900/90 border-b border-zinc-700 flex items-center px-3">
        <button onClick={onBack} className="text-amber-400 text-[14px]">
          ‹ Notes
        </button>
        <div className="flex-1 text-center">
          {note.folder && (
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider">
              {note.folder}
            </span>
          )}
        </div>
        <div className="w-12" />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-white font-semibold text-[18px] leading-tight">{note.title}</div>
        {note.modified_at && (
          <div className="text-zinc-500 text-[11px] mt-1">{note.modified_at}</div>
        )}
        <pre className="mt-3 text-zinc-100 font-sans text-[13px] leading-relaxed whitespace-pre-wrap break-words">
          {note.body}
        </pre>
      </div>
    </div>
  );
}
