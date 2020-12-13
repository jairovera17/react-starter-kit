import Phaser from "phaser";

export const calculateImageScale = (
  imgWidth: number,
  imgHeight: number,
  availableSpaceWidth: number,
  availableSpaceHeight: number,
  minPadding: number
) => {
  let ratio = 1;
  const currentDPI = window.devicePixelRatio;
  const widthRatio =
    (imgWidth * currentDPI + 2 * minPadding) / availableSpaceWidth;
  const heightRatio =
    (imgHeight * currentDPI + 2 * minPadding) / availableSpaceHeight;
  if (widthRatio > 1 || heightRatio > 1)
    ratio = 1 / Math.max(widthRatio, heightRatio);
  return ratio * currentDPI;
};

export const scaleImage = (
  image: Phaser.GameObjects.Image,
  availableSpaceWidth: number,
  availableSpaceHeight: number,
  padding = 0,
  scaleMultiplier = 1
) => {
  padding *= window.devicePixelRatio;
  const scale = calculateImageScale(
    image.width,
    image.height,
    availableSpaceWidth,
    availableSpaceHeight,
    padding
  );
  image.setScale(scale * scaleMultiplier);
};
