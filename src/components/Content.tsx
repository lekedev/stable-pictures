export function Process() {
  const steps = [
    ["Brief", "A short call to agree the shot list, the shoot date and the channels you are launching on.", "Within 24 hours of your request"],
    ["Shoot", "One crew handles stills, film and drone in a single visit, timed to the best light.", "Half a day for most properties"],
    ["Edit", "Colour, retouching, sound and cutdowns, checked against your brief before you see them.", "48 hours to 10 working days"],
    ["Deliver", "A private link with every format, ready to post. One revision round is included.", "Same day as approval"],
  ];
  return (
    <section className="section" id="process">
      <div className="wrap">
        <h2>From first call to final files.</h2>
        <p className="lede">Four steps, each with a clear date, so you always know what is next.</p>
        <div className="steps">
          {steps.map(([h, p, t], i) => (
            <div className="step-i" key={h}>
              <div className="no">{i + 1}</div>
              <h3>{h}</h3>
              <p>{p}</p>
              <span className="time">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Voices() {
  const v = [
    ["The teaser went out on a Monday. By Friday, two units were reserved.", "Client name, Property developer", "Outcome: 2 units reserved in week one"],
    ["The twilight images alone changed how buyers replied to the listing.", "Client name, Estate agent", "Outcome: enquiries up on the same listing"],
    ["One crew, one look. We stopped chasing three different vendors.", "Client name, Marketing lead", "Outcome: one brief, one delivery date"],
  ];
  return (
    <section className="section voices">
      <div className="wrap">
        <h2>What clients say after launch.</h2>
        <div className="vgrid">
          {v.map(([q, c, o]) => (
            <figure className="v" key={q}>
              <blockquote>{q}</blockquote>
              <cite>{c}</cite>
              <span className="out">{o}</span>
            </figure>
          ))}
        </div>
        <p className="note" style={{ marginTop: 28 }}>Sample testimonials. Replace with real client quotes and results.</p>
      </div>
    </section>
  );
}

const FAQS: [string, string][] = [
  ["How much does a shoot cost?", "Packages start from the price shown above and are per property. Developments with several units, or shoots that need extra locations, are quoted after a short call. Prices exclude VAT."],
  ["How fast will I get my files?", "Essentials photos arrive in 48 hours. Signature takes 5 working days and Full Launch 10 working days. If you have a fixed launch date, tell us and we plan backwards from it."],
  ["Do you need permission to fly a drone at my property?", "Drone flights follow UK Civil Aviation Authority rules. We check the airspace and confirm landowner permission as part of your booking, and tell you upfront if a location cannot be flown."],
  ["Can I ask for changes?", "Yes. Every package includes one round of revisions on edited photos and films. Additional rounds are quoted at a small fixed fee."],
  ["Who owns the content, and where can I use it?", "You receive full usage rights for marketing the property: portals, social, your website, print and paid ads. We keep the right to show the work in our portfolio unless you ask us not to."],
  ["What happens if the weather is bad on shoot day?", "Twilight and drone work depend on the sky. We reschedule at no charge if conditions are poor, and we agree a backup date when you book."],
];

export function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq-grid">
        <div><h2>Questions before you book.</h2></div>
        <div>
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
