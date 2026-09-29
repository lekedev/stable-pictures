"use client";
import { PACKAGES } from "@/lib/data";
import { useBooking } from "./Booking";

export default function PackageGrid() {
  const { choose } = useBooking();
  return (
    <div className="pk-grid">
      {PACKAGES.map((p) => (
        <article className={`pk${p.highlight ? " hi" : ""}`} key={p.id}>
          <h3>
            {p.id}
            {p.highlight && <span className="badge">Recommended</span>}
          </h3>
          <p className="for">{p.blurb}</p>
          <div className="price"><small>From</small>{p.price}</div>
          <div className="turn">{p.turnLong}</div>
          <ul>
            {p.inherit && <li className="inherit">{p.inherit}</li>}
            {p.adds.map((a) => <li key={a}>{a}</li>)}
          </ul>
          <button className={`btn${p.highlight ? "" : " ghost"}`} onClick={() => choose(p.id)}>Request {p.id}</button>
        </article>
      ))}
    </div>
  );
}
