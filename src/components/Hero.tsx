import { scene } from "@/lib/scene";

const heroScene = scene("night", "H");

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="scene anim" aria-hidden="true" dangerouslySetInnerHTML={{ __html: heroScene }} />
      <div className="hero-inner wrap">
        <h1>Property media that sells before the first viewing.</h1>
        <p className="sub">
          Photography, film, drone and 3D tours for developers and estate agents. One crew, one look, from the first shoot to launch day.
        </p>
        <div className="cta">
          <a className="btn" href="#quote">Get a quote</a>
          <a className="btn ghost" href="#work">Watch showreel</a>
        </div>
      </div>
    </section>
  );
}
