export const hexAlpha = (hex: string, alpha: number): string => {
  const hexAlpha = Math.round(alpha * 255).toString(16);
  return `${hex}${hexAlpha.length === 1 ? `0${hexAlpha}` : hexAlpha}`;
};
