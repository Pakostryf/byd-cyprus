"use client";

import { useLocalStorage } from "../lib/useLocalStorage";

type Product = { id: string; name: string; description: string; price: number };

const PRODUCTS: Product[] = [
  {
    id: "floor-mats",
    name: "BYD Floor Mats",
    description: "Custom-fit protection for your cabin floor.",
    price: 50,
  },
  {
    id: "charging-cable",
    name: "BYD Charging Cable",
    description: "Type 2 cable for home and public charging.",
    price: 120,
  },
];

type Cart = Record<string, number>;
const EMPTY_CART: Cart = {};

const euro = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

export default function Store() {
  const [cart, setCart] = useLocalStorage<Cart>("byd-cyprus:cart", EMPTY_CART);

  const setQty = (id: string, qty: number) => {
    const next = { ...cart };
    if (qty <= 0) delete next[id];
    else next[id] = Math.min(qty, 99);
    setCart(next);
  };

  const lines = PRODUCTS.filter((p) => cart[p.id] > 0).map((p) => ({
    ...p,
    qty: cart[p.id],
  }));
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  return (
    <section
      id="store"
      className="border-y border-border bg-surface/40 py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-5">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Shop
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          BYD accessories store
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {PRODUCTS.map((product) => (
              <li
                key={product.id}
                className="flex flex-col justify-between gap-6 rounded-xl border border-border bg-surface p-5"
              >
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {product.description}
                  </p>
                  <p className="mt-4 text-2xl font-semibold">
                    {euro.format(product.price)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setQty(product.id, (cart[product.id] ?? 0) + 1)}
                  className="rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-ink transition-opacity hover:opacity-90"
                >
                  Add to cart
                </button>
              </li>
            ))}
          </ul>

          <aside
            aria-label="Shopping cart"
            className="h-fit rounded-xl border border-border bg-surface p-5"
          >
            <h3 className="flex items-center justify-between text-lg font-semibold">
              Your cart
              <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-sm text-muted">
                {count}
              </span>
            </h3>

            {lines.length === 0 ? (
              <p className="mt-4 text-sm text-muted">Your cart is empty.</p>
            ) : (
              <>
                <ul className="mt-4 divide-y divide-border">
                  {lines.map((line) => (
                    <li key={line.id} className="py-3">
                      <div className="flex justify-between gap-3 text-sm">
                        <span>{line.name}</span>
                        <span className="text-muted">
                          {euro.format(line.price * line.qty)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${line.name}`}
                          onClick={() => setQty(line.id, line.qty - 1)}
                          className="h-7 w-7 rounded-md border border-border hover:bg-surface-2"
                        >
                          &minus;
                        </button>
                        <span
                          className="w-6 text-center text-sm"
                          aria-live="polite"
                        >
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${line.name}`}
                          onClick={() => setQty(line.id, line.qty + 1)}
                          className="h-7 w-7 rounded-md border border-border hover:bg-surface-2"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => setQty(line.id, 0)}
                          className="ml-auto text-xs text-muted hover:text-danger"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between border-t border-border pt-4 font-semibold">
                  <span>Total</span>
                  <span>{euro.format(total)}</span>
                </div>
                <button
                  type="button"
                  disabled
                  className="mt-4 w-full cursor-not-allowed rounded-lg bg-surface-2 px-4 py-2.5 font-semibold text-muted"
                >
                  Checkout coming soon
                </button>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
