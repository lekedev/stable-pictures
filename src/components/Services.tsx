"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GROUPS } from "@/lib/data";

export default function Services() {
  const [i, setI] = useState(0);
  const g = GROUPS[i];

  const onKey = (e: React.KeyboardEvent) => {
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!next) return;
    e.preventDefault();
    const n = (i + next + GROUPS.length) % GROUPS.length;
    setI(n);
    (e.currentTarget.children[n] as HTMLElement).focus();
  };

  return (
    <section className="section services" id="services">
      <div className="wrap">
        <h2>Fourteen deliverables, four jobs.</h2>
        <p className="lede">Pick a job to see what goes into it.</p>
        <div className="svc">
          <div className="tabs" role="tablist" aria-label="Service groups" onKeyDown={onKey}>
            {GROUPS.map((x, k) => (
              <button key={x.id} className="tab" role="tab" id={`tab-${x.id}`} aria-selected={k === i} aria-controls="svc-panel" tabIndex={k === i ? 0 : -1} onClick={() => setI(k)}>
                <span className="n">{x.name}</span>
                <span className="o">{x.line}</span>
              </button>
            ))}
          </div>
          <div className="panel" id="svc-panel" role="tabpanel" aria-labelledby={`tab-${g.id}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul key={g.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                {g.items.map(([n, d]) => (
                  <li key={n}>
                    <b>{n}</b>
                    <span>{d}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
