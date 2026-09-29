import Image from "next/image";

export default function Header() {
  return (
    <header className="top">
      <a className="brand" href="#top" aria-label="Stable Pictures & Filmworks, home">
        <Image src="/logo-mono.jpg" width={300} height={297} alt="" priority />
        <span>Stable Pictures &amp; Filmworks</span>
      </a>
      <nav className="main" aria-label="Primary">
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#packages">Packages</a>
        <a href="#process">Process</a>
        <a href="#faq">FAQ</a>
      </nav>
      <a className="btn sm" href="#quote">Get a quote</a>
    </header>
  );
}
