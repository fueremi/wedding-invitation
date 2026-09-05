// Potret kedua mempelai bergaya flat mengikuti gambar referensi dari user
// (Sep 2026): mempelai wanita berjilbab maroon dengan mahkota bintang, kalung
// teratai emas & pending songket; mempelai pria bertanjak dengan selempang
// songket. Artwork (kanvas 0 0 951 1035) digenerate di artwork.tsx.
import type { SVGProps } from "react";
import {
  BrideBustArt,
  GoldFloralsArt,
  GroomBustArt,
  PortraitFrameArt,
} from "./artwork";

type CharacterProps = SVGProps<SVGSVGElement> & {
  /** Teks aksesibilitas; tanpa label gambar dianggap dekoratif. */
  label?: string;
};

const a11y = (label?: string) =>
  label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

// Potret mempelai wanita lengkap: bingkai lengkung + bunga emas (persis referensi).
export const BrideCharacter = ({ className = "", label, ...rest }: CharacterProps) => (
  <svg viewBox="0 0 951 1035" className={className} {...a11y(label)} {...rest}>
    <PortraitFrameArt p="brf-" />
    <BrideBustArt p="brb-" />
    <GoldFloralsArt p="brl-" />
  </svg>
);

// Potret mempelai pria dengan bingkai & bunga yang sama.
export const GroomCharacter = ({ className = "", label, ...rest }: CharacterProps) => (
  <svg viewBox="0 0 951 1035" className={className} {...a11y(label)} {...rest}>
    <PortraitFrameArt p="grf-" />
    <GroomBustArt p="grb-" />
    <GoldFloralsArt p="grl-" />
  </svg>
);

// Potret berdua untuk jendela bingkai halaman pembuka (potret tinggi, 148x280):
// pria di kiri-belakang, wanita di kanan-depan, kluster bunga emas di kaki.
export const CoupleCharacter = ({ className = "", label, ...rest }: CharacterProps) => (
  <svg
    viewBox="0 0 300 560"
    preserveAspectRatio="xMidYMid slice"
    className={className}
    {...a11y(label)}
    {...rest}
  >
    <defs>
      <linearGradient id="cpl-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F6E7C5" />
        <stop offset="1" stopColor="#E4D6B0" />
      </linearGradient>
      <clipPath id="cpl-foot">
        <rect x="0" y="700" width="951" height="400" />
      </clipPath>
    </defs>
    <rect width="300" height="560" fill="url(#cpl-bg)" />
    <g transform="translate(95 70) scale(0.55) translate(-459.5 -247)">
      <GroomBustArt p="cpg-" />
    </g>
    <g transform="translate(205 120) scale(0.55) translate(-459.5 -247)">
      <BrideBustArt p="cpb-" />
    </g>
    <g transform="translate(-50 130) scale(0.42)" clipPath="url(#cpl-foot)">
      <GoldFloralsArt p="cpl-" />
    </g>
  </svg>
);
