import sharp from 'sharp';

interface sharpResizeParam {
  source: string;
  target: string;
  width: number;
  height: number;
}
const processIm = async (params: sharpResizeParam): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat('jpg')
      .toFile(params.target);
    return null;
  } catch {
    return 'IMAGE COULD NOT BE PROCESSED';
  }
};
export default processIm;
