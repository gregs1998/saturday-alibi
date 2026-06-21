import type { ReactNode } from "react";
import type { PhoneData } from "../types";

interface Props {
  device: PhoneData["device"];
  children: ReactNode;
}

/**
 * Visual iPhone frame: black bezel, dynamic island, status bar, home indicator.
 * The `children` slot is the active app or home screen.
 */
export default function IPhoneShell({ device, children }: Props) {
  const time = device.status_time ?? "09:14";
  const carrier = device.carrier ?? "PineNet Mobile";
  const battery = device.battery ?? 52;

  return (
    <div className="flex flex-col items-center">
      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-2">
        EVIDENCE · MOBILE DEVICE · OWNER: {device.owner_name}
      </div>

      {/* Bezel */}
      <div className="relative w-[340px] h-[700px] bg-black rounded-[44px] p-2 shadow-[0_0_30px_rgba(34,211,238,0.15)] border border-zinc-700">
        {/* Inner screen */}
        <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-zinc-900 flex flex-col">
          {/* Dynamic island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[26px] bg-black rounded-full z-30" />

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 text-white text-[12px] font-semibold z-20">
            <span>{time}</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[10px]">{carrier}</span>
              <BatteryIcon pct={battery} />
            </span>
          </div>

          {/* App content area */}
          <div className="relative flex-1 mt-10 overflow-hidden">{children}</div>

          {/* Home indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/80 rounded-full z-20 pointer-events-none" />
        </div>
      </div>

      <div className="text-[10px] font-mono text-zinc-600 mt-2">
        {device.model ?? "iPhone (sim)"}
      </div>
    </div>
  );
}

function BatteryIcon({ pct }: { pct: number }) {
  const color =
    pct >= 20 ? "bg-white" : pct >= 10 ? "bg-amber-400" : "bg-rose-500";
  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-[10px]">{pct}%</span>
      <span className="inline-block w-6 h-3 border border-white/80 rounded-sm relative">
        <span
          className={`absolute left-0.5 top-0.5 bottom-0.5 ${color} rounded-[1px]`}
          style={{ width: `calc(${Math.max(5, Math.min(100, pct))}% - 4px)` }}
        />
        <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-white/80 rounded-sm" />
      </span>
    </span>
  );
}
