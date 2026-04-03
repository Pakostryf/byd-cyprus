"use client";

import { useState } from "react";

export default function Home() {
  const [events] = useState([
    { title: "BYD Meetup Nicosia", date: "2026-05-10" },
    { title: "Beach Drive Limassol", date: "2026-06-15" }
  ]);

  const [products] = useState([
    { name: "BYD Floor Mats", price: "€50" },
    { name: "BYD Charging Cable", price: "€120" }
  ]);

  return (
    <div style={{ padding: 20 }}>
      <h1>BYD Cyprus Community</h1>

      <hr />

      <h2>Upcoming Events</h2>
      {events.map((event, i) => (
        <div key={i}>
          <p><b>{event.title}</b></p>
          <p>{event.date}</p>
        </div>
      ))}

      <hr />

      <h2>BYD Accessories Store</h2>
      {products.map((product, i) => (
        <div key={i}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}