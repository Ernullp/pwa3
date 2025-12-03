import { cn } from '@/lib/utils';
import { useId } from 'react';

interface CategoryIconProps {
  categoryId: string;
  color: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export default function CategoryIcon({ categoryId, color, size = 'md', className }: CategoryIconProps) {
  const uniqueId = useId();
  const gradId = (name: string) => `${name}-${uniqueId}`;
  
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
  };
  
  const iconSize = sizeClasses[size];
  const strokeWidth = size === 'xs' ? 1.25 : size === 'sm' ? 1.5 : 1.5;

  const icons: Record<string, JSX.Element> = {
    'face-makeup': (
      <svg viewBox="0 0 24 24" className={cn(iconSize, className)} fill="none">
        <ellipse cx="12" cy="13" rx="8" ry="9" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <circle cx="9" cy="11" r="1" fill={color} />
        <circle cx="15" cy="11" r="1" fill={color} />
        <path d="M9 16c1.5 1.5 4.5 1.5 6 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
        <path d="M7 8c1-1 2.5-1.5 5-1.5s4 0.5 5 1.5" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    'eye-makeup': (
      <svg viewBox="0 0 24 24" className={cn(iconSize, className)} fill="none">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <circle cx="12" cy="12" r="1.5" fill={color} />
        <path d="M4 9c2-2 4-3 6-3.5" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.6" />
        <path d="M20 9c-2-2-4-3-6-3.5" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    'eyebrow-makeup': (
      <svg viewBox="0 0 24 24" className={cn(iconSize, className)} fill="none">
        <path d="M3 10c3-4 6-5 9-4s5 3 5 5c0 1-2 1-5 0s-6-0.5-9 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M21 10c-3-4-6-5-9-4s-5 3-5 5c0 1 2 1 5 0s6-0.5 9 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
        <circle cx="8" cy="16" r="2" stroke={color} strokeWidth={strokeWidth * 0.8} opacity="0.5" fill="none" />
        <circle cx="16" cy="16" r="2" stroke={color} strokeWidth={strokeWidth * 0.8} opacity="0.5" fill="none" />
      </svg>
    ),
    'lip-makeup': (
      <svg viewBox="0 0 24 24" className={cn(iconSize, className)} fill="none">
        <path d="M4 12c0-2 3.5-4 8-4s8 2 8 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
        <path d="M4 12c0 4 3.5 6 8 6s8-2 8-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
        <path d="M4 12h16" stroke={color} strokeWidth={strokeWidth * 0.7} strokeLinecap="round" opacity="0.5" />
        <path d="M12 8v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M9 9.5c1.5-1 4.5-1 6 0" stroke={color} strokeWidth={strokeWidth * 0.7} strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    'skincare': (
      <svg viewBox="0 0 24 24" className={cn(iconSize, className)} fill="none">
        <rect x="8" y="2" width="8" height="3" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <path d="M10 5v2h4V5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <rect x="6" y="7" width="12" height="15" rx="3" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <circle cx="12" cy="14" r="3" stroke={color} strokeWidth={strokeWidth * 0.8} fill="none" />
        <path d="M10.5 14h3M12 12.5v3" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    'haircare': (
      <svg viewBox="0 0 24 24" className={cn(iconSize, className)} fill="none">
        <path d="M8 4c-3 2-5 7-5 12s2 4 4 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
        <path d="M16 4c3 2 5 7 5 12s-2 4-4 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
        <ellipse cx="12" cy="12" rx="4" ry="6" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <path d="M10 10c1-0.5 3-0.5 4 0" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
        <circle cx="12" cy="14" r="1" fill={color} opacity="0.4" />
      </svg>
    ),
    'perfume': (
      <svg viewBox="0 0 24 24" className={cn(iconSize, className)} fill="none">
        <rect x="9" y="2" width="6" height="4" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <path d="M11 6h2v2h-2z" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <path d="M7 8h10l2 13c0 1-1 2-2 2H7c-1 0-2-1-2-2l2-13z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" fill="none" />
        <circle cx="12" cy="15" r="3" stroke={color} strokeWidth={strokeWidth * 0.8} fill="none" opacity="0.7" />
        <circle cx="12" cy="15" r="1" fill={color} opacity="0.5" />
        <path d="M8 4c-1-2-1-2 0-3M16 4c1-2 1-2 0-3" stroke={color} strokeWidth={strokeWidth * 0.7} strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    'hygiene': (
      <svg viewBox="0 0 24 24" className={cn(iconSize, className)} fill="none">
        <ellipse cx="12" cy="15" rx="8" ry="6" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <path d="M8 11c-2-4 0-8 4-9 4 1 6 5 4 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
        <circle cx="9" cy="8" r="1.5" stroke={color} strokeWidth={strokeWidth * 0.7} fill="none" opacity="0.6" />
        <circle cx="15" cy="7" r="2" stroke={color} strokeWidth={strokeWidth * 0.7} fill="none" opacity="0.6" />
        <circle cx="12" cy="5" r="1" stroke={color} strokeWidth={strokeWidth * 0.6} fill="none" opacity="0.5" />
        <path d="M9 17c1.5 1 4.5 1 6 0" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  };

  return icons[categoryId] || (
    <svg viewBox="0 0 24 24" className={cn(iconSize, className)} fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} fill="none" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth={strokeWidth * 0.8} fill="none" opacity="0.5" />
      <path d="M12 6v12M6 12h12" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}
