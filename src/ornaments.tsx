// Ornamen khas Melayu Jambi (SVG): pucuk rebung, belah ketupat songket,
// tampuk manggis, sulur/awan larat, dan emblem Angso Duo.
import { useId } from "react";

// Selaras dengan token warna di tailwind.config.js (gold & gold-light);
// GOLD_DEEP adalah nada gelap untuk detail garis.
const GOLD = "#A9834F";
const GOLD_LIGHT = "#D9B36C";
const GOLD_DEEP = "#8A6534";
const MAROON = "#7A1E2B";

// Bunga emas lima kelopak dengan pusat maroon (elemen <g>, dipakai di dalam svg).
export const Flower5 = ({ transform }: any) => (
  <g transform={transform}>
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse
        key={a}
        cx="0"
        cy="-7.5"
        rx="3.6"
        ry="7"
        fill={GOLD_LIGHT}
        stroke={GOLD_DEEP}
        strokeWidth="0.7"
        transform={`rotate(${a})`}
      />
    ))}
    <circle r="3.2" fill={MAROON} stroke={GOLD_DEEP} strokeWidth="0.7" />
    <circle r="1.3" fill={GOLD_LIGHT} />
  </g>
);

// Daun emas dengan tulang daun maroon (elemen <g>).
const Leaf = ({ transform }: any) => (
  <g transform={transform}>
    <path
      d="M0 0 C5 -6 14 -8 20 -6 C18 0 10 4 0 0 Z"
      fill={GOLD}
      stroke={GOLD_DEEP}
      strokeWidth="0.5"
    />
    <path
      d="M2 -1 C8 -4 14 -5 18 -5"
      fill="none"
      stroke={MAROON}
      strokeWidth="0.8"
      opacity="0.6"
    />
  </g>
);

// Kluster tiga bunga + daun pada ranting, berpusat di (0,0) — untuk dipakai
// di dalam svg lain lewat <g transform>.
export const FlowerClusterInner = () => (
  <g>
    <line x1="-24" y1="6" x2="24" y2="6" stroke={MAROON} strokeWidth="1.2" opacity="0.7" />
    <Leaf transform="translate(-22 4) rotate(190)" />
    <Leaf transform="translate(22 4) rotate(-10)" />
    <Leaf transform="translate(-8 8) rotate(150) scale(0.8)" />
    <Leaf transform="translate(8 8) rotate(30) scale(0.8)" />
    <Flower5 transform="translate(-20 0) scale(0.75)" />
    <Flower5 transform="translate(20 0) scale(0.75)" />
    <Flower5 transform="scale(1.15)" />
  </g>
);

// Kluster bunga sebagai svg mandiri untuk dipakai langsung di JSX halaman.
export const FlowerCluster = ({ className = "", ...rest }: any) => (
  <svg
    viewBox="-44 -20 88 40"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <FlowerClusterInner />
  </svg>
);

// Pola latar belah ketupat khas songket. Warna mengikuti currentColor,
// atur intensitas lewat class opacity pada pemakaian.
export const SongketPattern = ({ className = "", ...rest }: any) => {
  const pid = `songket-${useId().replace(/:/g, "")}`;
  return (
    <svg className={className} aria-hidden="true" {...rest}>
      <defs>
        <pattern id={pid} width="44" height="44" patternUnits="userSpaceOnUse">
          <path
            d="M22 2 L42 22 L22 42 L2 22 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M22 12 L32 22 L22 32 L12 22 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />
          <circle cx="22" cy="22" r="1.6" fill="currentColor" />
          <circle cx="0" cy="0" r="1.2" fill="currentColor" />
          <circle cx="44" cy="0" r="1.2" fill="currentColor" />
          <circle cx="0" cy="44" r="1.2" fill="currentColor" />
          <circle cx="44" cy="44" r="1.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
};

// Deret segitiga pucuk rebung untuk tepi section. Default segitiga menghadap
// ke atas dengan garis dasar di bawah; pakai class "rotate-180" untuk tepi atas.
// Tinggi pattern 32px — pasangkan dengan class h-8 agar motif tidak terpotong.
export const PucukRebung = ({ className = "", ...rest }: any) => {
  const pid = `rebung-${useId().replace(/:/g, "")}`;
  return (
    <svg className={className} aria-hidden="true" {...rest}>
      <defs>
        <pattern id={pid} width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M16 3 L29 26 L3 26 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.95"
          />
          <path d="M16 10 L23.5 25 L8.5 25 Z" fill="currentColor" />
          <circle cx="16" cy="6" r="1.4" fill="currentColor" />
          <circle cx="0" cy="22" r="1.4" fill="currentColor" />
          <circle cx="32" cy="22" r="1.4" fill="currentColor" />
          <rect x="0" y="26.5" width="32" height="2" fill="currentColor" />
          <rect
            x="0"
            y="29.5"
            width="32"
            height="2.5"
            fill="currentColor"
            opacity="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
};

// Renda scallop menggantung untuk memperkaya tepi section. Menempel di tepi
// atas (scallop menghadap ke bawah); pakai rotate-180 untuk tepi bawah.
// Tinggi pattern 26px — pasangkan dengan class h-[26px] / h-7.
export const LaceEdge = ({ className = "", ...rest }: any) => {
  const pid = `lace-${useId().replace(/:/g, "")}`;
  return (
    <svg className={className} aria-hidden="true" {...rest}>
      <defs>
        <pattern id={pid} width="40" height="26" patternUnits="userSpaceOnUse">
          <path d="M0 0 L40 0 L40 3 C33 16 7 16 0 3 Z" fill="currentColor" />
          <path
            d="M0 3 C7 17.5 33 17.5 40 3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.65"
          />
          <circle cx="20" cy="20.5" r="1.7" fill="currentColor" />
          <circle cx="0" cy="9" r="1.2" fill="currentColor" />
          <circle cx="40" cy="9" r="1.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
};

// Puncak mahkota kecil di tengah pembatas section: ketupat + sulur simetris.
// Warna ikut currentColor.
export const DividerCrest = ({ className = "", ...rest }: any) => (
  <svg viewBox="0 0 220 44" className={className} aria-hidden="true" {...rest}>
    <path
      d="M8 22 H62"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M158 22 H212"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M62 22 C74 8 90 8 97 16"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M62 22 C74 36 90 36 97 28"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M158 22 C146 8 130 8 123 16"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M158 22 C146 36 130 36 123 28"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M110 4 L125 22 L110 40 L95 22 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M110 11 L119 22 L110 33 L101 22 Z" fill="currentColor" opacity="0.85" />
    <circle cx="72" cy="22" r="2" fill="currentColor" />
    <circle cx="148" cy="22" r="2" fill="currentColor" />
    <circle cx="35" cy="22" r="1.4" fill="currentColor" />
    <circle cx="185" cy="22" r="1.4" fill="currentColor" />
  </svg>
);

// Medallion tampuk manggis (kelopak delapan) berwarna emas.
export const TampukManggis = ({ className = "", ...rest }: any) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...rest}>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <g key={a} transform={`rotate(${a} 50 50)`}>
        <ellipse
          cx="50"
          cy="26"
          rx="9"
          ry="18"
          fill={GOLD}
          stroke={GOLD_DEEP}
          strokeWidth="1.5"
          opacity="0.95"
        />
        <line
          x1="50"
          y1="14"
          x2="50"
          y2="38"
          stroke={GOLD_DEEP}
          strokeWidth="1"
          opacity="0.7"
        />
      </g>
    ))}
    <circle cx="50" cy="50" r="12" fill={GOLD_DEEP} />
    <circle cx="50" cy="50" r="7" fill={GOLD_LIGHT} />
    <circle cx="50" cy="50" r="2.5" fill={GOLD_DEEP} />
  </svg>
);

