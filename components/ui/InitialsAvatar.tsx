'use client';

interface Props {
  name: string;
  size?: 'sm' | 'md';
}

export default function InitialsAvatar({ name, size = 'md' }: Props) {
  const initials = name
    .split(/[\s(]+/)
    .filter((s) => s.length > 0)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeClasses = size === 'md' ? 'w-12 h-12 text-base' : 'w-10 h-10 text-sm';

  return (
    <div
      className={`${sizeClasses} rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center font-semibold text-accent-gold tracking-wide flex-shrink-0`}
    >
      {initials}
    </div>
  );
}
