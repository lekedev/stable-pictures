import Compare from "./Compare";
import { scene } from "@/lib/scene";

const day = scene("day", "D");
const night = scene("night", "N");
const filmArt = scene("night", "F", "xMidYMid slice");
const tourArt = scene("day", "T", "xMidYMid slice");

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <h2>Same building, two hours apart.</h2>
        <p className="lede">Drag the divider to move from daylight to twilight. This is the shot that stops the scroll.</p>
        <div className="work-grid">
          <Compare day={day} night={night} />
          <div className="tile">
            <div className="art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: filmArt }} />
            <div className="play"><svg width="20" height="22" viewBox="0 0 20 22" fill="#ece6d8"><path d="M2 1.5l16 9.5-16 9.5z" /></svg></div>
            <div className="cap"><b>Cinematic walkthrough</b><small>Sample slot. Add your film.</small></div>
          </div>
          <div className="tile">
            <div className="art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: tourArt }} />
            <div className="play"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#ece6d8" strokeWidth="1.5"><circle cx="13" cy="13" r="10" /><ellipse cx="13" cy="13" rx="4.5" ry="10" /><path d="M3 13h20" /></svg></div>
            <div className="cap"><b>3D tour</b><small>Sample slot. Embed your tour.</small></div>
          </div>
        </div>
      </div>
    </section>
  );
}
