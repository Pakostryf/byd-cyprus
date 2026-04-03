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
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>BYD Cyprus Community</h1>

      {/* Add Event */}
      <section style={{ marginTop: "30px" }}>
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

      {/* Events List */}
      <section style={{ marginTop: "40px" }}>
        <h2>Upcoming Events</h2>
        {events.length === 0 && <p>No events yet.</p>}
        <ul>
          {events.map((event) => (
            <li key={event.id} style={{ marginBottom: "10px" }}>
              <strong>{event.name}</strong> - {event.date}
              <button
                onClick={() => removeEvent(event.id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Store Section (Basic UI) */}
      <section style={{ marginTop: "40px" }}>
        <h2>BYD Accessories Store</h2>

        <div style={{ marginBottom: "20px" }}>
          <p>BYD Floor Mats - €50</p>
          <button>Add to Cart</button>
        </div>

        <div>
          <p>BYD Charging Cable - €120</p>
          <button>Add to Cart</button>
        </div>
      </section>
    </main>
  );
}
