type TextVariant = 'heading' | 'subheading' | 'body' | 'caption' | 'button' | 'sample';

const textTokens: Record<TextVariant, string> = {
  heading: 'text-2xl font-bold',
  subheading: 'text-xl font-semibold',
  body: 'text-base text-gray-800',
  caption: 'text-sm text-gray-500',
  button: 'text-base  tracking-wide',
  sample: 'text-base font-semibold uppercase tracking-wide',
};

export function getTextStyle(variant: TextVariant = 'body') {
  return textTokens[variant] || '';
}
