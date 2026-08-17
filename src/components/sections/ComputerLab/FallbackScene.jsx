import { useTranslation } from 'react-i18next'

/* FallbackScene — the original isometric SVG illustration, rendered when
   WebGL is unavailable (or as the lazy-load placeholder). Kept pixel-identical
   to the vanilla markup so the section looks right without WebGL. */
function FallbackScene({ className }) {
  const { t } = useTranslation()

  return (
    <svg
      className={className}
      viewBox="0 0 770 730"
      role="img"
      aria-label={t('lab.illustrationAria')}
    >
      <g transform="translate(720 517.5)">
        <defs>
          <g id="lab-station">
            <path d="M 64,14 34,29 34,47 64,32 Z" fill="#E9EEF5" />
            <path d="M 0,-18 -30,-3 -30,15 0,0 Z" fill="#F6F8FB" />
            <path d="M 0,-18 64,14 34,29 -30,-3 Z" fill="#FFFFFF" />
            <path d="M 3,-16.5 29,-3.5 27,-24.5 1,-37.5 Z" fill="#1E293B" />
            <line
              x1="6.4"
              y1="-12.0"
              x2="23.4"
              y2="-3.5"
              stroke="#2563EB"
              strokeWidth="2"
              opacity="0.9"
              strokeLinecap="round"
            />
            <path d="M 35,-0.5 61,12.5 59,-8.5 33,-21.5 Z" fill="#1E293B" />
            <line
              x1="38.4"
              y1="4.0"
              x2="55.4"
              y2="12.5"
              stroke="#2563EB"
              strokeWidth="2"
              opacity="0.9"
              strokeLinecap="round"
            />
            <rect x="1.0" y="-14.5" width="4" height="6" rx="1" fill="#475569" />
            <rect x="33.0" y="1.5" width="4" height="6" rx="1" fill="#475569" />
            <path d="M -14,23 -28,30 -28,40 -14,33 Z" fill="#DEE4EC" />
            <path d="M -32,14 -46,21 -46,31 -32,24 Z" fill="#EDF1F6" />
            <path d="M -32,14 -14,23 -28,30 -46,21 Z" fill="#FFFFFF" />
            <path d="M 16,38 2,45 2,55 16,48 Z" fill="#DEE4EC" />
            <path d="M -2,29 -16,36 -16,46 -2,39 Z" fill="#EDF1F6" />
            <path d="M -2,29 16,38 2,45 -16,36 Z" fill="#FFFFFF" />
          </g>
        </defs>
        <path d="M0 0 L-340,-170 L-340,-470 L0,-300 Z" fill="#F8FAFC" />
        <path
          d="M0 0 L-340,-170 L-340,-470 L0,-300 Z"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        <path d="M0 0 L-330,165 L-330,-135 L0,-300 Z" fill="#F1F5F9" />
        <path
          d="M0 0 L-330,165 L-330,-135 L0,-300 Z"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        <path d="M 0,0 L -340,-170 L -670,-5 L -330,165 Z" fill="#FFFFFF" />
        <path
          d="M 0,0 L -340,-170 L -670,-5 L -330,165 Z"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        <path d="M0 0 L0,-300" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M-340,-170 L-340,-470" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M-330,165 L-330,-135" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M0 0 L-340,-170" stroke="#E5E7EB" strokeWidth="2.5" />
        <path d="M0 0 L-330,165" stroke="#E5E7EB" strokeWidth="2.5" />
        <use href="#lab-station" transform="translate(-328.0 -68.0)" />
        <use href="#lab-station" transform="translate(-248.0 -28.0)" />
        <use href="#lab-station" transform="translate(-168.0 12.0)" />
        <use href="#lab-station" transform="translate(-388.0 -38.0)" />
        <use href="#lab-station" transform="translate(-308.0 2.0)" />
        <use href="#lab-station" transform="translate(-228.0 42.0)" />
        <use href="#lab-station" transform="translate(-448.0 -8.0)" />
        <use href="#lab-station" transform="translate(-368.0 32.0)" />
        <use href="#lab-station" transform="translate(-288.0 72.0)" />
        <use href="#lab-station" transform="translate(-508.0 22.0)" />
        <use href="#lab-station" transform="translate(-428.0 62.0)" />
        <use href="#lab-station" transform="translate(-348.0 102.0)" />
        <path d="M -126,-65 -156,-50 -156,-32 -126,-47 Z" fill="#E9EEF5" />
        <path d="M -204,-104 -234,-89 -234,-71 -204,-86 Z" fill="#F6F8FB" />
        <path d="M -204,-104 -126,-65 -156,-50 -234,-89 Z" fill="#FFFFFF" />
        <path d="M -202,-103 -168,-86 -170,-109 -204,-126 Z" fill="#1E293B" />
        <line
          x1="-197.8"
          y1="-98.1"
          x2="-174.5"
          y2="-86.4"
          stroke="#2563EB"
          strokeWidth="2"
          opacity="0.9"
          strokeLinecap="round"
        />
        <path d="M -164,-84 -130,-67 -132,-90 -166,-107 Z" fill="#1E293B" />
        <line
          x1="-159.8"
          y1="-79.1"
          x2="-136.5"
          y2="-67.4"
          stroke="#2563EB"
          strokeWidth="2"
          opacity="0.9"
          strokeLinecap="round"
        />
        <path d="M -148,-84 -162,-77 -162,-67 -148,-74 Z" fill="#DEE4EC" />
        <path d="M -168,-94 -182,-87 -182,-77 -168,-84 Z" fill="#EDF1F6" />
        <path d="M -168,-94 -148,-84 -162,-77 -182,-87 Z" fill="#FFFFFF" />
        <path d="M -328,-240 -348,-230 -348,-152 -328,-162 Z" fill="#1E293B" />
        <path d="M -304,-228 -324,-218 -324,-140 -304,-150 Z" fill="#0F172A" />
        <path d="M -328,-240 -304,-228 -324,-218 -348,-230 Z" fill="#334155" />
        <line x1="-304" y1="-228" x2="-324" y2="-218" stroke="#1E293B" strokeWidth="2" />
        <rect x="-330.5" y="-170.0" width="3" height="3" rx="1" fill="#60A5FA" opacity="0.95" />
        <rect x="-324.5" y="-167.0" width="3" height="3" rx="1" fill="#60A5FA" opacity="0.95" />
        <rect x="-330.5" y="-186.0" width="3" height="3" rx="1" fill="#2563EB" opacity="0.95" />
        <rect x="-324.5" y="-183.0" width="3" height="3" rx="1" fill="#2563EB" opacity="0.95" />
        <rect x="-330.5" y="-202.0" width="3" height="3" rx="1" fill="#2563EB" opacity="0.95" />
        <rect x="-324.5" y="-199.0" width="3" height="3" rx="1" fill="#2563EB" opacity="0.95" />
        <rect x="-330.5" y="-218.0" width="3" height="3" rx="1" fill="#2563EB" opacity="0.95" />
        <rect x="-324.5" y="-215.0" width="3" height="3" rx="1" fill="#2563EB" opacity="0.95" />
        <path d="M -296,-212 -262,-195 -265,-207.5 -299,-224.5 Z" fill="#E2E8F0" />
        <rect
          x="-297.0"
          y="-213.0"
          width="36"
          height="16"
          rx="2"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1"
        />
        <rect x="-297.0" y="-211.0" width="36" height="3" fill="#0F172A" />
        <rect x="-293.0" y="-223.0" width="2" height="2" fill="#2563EB" opacity="0.9" />
        <rect x="-285.0" y="-219.0" width="2" height="2" fill="#2563EB" opacity="0.9" />
        <rect x="-277.0" y="-215.0" width="2" height="2" fill="#2563EB" opacity="0.9" />
        <rect x="-269.0" y="-211.0" width="2" height="2" fill="#2563EB" opacity="0.9" />
        <g transform="translate(-196.0 -334.0) scale(1.15) translate(-12 -12)">
          <path
            d="M5 12.55a11 11 0 0 1 14.08 0"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M1.42 9a16 16 0 0 1 21.16 0"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8.53 16.11a6 6 0 0 1 6.95 0"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="20"
            x2="12.01"
            y2="20"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M -320.0 -164.0 C -320.0 -232.0 -296.0 -232.0 -296.0 -212.0"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <path
          d="M -296.0 -212.0 L -308.0 -28.0 L -228.0 12.0 L -148.0 52.0"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1.1"
          opacity="0.75"
        />
        <line
          x1="-216.0"
          y1="12.0"
          x2="-216.0"
          y2="18.0"
          stroke="#CBD5E1"
          strokeWidth="1.1"
          opacity="0.75"
        />
        <line
          x1="-276.0"
          y1="42.0"
          x2="-276.0"
          y2="48.0"
          stroke="#CBD5E1"
          strokeWidth="1.1"
          opacity="0.75"
        />
      </g>
    </svg>
  )
}

export default FallbackScene
