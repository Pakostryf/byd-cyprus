import Navbar from "./components/Navbar";
import Events from "./components/Events";
import Store from "./components/Store";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section
          id="home"
          className="relative overflow-hidden border-b border-border"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(25,211,162,0.18),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-6xl px-5 py-24 text-center sm:py-32">
            <p className="mx-auto w-fit rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
              Cyprus&apos; community for BYD drivers
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
              BYD Cyprus{" "}
              <span className="text-accent">Community</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
              Meet fellow owners, join drives across the island and pick up
              accessories for your car.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#events"
                className="rounded-lg bg-accent px-5 py-3 font-semibold text-accent-ink transition-opacity hover:opacity-90"
              >
                See events
              </a>
              <a
                href="#store"
                className="rounded-lg border border-border px-5 py-3 font-semibold transition-colors hover:bg-surface-2"
              >
                Browse accessories
              </a>
            </div>
          </div>
        </section>

        <Events />
        <Store />
      </main>

      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted">
        <p>BYD Cyprus Community &copy; {new Date().getFullYear()}</p>
        <p className="mt-1 text-xs">
          An unofficial fan community, not affiliated with BYD.
        </p>
      </footer>
    </>
  );
}
