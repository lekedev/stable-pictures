import QuoteForm from "./QuoteForm";
import { SLOTS } from "@/lib/data";

const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447000000000";

export default function QuoteSection() {
  return (
    <section className="section quote" id="quote">
      <div className="wrap quote-grid">
        <div>
          <h2>Tell us about the property.</h2>
          <p className="lede">Send the details and we will reply with a fixed quote and a shoot date within one working day.</p>
          <div className="slots"><b>{SLOTS.left} of {SLOTS.total}</b> shoot slots left for {SLOTS.month}.</div>
          <p className="alt">
            Prefer to talk?{" "}
            <a href={`https://wa.me/${wa}?text=${encodeURIComponent("Hello, I would like a quote for a property shoot.")}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>.
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
