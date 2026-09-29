export function Proof() {
  const stats = [
    ["120+", "properties photographed and filmed"],
    ["48 hrs", "photo turnaround on Essentials"],
    ["14", "deliverables from one crew"],
    ["5 days", "typical delivery for a launch film"],
  ];
  return (
    <section className="section proof" aria-label="Results at a glance" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="stats">
          {stats.map(([n, l]) => (
            <div className="stat" key={n}>
              <b>{n}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <p className="note">Sample figures. Replace with your real numbers.</p>
      </div>
    </section>
  );
}

export function Promise() {
  return (
    <section className="section promise">
      <div className="wrap promise-grid">
        <h2>A listing is judged in three seconds.</h2>
        <div className="body">
          <p>Buyers scroll past flat photos, dim rooms and crooked lines. A listing that looks ordinary gets treated as ordinary, and it sits.</p>
          <p>We shoot each property the way it will feel to live in, then cut it for every place a buyer will meet it: Rightmove and Zoopla, Instagram, WhatsApp, the sales suite and your website.</p>
        </div>
      </div>
    </section>
  );
}
