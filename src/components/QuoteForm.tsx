"use client";
import { useState, type FormEvent } from "react";
import { BUDGETS, PROPERTY_TYPES } from "@/lib/data";
import { useBooking } from "./Booking";

type State = { kind: "idle" | "sending" | "ok" | "err"; msg: string };

export default function QuoteForm() {
  const { pkg, setPkg } = useBooking();
  const [st, setSt] = useState<State>({ kind: "idle", msg: "" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!d.name?.trim() || !d.phone?.trim()) {
      setSt({ kind: "err", msg: "Add your name and phone number so we can reply." });
      return;
    }
    setSt({ kind: "sending", msg: "Sending..." });
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, pkg }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Something went wrong.");
      form.reset();
      setSt({ kind: "ok", msg: "Thank you. We will reply within one working day." });
    } catch (err) {
      setSt({ kind: "err", msg: (err as Error).message + " You can also message us on WhatsApp." });
    }
  }

  return (
    <form className="qform" onSubmit={onSubmit} noValidate>
      <div className="f"><label htmlFor="fName">Your name</label><input id="fName" name="name" autoComplete="name" required /></div>
      <div className="f"><label htmlFor="fPhone">Phone or WhatsApp</label><input id="fPhone" name="phone" type="tel" autoComplete="tel" required /></div>
      <div className="f full"><label htmlFor="fEmail">Email</label><input id="fEmail" name="email" type="email" autoComplete="email" /></div>
      <div className="f"><label htmlFor="fType">Property type</label>
        <select id="fType" name="type">{PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
      <div className="f"><label htmlFor="fPkg">Package</label>
        <select id="fPkg" value={pkg} onChange={(e) => setPkg(e.target.value)}>
          {["Essentials", "Signature", "Full Launch", "Not sure yet"].map((t) => <option key={t}>{t}</option>)}
        </select></div>
      <div className="f"><label htmlFor="fDate">Launch or shoot date</label><input id="fDate" name="date" type="date" /></div>
      <div className="f"><label htmlFor="fBudget">Budget range</label>
        <select id="fBudget" name="budget">{BUDGETS.map((t) => <option key={t}>{t}</option>)}</select></div>
      <div className="f full"><label htmlFor="fNotes">Anything we should know?</label><textarea id="fNotes" name="notes" maxLength={2000} /></div>
      <div className="hp" aria-hidden="true"><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="form-foot">
        <button className="btn" type="submit" disabled={st.kind === "sending"}>Send quote request</button>
        <span className={`status${st.kind === "err" ? " err" : ""}`} role="status">{st.msg}</span>
      </div>
      <p className="privacy">We only use these details to reply to your enquiry and will not share them.</p>
    </form>
  );
}
