// ---------------------------------------------------------------------------
// Phone (iPhone) data model — a trimmed, standalone copy of the types used by
// the original camp game's "device examiner" mini-game. Only the phone apps
// are included here (Messages, Photos, Phone/Calls, Browser, Notes).
// ---------------------------------------------------------------------------

export type AppId = "messages" | "photos" | "notes" | "calls" | "browser";

export interface PhoneData {
  device: {
    kind: "iphone";
    owner_name: string;
    model?: string;
    /** Display time shown in the status bar. */
    status_time?: string;
    /** Carrier name shown in the status bar. */
    carrier?: string;
    /** Initial battery percentage. */
    battery?: number;
  };
  apps: {
    messages?: MessagesAppData;
    photos?: PhotosAppData;
    notes?: NotesAppData;
    calls?: CallsAppData;
    browser?: BrowserAppData;
  };
}

// Messages ------------------------------------------------------------------

export interface MessagesAppData {
  conversations: PhoneConversation[];
  /** Conversations the user "deleted" — appear in a Recently Deleted folder. */
  recently_deleted?: PhoneConversation[];
}

export interface PhoneConversation {
  id: string;
  contact_name: string;
  contact_phone?: string;
  /** Avatar color hint (any tailwind class, e.g. "bg-rose-500"). */
  contact_color?: string;
  is_unknown?: boolean;
  tags?: string[];
  messages: PhoneMessage[];
}

export interface PhoneMessage {
  id: string;
  /** "owner" = right-aligned blue bubbles. "contact" = left-aligned gray bubbles. */
  from: "owner" | "contact";
  text: string;
  timestamp: string;
}

// Photos --------------------------------------------------------------------

export interface PhotosAppData {
  photos: Photo[];
  /** Photos the user "deleted" — appear in a Recently Deleted album. */
  recently_deleted?: Photo[];
}

export interface Photo {
  id: string;
  title?: string;
  emoji?: string;
  /** Background gradient class (tailwind) for the thumbnail. */
  thumbnail_gradient?: string;
  caption?: string;
  metadata?: {
    taken_at?: string;
    location?: string;
    device?: string;
    coordinates?: string;
  };
}

// Notes ---------------------------------------------------------------------

export interface NotesAppData {
  notes: Note[];
}

export interface Note {
  id: string;
  title: string;
  body: string;
  modified_at?: string;
  /** Notes without a folder fall into "Notes". */
  folder?: string;
}

// Calls / Phone -------------------------------------------------------------

export interface CallsAppData {
  calls: PhoneCall[];
  recently_deleted?: PhoneCall[];
}

export type CallDirection = "incoming" | "outgoing" | "missed";

export interface PhoneCall {
  id: string;
  contact_name: string;
  contact_phone?: string;
  direction: CallDirection;
  /** Call length in seconds. 0 / undefined for missed. */
  duration_seconds?: number;
  timestamp: string;
  is_unknown?: boolean;
  contact_color?: string;
  tags?: string[];
  voicemail_transcript?: string;
}

// Browser -------------------------------------------------------------------

export interface BrowserAppData {
  search_history?: BrowserSearch[];
  visited_history?: BrowserVisit[];
  open_tabs?: BrowserTab[];
  bookmarks?: BrowserBookmark[];
  /** Default landing screen. Defaults to "search". */
  default_view?: BrowserView;
}

export type BrowserView = "search" | "history" | "tabs" | "bookmarks";

export interface BrowserSearch {
  id: string;
  query: string;
  timestamp: string;
  engine?: string;
}

export interface BrowserVisit {
  id: string;
  url: string;
  title: string;
  timestamp: string;
  icon?: string;
}

export interface BrowserTab {
  id: string;
  url: string;
  title: string;
  icon?: string;
}

export interface BrowserBookmark {
  id: string;
  url: string;
  title: string;
  folder?: string;
  icon?: string;
}
