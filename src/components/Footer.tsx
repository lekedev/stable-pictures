import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site">
      <div className="foot">
        <div><Image src="/logo-lockup.jpg" width={520} height={633} alt="Stable Pictures & Filmworks, multi-media production company" /></div>
        <div><h4>Contact</h4><ul><li><a href="mailto:hello@example.co.uk">hello@example.co.uk</a></li><li>+44 0000 000000</li></ul></div>
        <div><h4>Follow</h4><ul><li><a href="#">Instagram</a></li><li><a href="#">TikTok</a></li><li><a href="#">YouTube</a></li></ul></div>
        <div><h4>Service areas</h4><ul><li>Add your regions</li><li>Travel available on request</li></ul></div>
      </div>
      <div className="legal">&copy; 2026 Stable Pictures &amp; Filmworks. All rights reserved.</div>
    </footer>
  );
}
