// Post images live in public/images/posts/ as pre-optimized WebP:
//   {slug}.webp (1140×570), {slug}-600.webp (600×300), {slug}-og.jpg (1200×630, social)
//   {slug}-body.webp (900×600), {slug}-body-600.webp (600×400)
// Content refers to the main file; the other sizes are derived from its name.

export const small = (src: string) => src.replace(/\.webp$/, '-600.webp');
export const ogImage = (src: string) => src.replace(/\.webp$/, '-og.jpg');
export const srcset = (src: string, full: number) => `${small(src)} 600w, ${src} ${full}w`;
