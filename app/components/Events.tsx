import { events } from "../data/events";

function todayISO() {
  // Cyprus time, so events switch to "past" at local midnight.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Nicosia",
  }).format(new Date());
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
  const today = todayISO();
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((e) => e.date >= today);
  const past = sorted.filter((e) => e.date < today).reverse();

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
          No upcoming events right now. Check back soon!
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <li
              key={event.id}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/60"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                {formatDate(event.date)}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{event.name}</h3>
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
              <li key={event.id} className="py-2 text-sm text-muted">
                {event.name} &middot; {formatDate(event.date)}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
