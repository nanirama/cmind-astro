export interface ImageSizes {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export const IMAGE_SIZES = {
  hero:      { sm: 640,  md: 1024, lg: 1440, xl: 1920 },
  card:      { sm: 400,  md: 600,  lg: 800,  xl: 1000 },
  avatar:    { sm: 80,   md: 120,  lg: 160,  xl: 200  },
  thumbnail: { sm: 200,  md: 300,  lg: 400,  xl: 500  },
  wide:      { sm: 800,  md: 1200, lg: 1600, xl: 2000 },
} satisfies Record<string, ImageSizes>;

export function buildSizesAttr(breakpoints: Partial<ImageSizes> & { default: string }): string {
  const parts: string[] = [];
  if (breakpoints.xl)  parts.push(`(min-width: 1280px) ${breakpoints.xl}px`);
  if (breakpoints.lg)  parts.push(`(min-width: 1024px) ${breakpoints.lg}px`);
  if (breakpoints.md)  parts.push(`(min-width: 640px) ${breakpoints.md}px`);
  if (breakpoints.sm)  parts.push(`(min-width: 375px) ${breakpoints.sm}px`);
  parts.push(breakpoints.default);
  return parts.join(', ');
}

export const HERO_SIZES = buildSizesAttr({
  xl: 1920, lg: 1440, md: 1024, sm: 640,
  default: '100vw',
});

export const CARD_SIZES = buildSizesAttr({
  xl: 400, lg: 360, md: 320, sm: 280,
  default: '90vw',
});

export const CONTENT_SIZES = buildSizesAttr({
  xl: 720, lg: 600, md: 480, sm: 360,
  default: '90vw',
});
