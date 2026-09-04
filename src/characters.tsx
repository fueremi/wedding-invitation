// Ilustrasi karakter kedua mempelai bergaya flat: mempelai wanita berjilbab
// maroon dengan mahkota kembang goyang & kalung teratai emas; mempelai pria
// bertanjak dengan selempang songket. Artwork bust digenerate di artwork.tsx.
import { BrideBustArt, GroomBustArt, PeonyBloomArt } from "./artwork";

const MAROON_DEEP = "#4E1019";
const GOLD = "#A9834F";
const GOLD_LIGHT = "#D9B36C";
const IVORY = "#FAF5EF";
const BLUSH = "#E9B7C0";

// Potret mempelai wanita untuk bingkai lengkung.
export const BrideCharacter = ({ className = "", ...rest }: any) => (
  <svg
    viewBox="0 0 200 280"
    preserveAspectRatio="xMidYMid slice"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <rect width="200" height="280" fill={IVORY} />
    <circle cx="100" cy="120" r="95" fill={BLUSH} opacity="0.22" />
    <BrideBustArt />
  </svg>
);

// Potret mempelai pria untuk bingkai lengkung.
export const GroomCharacter = ({ className = "", ...rest }: any) => (
  <svg
    viewBox="0 0 200 280"
    preserveAspectRatio="xMidYMid slice"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <rect width="200" height="280" fill={IVORY} />
    <circle cx="100" cy="120" r="95" fill={GOLD_LIGHT} opacity="0.16" />
    <GroomBustArt />
  </svg>
);

// Potret berdua di bawah lengkung pelaminan berhias kluster bunga,
// untuk bingkai foto halaman pembuka (potret tinggi).
export const CoupleCharacter = ({ className = "", ...rest }: any) => (
  <svg
    viewBox="0 0 300 560"
    preserveAspectRatio="xMidYMid slice"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <rect width="300" height="560" fill={IVORY} />
    <circle cx="150" cy="250" r="155" fill={BLUSH} opacity="0.18" />
    {/* lengkung pelaminan ganda */}
    <path
      d="M34 552 L34 170 C34 70 266 70 266 170 L266 552"
      fill="none"
      stroke={MAROON_DEEP}
      strokeWidth="2"
      opacity="0.8"
    />
    <path
      d="M44 552 L44 176 C44 82 256 82 256 176 L256 552"
      fill="none"
      stroke={GOLD}
      strokeWidth="2"
    />
    <g transform="translate(150 60) scale(0.85) translate(-60 -60)">
      <PeonyBloomArt />
    </g>
    <g transform="translate(96 76) rotate(-20) scale(0.55) translate(-60 -60)">
      <PeonyBloomArt />
    </g>
    <g transform="translate(204 76) rotate(20) scale(0.55) translate(-60 -60)">
      <PeonyBloomArt />
    </g>
    <g transform="translate(50 128) rotate(-35) scale(0.62) translate(-60 -60)">
      <PeonyBloomArt />
    </g>
    <g transform="translate(250 128) rotate(35) scale(0.62) translate(-60 -60)">
      <PeonyBloomArt />
    </g>
    <g transform="translate(44 514) rotate(15) scale(0.7) translate(-60 -60)">
      <PeonyBloomArt />
    </g>
    <g transform="translate(256 514) rotate(-15) scale(0.7) translate(-60 -60)">
      <PeonyBloomArt />
    </g>
    <ellipse cx="150" cy="548" rx="120" ry="8" fill={MAROON_DEEP} opacity="0.12" />
    <g transform="translate(1 150) scale(0.74)">
      <GroomBustArt />
    </g>
    <g transform="translate(151 178) scale(0.74)">
      <BrideBustArt />
    </g>
  </svg>
);
