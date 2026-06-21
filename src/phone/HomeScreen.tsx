import type { PhoneData, AppId } from "../types";

interface Props {
  apps: NonNullable<PhoneData["apps"]>;
  onOpen: (app: AppId) => void;
}

interface AppDef {
  id: AppId;
  name: string;
  icon: string;
  gradient: string;
  badge?: number;
}

export default function HomeScreen({ apps, onOpen }: Props) {
  const defs: AppDef[] = [];
  if (apps.messages) {
    const badge =
      apps.messages.conversations.length + (apps.messages.recently_deleted?.length ?? 0);
    defs.push({
      id: "messages",
      name: "Messages",
      icon: "💬",
      gradient: "from-emerald-400 to-emerald-600",
      badge,
    });
  }
  if (apps.calls) {
    const missed = apps.calls.calls.filter((c) => c.direction === "missed").length;
    defs.push({
      id: "calls",
      name: "Phone",
      icon: "📞",
      gradient: "from-emerald-500 to-green-700",
      badge: missed,
    });
  }
  if (apps.photos) {
    defs.push({
      id: "photos",
      name: "Photos",
      icon: "🖼️",
      gradient: "from-pink-400 via-violet-500 to-indigo-600",
    });
  }
  if (apps.browser) {
    defs.push({
      id: "browser",
      name: "Browser",
      icon: "🧭",
      gradient: "from-sky-400 to-blue-700",
    });
  }
  if (apps.notes) {
    defs.push({
      id: "notes",
      name: "Notes",
      icon: "📝",
      gradient: "from-amber-300 to-yellow-500",
    });
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-slate-900 to-black flex flex-col">
      {/* Top spacer for status bar */}
      <div className="px-6 pt-4 text-white/90 text-center">
        <div className="text-5xl font-light tracking-tight">10:15</div>
        <div className="text-sm uppercase tracking-[0.2em] opacity-80 mt-1">
          Sunday · Brindle Falls
        </div>
      </div>

      <div className="flex-1 px-5 pt-6 grid grid-cols-4 gap-x-4 gap-y-5 content-start">
        {defs.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpen(app.id)}
            className="flex flex-col items-center gap-1 focus:outline-none active:scale-95 transition-transform"
          >
            <div
              className={`relative w-14 h-14 rounded-[14px] bg-gradient-to-br ${app.gradient} shadow-lg flex items-center justify-center text-2xl`}
            >
              {app.icon}
              {app.badge !== undefined && app.badge > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-rose-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center border-2 border-zinc-900">
                  {app.badge}
                </span>
              )}
            </div>
            <span className="text-white text-[11px]">{app.name}</span>
          </button>
        ))}
      </div>

      <div className="text-center text-white/40 text-[10px] pb-8 px-4">
        Tap an app to investigate. Look for anything unusual.
      </div>
    </div>
  );
}
