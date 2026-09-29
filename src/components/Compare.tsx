"use client";
import { useState, type CSSProperties } from "react";

export default function Compare({ day, night }: { day: string; night: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="compare" style={{ ["--pos" as string]: `${pos}%` } as CSSProperties}>
      <div className="layer day" aria-hidden="true" dangerouslySetInnerHTML={{ __html: day }} />
      <div className="layer night" aria-hidden="true" dangerouslySetInnerHTML={{ __html: night }} />
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Move between day and twilight" />
      <div className="handle">
        <div className="knob">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ece6d8" strokeWidth="1.6"><path d="M7 5l-5 5 5 5M13 5l5 5-5 5" /></svg>
        </div>
      </div>
      <span className="tag l">Day</span>
      <span className="tag r">Twilight</span>
    </div>
  );
}
