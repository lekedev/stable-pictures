"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUESTIONS, REASONS } from "@/lib/data";
import { useBooking } from "./Booking";

export default function Finder() {
  const { choose } = useBooking();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const done = step >= QUESTIONS.length;
  const pick = score <= 1 ? "Essentials" : score <= 3 ? "Signature" : "Full Launch";

  return (
    <div className="finder" aria-live="polite">
      <div>
        <h3>Not sure which package?</h3>
        <p className="lede">Answer three questions and we will point you to the right starting point.</p>
      </div>
      <div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {!done ? (
              <>
                <div className="step">Question {step + 1} of {QUESTIONS.length}</div>
                <div className="q">{QUESTIONS[step].q}</div>
                <div className="opts">
                  {QUESTIONS[step].o.map((t, i) => (
                    <button key={t} className="opt" onClick={() => { setScore((s) => s + i); setStep((s) => s + 1); }}>{t}</button>
                  ))}
                </div>
              </>
            ) : (
              <div className="result">
                <div className="step">Our suggestion</div>
                <div className="pick">{pick}</div>
                <p>{REASONS[pick]}</p>
                <div className="row">
                  <button className="btn" onClick={() => choose(pick)}>Request a quote for {pick}</button>
                  <button className="linkbtn" onClick={() => { setStep(0); setScore(0); }}>Start again</button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
