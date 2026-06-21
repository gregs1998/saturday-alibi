import { useState } from "react";
import type { PhotosAppData, Photo } from "../types";

interface Props {
  data: PhotosAppData;
  onBack: () => void;
}

export default function PhotosApp({ data, onBack }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const all = [...data.photos, ...(data.recently_deleted ?? [])];
  const open = openId ? all.find((p) => p.id === openId) ?? null : null;
  const isOpenDeleted = open && (data.recently_deleted ?? []).some((p) => p.id === open.id);

  if (open) {
    return (
      <PhotoDetail
        photo={open}
        recovered={!!isOpenDeleted}
        onBack={() => setOpenId(null)}
      />
    );
  }

  const visible = showDeleted ? data.recently_deleted ?? [] : data.photos;

  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col">
      <div className="h-12 bg-zinc-900/90 border-b border-zinc-700 flex items-center justify-between px-3 text-white">
        <button onClick={onBack} className="text-blue-400 text-[14px]">
          ‹
        </button>
        <div className="font-semibold">Photos</div>
        <button
          className={`text-[11px] font-medium ${showDeleted ? "text-rose-400" : "text-blue-400"}`}
          onClick={() => setShowDeleted((v) => !v)}
        >
          {showDeleted ? "Library" : "Edit"}
        </button>
      </div>

      {showDeleted && (
        <div className="px-4 py-2 bg-rose-950/30 border-y border-rose-500/20">
          <div className="text-rose-300 text-[11px] font-medium">
            RECENTLY DELETED · FORENSIC RECOVERY
          </div>
          <div className="text-rose-400/70 text-[10px] mt-0.5">
            Photos the user removed are restored below.
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-1">
        {!showDeleted && (data.recently_deleted?.length ?? 0) > 0 && (
          <button
            onClick={() => setShowDeleted(true)}
            className="w-full flex items-center justify-between px-3 py-2 mb-1 bg-zinc-800/50 border border-zinc-700/50 rounded hover:bg-zinc-800 text-left"
          >
            <div className="flex items-center gap-2 text-zinc-200 text-[12px]">
              <span className="text-rose-400">🗑️</span>
              Recently Deleted
            </div>
            <div className="flex items-center gap-1 text-zinc-500 text-[11px]">
              <span>{data.recently_deleted?.length ?? 0}</span>
              <span>›</span>
            </div>
          </button>
        )}
        <div className="grid grid-cols-3 gap-0.5">
          {visible.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className={`aspect-square bg-gradient-to-br ${p.thumbnail_gradient ?? "from-zinc-700 to-zinc-800"} flex items-center justify-center text-3xl hover:opacity-90 relative`}
            >
              {p.emoji ?? "📷"}
              {showDeleted && (
                <span className="absolute top-1 right-1 text-[8px] uppercase tracking-wider bg-rose-500/80 text-white px-1 py-0.5 rounded">
                  Del
                </span>
              )}
            </button>
          ))}
        </div>
        {visible.length === 0 && (
          <div className="p-6 text-center text-zinc-500 text-sm">No photos.</div>
        )}
      </div>
    </div>
  );
}

function PhotoDetail({
  photo,
  recovered,
  onBack,
}: {
  photo: Photo;
  recovered: boolean;
  onBack: () => void;
}) {
  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col text-white">
      <div className="h-12 bg-zinc-900/90 border-b border-zinc-700 flex items-center justify-between px-3">
        <button onClick={onBack} className="text-blue-400 text-[14px]">
          ‹ Photos
        </button>
        <div className="font-semibold text-[12px]">{photo.title ?? "Photo"}</div>
        <div className="w-12" />
      </div>

      {recovered && (
        <div className="px-4 py-1.5 bg-rose-950/30 border-b border-rose-500/20">
          <div className="text-rose-300 text-[10px] font-medium uppercase tracking-wider">
            Recovered from Recently Deleted
          </div>
        </div>
      )}

      <div
        className={`h-[260px] bg-gradient-to-br ${photo.thumbnail_gradient ?? "from-zinc-700 to-zinc-800"} flex items-center justify-center text-7xl`}
      >
        {photo.emoji ?? "📷"}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {photo.caption && (
          <div className="text-zinc-200 text-[13px] leading-relaxed">{photo.caption}</div>
        )}
        {photo.metadata && (
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-lg p-3 space-y-1.5 text-[11px] font-mono">
            <div className="text-zinc-500 uppercase tracking-wider text-[10px] mb-1">
              EXIF / METADATA
            </div>
            {photo.metadata.taken_at && (
              <MetaRow label="Taken" value={photo.metadata.taken_at} />
            )}
            {photo.metadata.device && (
              <MetaRow label="Device" value={photo.metadata.device} />
            )}
            {photo.metadata.location && (
              <MetaRow label="Place" value={photo.metadata.location} />
            )}
            {photo.metadata.coordinates && (
              <MetaRow label="GPS" value={photo.metadata.coordinates} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-zinc-500">{label}</span>
      <span className="text-cyan-300">{value}</span>
    </div>
  );
}
