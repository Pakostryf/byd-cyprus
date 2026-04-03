"use client";

import { useState } from "react";

export default function Home() {
  const [events, setEvents] = useState([
    { id: 1, name: "BYD Meetup Nicosia", date: "2026-05-10" },
    { id: 2, name: "Beach Drive Limassol", date: "2026-06-15" },
  ]);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const addEvent = () => {
    if (!eventName || !eventDate) return;

    const newEvent = {
      id: Date.now(),
      name: eventName,
      date: eventDate,
    };

    setEvents([...events, newEvent]);
    setEventName("");
    setEventDate("");
  };

  const removeEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <main style={{ fontFamily: "Arial", color: "#111" }}>

      {/* NAVBAR */}
      <nav
        style={{
          padding: "15px 30px",
          display: "flex",
          gap: "20px",
          background: "#111",
          color: "#fff",
          position: "sticky",
          top: 0,
        }}
      >
        <a href="#home" style={{ color: "#fff" }}>Home</a>
        <a href="#events" style={{ color: "#fff" }}>Events</a>
        <a href="#store" style={{ color: "#fff" }}>Accessories</a>
      </nav>

      {/* HERO */}
      <section
        id="home"
        style={{ padding: "80px", textAlign: "center", background: "#f5f5f5" }}
      >
        <h1 style={{ fontSize: "40px" }}>BYD Cyprus Community</h1>
        <p>Events • Community • Accessories</p>
      </section>

      {/* EVENTS */}
      <section id="events" style={{ padding: "40px" }}>
        <h2>Upcoming Events</h2>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{ border: "1px solid #ddd", padding: "20px", width: "250px" }}
            >
              <h3>{event.name}</h3>
              <p>{event.date}</p>
              <button onClick={() => removeEvent(event.id)}>Remove</button>
            </div>
          ))}
        </div>
      </section>

      {/* ADD EVENT */}
      <section style={{ padding: "40px", background: "#fafafa" }}>
        <h2>Add Event</h2>

        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        />

        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        />

        <button onClick={addEvent}>Add Event</button>
      </section>

      {/* STORE */}
      <section id="store" style={{ padding: "40px" }}>
        <h2>BYD Accessories Store</h2>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ border: "1px solid #ddd", padding: "20px", width: "250px" }}>
            <h3>BYD Floor Mats</h3>
            <p>€50</p>
            <button>Add to Cart</button>
          </div>

          <div style={{ border: "1px solid #ddd", padding: "20px", width: "250px" }}>
            <h3>BYD Charging Cable</h3>
            <p>€120</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          background: "#111",
          color: "#fff",
        }}
      >
        BYD Cyprus Community © 2026
      </footer>
    </main>
  );
}