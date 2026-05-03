export const BACKGROUND_IMAGES = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.png",
  "6.png",
  "7.png",
  "8.png"
];

export const getRandomBackgroundImagePath = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % BACKGROUND_IMAGES.length;
  const fileName = BACKGROUND_IMAGES[index];
  
  return `public/images/og-bg/${fileName}`;
};