// Garis pembatas dengan ketupat kecil di tengah. Warna ikut currentColor.
export const Divider = ({ className = "", ...rest }: any) => (
  <svg viewBox="0 0 300 32" className={className} aria-hidden="true" {...rest}>
    <line
      x1="14"
      y1="16"
      x2="118"
      y2="16"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <line
      x1="182"
      y1="16"
      x2="286"
      y2="16"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M14 16 C6 16 4 9 10 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M286 16 C294 16 296 9 290 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M150 4 L162 16 L150 28 L138 16 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <circle cx="150" cy="16" r="3" fill="currentColor" />
    <circle cx="126" cy="16" r="2" fill="currentColor" />
    <circle cx="174" cy="16" r="2" fill="currentColor" />
  </svg>
);

// Sulur / awan larat untuk sudut bingkai. Digambar untuk sudut kiri-atas;
// cerminkan dengan -scale-x-100 / -scale-y-100 untuk sudut lain.
export const SulurCorner = ({ className = "", ...rest }: any) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <path
      d="M4 76 C4 40 40 4 76 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 76 C8 62 20 58 24 64 C27 69 20 74 16 70"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M76 4 C62 8 58 20 64 24 C69 27 74 20 70 16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M40 23 C46 13 57 11 63 15 C57 22 47 25 40 23 Z"
      fill="currentColor"
      opacity="0.85"
    />
    <path
      d="M23 40 C13 46 11 57 15 63 C22 57 25 47 23 40 Z"
      fill="currentColor"
      opacity="0.85"
    />
    <circle cx="40" cy="23" r="2.2" fill="currentColor" />
    <circle cx="23" cy="40" r="2.2" fill="currentColor" />
  </svg>
);

// Ilustrasi final (monogram OV, peony, kupu-kupu, Angso Duo) digambar di
// artwork.tsx — digenerate dari kandidat SVG terpilih.
export {
  AngsoDuo,
  ButterflyOpen,
  ButterflySide,
  ButterflyTiny,
  MonogramVO,
  PeonyBloom,
  PeonyCorner,
  PeonySpray,
} from "./artwork";

// Kartu berbingkai emas ganda dengan sulur di keempat sudut.
export const GoldCard = ({
  children,
  className = "",
  tone = "maroon",
  ...rest
}: any) => (
  <div
    className={`relative rounded-xl border-2 border-gold p-1.5 ${
      tone === "maroon" ? "bg-maroon" : "bg-ivory"
    } ${className}`}
    {...rest}
  >
    <div className="relative rounded-lg border border-gold/70 px-6 py-8">
      <SulurCorner className="absolute top-2 left-2 w-8 text-gold" />
      <SulurCorner className="absolute top-2 right-2 w-8 text-gold -scale-x-100" />
      <SulurCorner className="absolute bottom-2 left-2 w-8 text-gold -scale-y-100" />
      <SulurCorner className="absolute bottom-2 right-2 w-8 text-gold -scale-x-100 -scale-y-100" />
      {children}
    </div>
  </div>
);
