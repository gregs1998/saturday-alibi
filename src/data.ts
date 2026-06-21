import type { PhoneData } from "./types";

/**
 * "The Saturday Alibi" — Practice Case #1.
 *
 * Dana Brisco, a clerk at Hartwell Hardware in the town of Brindle Falls,
 * called in sick last Saturday. Their manager suspects Dana faked it to catch
 * the sold-out Aurora Static concert. Dana volunteered their personal phone to
 * clear their name. No single app proves it — the learner must cross-reference
 * Photos (EXIF location), Messages, the call log, Browser, and Notes.
 *
 * This is a faithful copy of the original training task's data, decoupled from
 * the camp game so it can run as a static site.
 */
export const CASE: {
  title: string;
  brief: string;
  instructions: string;
  phone: PhoneData;
} = {
  title: "The Saturday Alibi",
  brief:
    "Practice Case #1 — Mobile Forensics. Dana Brisco, a clerk at Hartwell Hardware in the town of Brindle Falls, called in sick last Saturday. Their manager suspects Dana faked it to catch the sold-out Aurora Static concert. Dana volunteered their personal phone to clear their name. No single app proves it — open Photos, Messages, Phone, Browser, and Notes, and put the pieces together.",
  instructions:
    "This is a full phone. Don't stop at the first app. Photos (and Recently Deleted) show WHERE someone was; Messages and Notes show INTENT; the Phone app's call log shows WHO they called and WHEN; the Browser shows what they were planning. Cross-reference at least three apps before you draw a conclusion.",
  phone: {
    device: {
      kind: "iphone",
      owner_name: "Dana Brisco (Clerk · Hartwell Hardware)",
      model: "iPhone 13 · Personal Device",
      status_time: "10:15",
      carrier: "PineNet Mobile",
      battery: 52,
    },
    apps: {
      photos: {
        photos: [
          {
            id: "ph-soup",
            title: "Soup",
            emoji: "🍜",
            thumbnail_gradient: "from-amber-400 to-orange-500",
            caption: "Bowl of soup on a kitchen counter. Looks like a sick day at home.",
            metadata: {
              taken_at: "Saturday 09:08",
              device: "iPhone 13",
              location: "Brindle Falls · Brisco Apartment",
              coordinates: "41.6021° N, 87.4011° W",
            },
          },
          {
            id: "ph-crowd",
            title: "Crowd",
            emoji: "🎸",
            thumbnail_gradient: "from-fuchsia-500 to-purple-700",
            caption: "Packed standing crowd, stage lights, a guitarist mid-solo.",
            metadata: {
              taken_at: "Saturday 21:38",
              device: "iPhone 13",
              location: "Brindle Falls Arena",
              coordinates: "41.5774° N, 87.3520° W",
            },
          },
          {
            id: "ph-brunch",
            title: "Sunday brunch",
            emoji: "🥞",
            thumbnail_gradient: "from-yellow-300 to-amber-500",
            caption: "Pancakes and coffee at a diner.",
            metadata: {
              taken_at: "Sunday 11:24",
              device: "iPhone 13",
              location: "The Copper Kettle Diner",
              coordinates: "41.6044° N, 87.3990° W",
            },
          },
        ],
        recently_deleted: [
          {
            id: "ph-del-ticket",
            title: "Ticket",
            emoji: "🎫",
            thumbnail_gradient: "from-rose-500 to-red-700",
            caption:
              "Screenshot of a mobile ticket: 'AURORA STATIC · Brindle Falls Arena · Sat 8:00 PM · GA PIT'.",
            metadata: {
              taken_at: "Saturday 19:46",
              device: "iPhone 13",
              location: "Brindle Falls Arena",
              coordinates: "41.5774° N, 87.3520° W",
            },
          },
          {
            id: "ph-del-selfie",
            title: "Selfie",
            emoji: "🤳",
            thumbnail_gradient: "from-pink-400 to-rose-600",
            caption:
              "Dana and a friend grinning, glow sticks and stage lights behind them.",
            metadata: {
              taken_at: "Saturday 20:31",
              device: "iPhone 13",
              location: "Brindle Falls Arena",
              coordinates: "41.5774° N, 87.3520° W",
            },
          },
        ],
      },
      messages: {
        conversations: [
          {
            id: "msg-mom",
            contact_name: "Mom",
            contact_color: "bg-emerald-500",
            messages: [
              { id: "mm1", from: "contact", text: "Feeling any better, hon?", timestamp: "Saturday 12:10 PM" },
              { id: "mm2", from: "owner", text: "a little! just resting 🤒", timestamp: "Saturday 12:22 PM" },
              { id: "mm3", from: "contact", text: "Good. Drink fluids!", timestamp: "Saturday 12:23 PM" },
            ],
          },
          {
            id: "msg-reggie",
            contact_name: "Reggie",
            contact_color: "bg-sky-500",
            messages: [
              { id: "mr1", from: "contact", text: "you still in for aurora static saturday???", timestamp: "Thursday 7:41 PM" },
              { id: "mr2", from: "owner", text: "obviously. already told hartwell i've got the flu 🤧", timestamp: "Thursday 7:44 PM" },
              { id: "mr3", from: "contact", text: "LMAO legend. GA pit?", timestamp: "Thursday 7:45 PM" },
              { id: "mr4", from: "owner", text: "pit baby. but DON'T post any pics til monday — hartwell follows me on here", timestamp: "Thursday 7:46 PM" },
              { id: "mr5", from: "contact", text: "say less 🤐", timestamp: "Thursday 7:47 PM" },
            ],
          },
        ],
        recently_deleted: [
          {
            id: "msg-del-reggie",
            contact_name: "Reggie",
            contact_color: "bg-sky-500",
            messages: [
              { id: "md1", from: "owner", text: "MADE IT IN the pit is insane 🔥", timestamp: "Saturday 8:04 PM" },
              { id: "md2", from: "contact", text: "jealous!! send pics", timestamp: "Saturday 8:06 PM" },
              { id: "md3", from: "owner", text: "after monday lol. if hartwell sees these i'm cooked", timestamp: "Saturday 8:07 PM" },
            ],
          },
        ],
      },
      calls: {
        calls: [
          {
            id: "call-hartwell",
            contact_name: "Hartwell Hardware (Store)",
            contact_phone: "(312) 555-7012",
            direction: "outgoing",
            duration_seconds: 41,
            timestamp: "Saturday 8:03 AM",
            contact_color: "bg-amber-600",
            tags: ["Work"],
          },
          {
            id: "call-reggie-eve",
            contact_name: "Reggie",
            contact_phone: "(312) 555-2289",
            direction: "outgoing",
            duration_seconds: 168,
            timestamp: "Saturday 6:12 PM",
            contact_color: "bg-sky-500",
          },
          {
            id: "call-mom",
            contact_name: "Mom",
            contact_phone: "(312) 555-4480",
            direction: "incoming",
            duration_seconds: 393,
            timestamp: "Friday 7:30 PM",
            contact_color: "bg-emerald-500",
          },
          {
            id: "call-pizza",
            contact_name: "Tower Pizza",
            contact_phone: "(312) 555-9090",
            direction: "outgoing",
            duration_seconds: 84,
            timestamp: "Sunday 6:40 PM",
            contact_color: "bg-rose-500",
          },
        ],
      },
      browser: {
        default_view: "search",
        search_history: [
          { id: "bs1", query: "aurora static setlist tonight", timestamp: "Saturday 10:02 PM", engine: "QuackQuackGo" },
          { id: "bs2", query: "how to sound congested and stuffy on the phone", timestamp: "Friday 9:48 PM", engine: "QuackQuackGo" },
          { id: "bs3", query: "last minute aurora static tickets brindle falls arena", timestamp: "Thursday 7:20 PM", engine: "QuackQuackGo" },
          { id: "bs4", query: "does hartwell hardware require a doctor's note for sick days", timestamp: "Thursday 7:18 PM", engine: "QuackQuackGo" },
          { id: "bs5", query: "tower pizza hours", timestamp: "Sunday 6:35 PM", engine: "QuackQuackGo" },
        ],
        visited_history: [
          { id: "bv1", url: "https://tixresale.example/aurora-static-brindle-falls", title: "Aurora Static · Brindle Falls Arena · Resale Tickets", timestamp: "Thursday 7:22 PM", icon: "🎫" },
          { id: "bv2", url: "https://brindlefallsarena.example/seating", title: "Brindle Falls Arena — GA Pit Info", timestamp: "Thursday 7:25 PM", icon: "🏟️" },
        ],
        open_tabs: [
          { id: "bt1", url: "https://tixresale.example/my-tickets", title: "My Tickets · TixResale", icon: "🎫" },
        ],
      },
      notes: {
        notes: [
          {
            id: "nt-grocery",
            title: "grocery",
            folder: "Notes",
            modified_at: "Friday",
            body: "- oat milk\n- bananas\n- cough drops (for the 'flu' lol)\n- pizza rolls",
          },
          {
            id: "nt-satplan",
            title: "SAT",
            folder: "Notes",
            modified_at: "Friday 10:01 PM",
            body: "saturday plan:\n- call hartwell ~8am, sound sick (stuffy voice)\n- nap, leave by 5\n- meet reggie 6 at the arena\n- GA PIT — Aurora Static, doors 7, show 8\n- DO NOT tag location, DO NOT post til monday\n- uber home, don't drive",
          },
        ],
      },
    },
  },
};
