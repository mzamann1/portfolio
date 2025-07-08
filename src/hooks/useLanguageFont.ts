import { useTranslation } from 'react-i18next';

type FontWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

export const useLanguageFont = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  const isArabic = currentLang === 'ar';

  // Font class for root elements
  const fontClass = isArabic ? 'font-gumela' : 'font-sans';

  // Font weight mapping
  const weightMap: Record<FontWeight, string> = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  };

  // Font size mapping (all Tailwind sizes)
  const sizeMap: Record<FontSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl',
    '9xl': 'text-9xl',
  };

  // Utility to get a full font class string
  const getFontClass = ({
    weight = 'normal',
    size = 'base',
    extra = '',
  }: { weight?: FontWeight; size?: FontSize; extra?: string }) =>
    [fontClass, weightMap[weight], sizeMap[size], extra].filter(Boolean).join(' ');

  // Predefined combinations
  const heading = getFontClass({ weight: 'bold', size: '3xl' });
  const subheading = getFontClass({ weight: 'extrabold', size: 'xl' });
  const body = getFontClass({ weight: 'normal', size: 'base' });
  const caption = getFontClass({ weight: 'normal', size: 'sm' });

  return {
    isArabic,
    currentLang,
    fontClass,
    getFontClass,
    heading,
    subheading,
    body,
    caption,
  };
}; 