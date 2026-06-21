import { useState } from "react";
import type { AppId } from "./types";
import { CASE } from "./data";
import IPhoneShell from "./phone/IPhoneShell";
import HomeScreen from "./phone/HomeScreen";
import MessagesApp from "./phone/MessagesApp";
import PhotosApp from "./phone/PhotosApp";
import CallsApp from "./phone/CallsApp";
import BrowserApp from "./phone/BrowserApp";
import NotesApp from "./phone/NotesApp";

type View = { kind: "home" } | { kind: "app"; app: AppId };

export default function App() {
  const [view, setView] = useState<View>({ kind: "home" });
  const goHome = () => setView({ kind: "home" });
  const openApp = (app: AppId) => setView({ kind: "app", app });
  const apps = CASE.phone.apps;

  return (
    <div className="min-h-full bg-gradient-to-b from-slate-950 via-slate-900 to-black text-zinc-200">
      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Header / case brief */}
        <header className="mb-8 text-center">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-400/80">
            Mobile Forensics · Training Archive
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            {CASE.title}
          </h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          {/* Briefing panel */}
          <section className="order-2 lg:order-1 space-y-4">
            <div className="rounded-2xl border border-cyan-500/15 bg-slate-900/60 p-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-300/80 mb-2">
                ● Case Brief
              </div>
              <p className="text-[14px] leading-relaxed text-zinc-300">{CASE.brief}</p>
            </div>

            <div className="rounded-2xl border border-amber-500/15 bg-slate-900/60 p-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-300/80 mb-2">
                ● How to Investigate
              </div>
              <p className="text-[14px] leading-relaxed text-zinc-300">
                {CASE.instructions}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-700/40 bg-slate-900/40 p-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                ● Your Task
              </div>
              <p className="text-[14px] leading-relaxed text-zinc-400">
                Examine the phone on the right. Open every app — and check each{" "}
                <span className="text-rose-300">Recently Deleted</span> folder. When you've
                gathered the evidence, decide for yourself:{" "}
                <span className="text-white font-medium">does Dana's alibi hold up?</span>
              </p>
            </div>
          </section>

          {/* The phone */}
          <section className="order-1 lg:order-2 flex justify-center">
            <IPhoneShell device={CASE.phone.device}>
              {view.kind === "home" && <HomeScreen apps={apps} onOpen={openApp} />}
              {view.kind === "app" && view.app === "messages" && apps.messages && (
                <MessagesApp data={apps.messages} onBack={goHome} />
              )}
              {view.kind === "app" && view.app === "calls" && apps.calls && (
                <CallsApp data={apps.calls} onBack={goHome} />
              )}
              {view.kind === "app" && view.app === "photos" && apps.photos && (
                <PhotosApp data={apps.photos} onBack={goHome} />
              )}
              {view.kind === "app" && view.app === "browser" && apps.browser && (
                <BrowserApp data={apps.browser} onBack={goHome} />
              )}
              {view.kind === "app" && view.app === "notes" && apps.notes && (
                <NotesApp data={apps.notes} onBack={goHome} />
              )}
            </IPhoneShell>
          </section>
        </div>

        <footer className="mt-12 text-center text-[11px] text-zinc-600 font-mono">
          Training scenario · fictional town of Brindle Falls · no real data.
        </footer>
      </div>
    </div>
  );
}
