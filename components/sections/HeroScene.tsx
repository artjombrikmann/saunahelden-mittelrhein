// Platzhalter-Szene, wird durch ein echtes Foto (next/image) ersetzt, sobald vorhanden.
export function HeroScene() {
  return (
    <svg viewBox="0 0 420 470" role="img" aria-label="Illustration: mobile Fasssauna auf dem Anhänger vor einer Burg am Rhein bei Nacht">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F1B2D" />
          <stop offset=".55" stopColor="#27304F" />
          <stop offset=".8" stopColor="#7A3636" />
          <stop offset="1" stopColor="#C25A2C" />
        </linearGradient>
      </defs>
      <rect width="420" height="470" fill="url(#sky)" />
      <g fill="#FFF8F0" opacity=".7">
        <circle cx="40" cy="40" r="1.5" /><circle cx="120" cy="70" r="1.2" /><circle cx="220" cy="30" r="1.6" />
        <circle cx="330" cy="60" r="1.3" /><circle cx="380" cy="120" r="1.5" /><circle cx="70" cy="130" r="1.1" />
      </g>
      <path d="M0 300C60 270 130 290 200 270C270 250 330 280 420 250V470H0Z" fill="#0B1424" />
      <g fill="#0B1424">
        <rect x="300" y="190" width="26" height="62" /><polygon points="295,190 313,164 331,190" />
        <rect x="326" y="215" width="40" height="38" /><rect x="366" y="202" width="20" height="51" />
        <polygon points="362,202 376,180 390,202" />
      </g>
      <g fill="#FDBA53">
        <rect x="309" y="205" width="5" height="9" /><rect x="372" y="216" width="5" height="9" /><rect x="342" y="230" width="5" height="8" />
      </g>
      <path d="M112 232c-6-9 5-13 0-24 12 5 14 14 7 22M132 232c-6-9 5-13 0-24 12 5 14 14 7 22" fill="none" stroke="#D7261E" strokeWidth="5" strokeLinecap="round" />
      <rect x="114" y="234" width="14" height="30" fill="#2A2F38" />
      <rect x="54" y="258" width="290" height="122" rx="61" fill="#C46A2B" />
      <g stroke="#9A4F1B" strokeWidth="2"><path d="M84 278h230M72 298h254M66 318h266M66 338h266M72 358h254M84 376h230" /></g>
      <g fill="#5C2D0E"><rect x="124" y="258" width="10" height="122" /><rect x="206" y="258" width="10" height="122" /><rect x="286" y="258" width="10" height="122" /></g>
      <rect x="230" y="282" width="44" height="84" rx="7" fill="#142238" stroke="#E9B27C" strokeWidth="4" />
      <circle cx="266" cy="324" r="3" fill="#E9B27C" />
      <rect x="40" y="380" width="318" height="14" rx="3" fill="#3A404B" /><path d="M40 384L0 404l40-6z" fill="#3A404B" />
      <circle cx="140" cy="408" r="23" fill="#1B1F27" /><circle cx="140" cy="408" r="9" fill="#8B93A1" />
      <circle cx="240" cy="408" r="23" fill="#1B1F27" /><circle cx="240" cy="408" r="9" fill="#8B93A1" />
    </svg>
  );
}
