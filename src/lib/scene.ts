// Procedural twilight/daylight building illustration. Deterministic, so it renders identically on server and client.
function rng(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function scene(mode: "day" | "night", uid: string, par = "xMidYMax slice"): string {
  const night = mode === "night";
  const r = rng(11);
  const W = 1200, H = 700, G = 590;
  let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="${par}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${
    night ? "Modern apartment building at twilight with lit windows" : "Modern apartment building in daylight"
  }">`;
  s += `<defs>
    <linearGradient id="sky${uid}" x1="0" y1="0" x2="0" y2="1">${
      night
        ? `<stop offset="0" stop-color="#04050a"/><stop offset=".5" stop-color="#171320"/><stop offset=".8" stop-color="#5c3626"/><stop offset="1" stop-color="#c98a4b"/>`
        : `<stop offset="0" stop-color="#7f9db3"/><stop offset=".6" stop-color="#b9ccd6"/><stop offset="1" stop-color="#e6ddc8"/>`
    }</linearGradient>
    <linearGradient id="gr${uid}" x1="0" y1="0" x2="0" y2="1">${
      night
        ? `<stop offset="0" stop-color="#14100d"/><stop offset="1" stop-color="#000"/>`
        : `<stop offset="0" stop-color="#bdb8ab"/><stop offset="1" stop-color="#8b877c"/>`
    }</linearGradient>
    <linearGradient id="gl${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2c374" stop-opacity=".5"/><stop offset="1" stop-color="#f2c374" stop-opacity="0"/></linearGradient>
    <filter id="blur${uid}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
  </defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#sky${uid})"/>`;

  let x = -20;
  while (x < W) {
    const w = 40 + r() * 70, h = 50 + r() * 150;
    s += `<rect x="${x.toFixed(0)}" y="${(G - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${night ? "#0b0a0e" : "#8fa3ae"}" opacity="${night ? 0.9 : 0.55}"/>`;
    x += w + 4 + r() * 10;
  }

  const conc = night ? "#111116" : "#dad7d0";
  const conc2 = night ? "#17161c" : "#c8c4bb";
  const slab = night ? "#26232b" : "#f1eee7";
  const blocks: [number, number, number, number, number, number, string][] = [
    [170, 330, 300, 260, 5, 4, conc2],
    [850, 410, 190, 180, 3, 3, conc2],
    [470, 110, 380, 480, 8, 9, conc],
  ];
  let winsLit = "", glow = "", winsDay = "";
  for (const [bx, by, bw, bh, cols, rows, fill] of blocks) {
    s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="${fill}"/>`;
    const ch = (bh - 70) / rows, cw = bw / cols;
    for (let i = 0; i < rows; i++) {
      s += `<rect x="${bx}" y="${(by + (i + 1) * ch + 4).toFixed(1)}" width="${bw}" height="3" fill="${slab}"/>`;
      for (let j = 0; j < cols; j++) {
        const wx = bx + j * cw + cw * 0.16, wy = by + i * ch + ch * 0.2, ww = cw * 0.68, wh = ch * 0.6;
        if (night) {
          const lit = r() > 0.28, o = 0.55 + r() * 0.45, d = 0.5 + r() * 3.6;
          if (lit) {
            glow += `<rect class="w" style="--o:${(o * 0.55).toFixed(2)};--d:${d.toFixed(2)}s" x="${(wx - 5).toFixed(1)}" y="${(wy - 5).toFixed(1)}" width="${(ww + 10).toFixed(1)}" height="${(wh + 10).toFixed(1)}" fill="#f2a94e"/>`;
            winsLit += `<rect class="w" style="--o:${o.toFixed(2)};--d:${d.toFixed(2)}s" x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ww.toFixed(1)}" height="${wh.toFixed(1)}" fill="#f2c374"/>`;
          } else {
            winsLit += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ww.toFixed(1)}" height="${wh.toFixed(1)}" fill="#1c1d27"/>`;
          }
        } else {
          winsDay += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ww.toFixed(1)}" height="${wh.toFixed(1)}" fill="${(i + j) % 3 === 0 ? "#86a0b0" : "#5f7888"}"/>`;
        }
      }
    }
  }
  s += night ? `<g filter="url(#blur${uid})">${glow}</g>${winsLit}` : winsDay;

  s += `<rect x="470" y="${G - 60}" width="380" height="60" fill="${night ? "#f2c374" : "#5f7888"}" opacity="${night ? 0.88 : 1}"/>`;
  for (let k = 1; k < 10; k++) s += `<rect x="${470 + k * 38}" y="${G - 60}" width="3" height="60" fill="${night ? "#3a2d1a" : "#dad7d0"}"/>`;
  s += `<rect y="${G}" width="${W}" height="${H - G}" fill="url(#gr${uid})"/>`;
  if (night) s += `<rect x="470" y="${G}" width="380" height="110" fill="url(#gl${uid})"/>`;
  for (const [tx, sc] of [[130, 1], [420, 0.8], [900, 1.1], [1090, 0.9]]) {
    s += `<rect x="${tx - 3}" y="${G - 40 * sc}" width="6" height="${40 * sc}" fill="${night ? "#050505" : "#4a3f34"}"/><ellipse cx="${tx}" cy="${G - 70 * sc}" rx="${34 * sc}" ry="${50 * sc}" fill="${night ? "#050706" : "#4f6349"}"/>`;
  }
  return s + `</svg>`;
}
