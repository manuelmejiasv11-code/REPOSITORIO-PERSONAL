import type { ComponentType } from 'react';

export type IconProps = { size?: number | string; strokeWidth?: number | string };
export type IconComponent = ComponentType<IconProps>;

export function ParabolicAntennaIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 44 C 14 18, 50 18, 54 44" fill="#e7f4f8" stroke="#23718e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 42 C 20 24, 44 24, 48 42" fill="none" stroke="#23718e" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="32" y1="42" x2="32" y2="14" stroke="#23718e" strokeWidth="2" />
      <circle cx="32" cy="11" r="3.5" fill="#2E86C1" stroke="#1A5276" strokeWidth="1.5" />
      <line x1="22" y1="46" x2="42" y2="46" stroke="#23718e" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="50" x2="46" y2="50" stroke="#23718e" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function FiberSplitterIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="30" width="50" height="60" rx="5" fill="#FFFFFF" stroke="#1A5276" strokeWidth="4" />
      <polygon points="45,60 70,45 70,75" fill="#2E86C1" stroke="#1A5276" strokeWidth="2" />
      <line x1="10" y1="60" x2="35" y2="60" stroke="#1A5276" strokeWidth="4" />
      <line x1="85" y1="60" x2="110" y2="40" stroke="#1A5276" strokeWidth="3" />
      <line x1="85" y1="60" x2="110" y2="53" stroke="#1A5276" strokeWidth="3" />
      <line x1="85" y1="60" x2="110" y2="66" stroke="#1A5276" strokeWidth="3" />
      <line x1="85" y1="60" x2="110" y2="79" stroke="#1A5276" strokeWidth="3" />
    </svg>
  );
}
