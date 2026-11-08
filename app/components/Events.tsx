"use client";

import { useState } from "react";
import { useLocalStorage } from "../lib/useLocalStorage";

type CommunityEvent = { id: number; name: string; date: string };

const DEFAULT_EVENTS: CommunityEvent[] = [
  { id: 1, name: "BYD Meetup Nicosia", date: "2026-12-12" },
  { id: 2, name: "Beach Drive Limassol", date: "2027-01-17" },
];

function todayISO() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

export default function Events() {
  const [events, setEvents] = useLocalStorage<CommunityEvent[]>(
    "byd-cyprus:events",
    DEFAULT_EVENTS,
  );
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const today = todayISO();
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((e) => e.date >= today);
  const past = sorted.filter((e) => e.date < today).reverse();

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || !date) {
      setError("Please enter an event name and pick a date.");
      return;
    }
    setEvents([...events, { id: Date.now(), name: trimmed, date }]);
    setName("");
    setDate("");
    setError("");
  };

  const removeEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <section id="events" className="mx-auto w-full max-w-6xl px-5 py-16">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Meet up
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Upcoming events
        </h2>
      </div>

      {upcoming.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted">
          No upcoming events yet. Add the first one below.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <li
              key={event.id}
              className="flex flex-col justify-between gap-6 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/60"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  {formatDate(event.date)}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{event.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => removeEvent(event.id)}
                aria-label={`Remove ${event.name}`}
                className="self-start text-sm text-muted transition-colors hover:text-danger"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {past.length > 0 && (
        <details className="mt-8 rounded-xl border border-border bg-surface/50 p-4">
          <summary className="cursor-pointer text-sm text-muted">
            Past events ({past.length})
          </summary>
          <ul className="mt-3 divide-y divide-border">
            {past.map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between gap-4 py-2 text-sm"
              >
                <span className="text-muted">
                  {event.name} &middot; {formatDate(event.date)}
                </span>
                <button
                  type="button"
                  onClick={() => removeEvent(event.id)}
                  aria-label={`Remove ${event.name}`}
                  className="text-muted hover:text-danger"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}

      <form
        onSubmit={addEvent}
        noValidate
        className="mt-12 rounded-2xl border border-border bg-surface p-6"
      >
        <h3 className="text-lg font-semibold">Add an event</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_200px_auto] sm:items-end">
          <label className="grid gap-1.5 text-sm text-muted">
            Event name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sunset drive in Paphos"
              maxLength={80}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-foreground placeholder:text-muted/60"
            />
          </label>
          <label className="grid gap-1.5 text-sm text-muted">
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-accent-ink transition-opacity hover:opacity-90"
          >
            Add event
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm text-danger">
            {error}
          </p>
        )}
        <p className="mt-4 text-xs text-muted">
          Events are saved in this browser only.
        </p>
      </form>
    </section>
  );
}
