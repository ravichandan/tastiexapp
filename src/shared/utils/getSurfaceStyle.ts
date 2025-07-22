// shared/utils/getSurfaceStyle.ts
type SurfaceVariant = 'light' | 'dark' | 'primary' | 'dark-outline' | 'light-outline';
type SurfaceState = 'base' | 'hover' | 'active' | 'focus' | 'disabled' | 'all';

const surfaceTokens: Record<
  SurfaceVariant,
  Record<Exclude<SurfaceState, 'all'>, string>
> = {
  light: {
    base: 'bg-white text-black border border-neutral-300',
    hover: 'hover:bg-neutral-100',
    active: 'active:bg-neutral-200',
    focus: 'focus:ring-2 focus:ring-blue-200',
    disabled: 'opacity-50',
  },
  dark: {
    base: 'bg-black text-white',
    hover: 'hover:bg-neutral-800',
    active: 'active:bg-neutral-900',
    focus: 'focus:ring-2 focus:ring-white',
    disabled: 'opacity-50',
  },
  'dark-outline': {
    base: 'text-white',
    hover: 'hover:bg-neutral-800',
    active: 'active:bg-neutral-900',
    focus: 'focus:ring-2 focus:ring-white',
    disabled: 'opacity-50',
  },
  'light-outline': {
    base: 'text-black',
    hover: 'hover:bg-neutral-800',
    active: 'active:bg-neutral-900',
    focus: 'focus:ring-2 focus:ring-white',
    disabled: 'opacity-50',
  },
  primary: {
    base: 'bg-blue-600 text-white',
    hover: 'hover:bg-blue-700',
    active: 'active:bg-blue-800',
    focus: 'focus:ring-2 focus:ring-blue-300',
    disabled: 'opacity-50',
  },
};

export function getSurfaceStyle(
  variant: SurfaceVariant,
  states: SurfaceState[] = ['base', 'hover', 'active']
): string {
  const styles = surfaceTokens[variant];

  if (!styles) {
    console.warn(`Unknown surface variant: "${variant}"`);
    return '';
  }

  if (states.includes('all')) {
    return Object.values(styles).join(' ');
  }

  return states.filter(s => s !== 'all').map((state) => styles[state]).filter(Boolean).join(' ');
}
