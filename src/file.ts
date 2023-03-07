import { promises as fs } from 'fs';
import path from 'path';
import processIm from './image-process';

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

export default class File {
  static imagesFullPath = path.resolve(__dirname, '../images/full');
  static imagesThumbPath = path.resolve(__dirname, '../images/thumbnails');

  static async getImagePath(params: ImageQuery): Promise<null | string> {
    if (!params.filename) {
      return null;
    }
    const filepath: string =
      params.width && params.height
        ? path.resolve(
            File.imagesThumbPath,
            `${params.filename}-${params.width}x${params.height}.jpg`
          )
        : path.resolve(File.imagesFullPath, `${params.filename}.jpg`);
    try {
      await fs.access(filepath);
      return filepath;
    } catch {
      return null;
    }
  }
  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false;
    }
    return (await File.getAvailableImageNames()).includes(filename);
  }

  static async getAvailableImageNames(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagesFullPath)).map(
        (filename: string): string => filename.split('.')[0]
      );
    } catch {
      return [];
    }
  }
  static async isThumbnailAvailable(params: ImageQuery): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false;
    }

    const filepath: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );
    try {
      await fs.access(filepath);
      return true;
    } catch {
      return false;
    }
  }

  static async createThumPath(): Promise<void> {
    try {
      await fs.access(File.imagesThumbPath);
    } catch {
      fs.mkdir(File.imagesThumbPath);
    }
  }

  static async createThumb(params: ImageQuery): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null;
    }

    const filepathFull: string = path.resolve(
      File.imagesFullPath,
      `${params.filename}.jpg`
    );

    const filepathThumb: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    console.log(`creating thumb ${filepathThumb}`);

    return await processIm({
      source: filepathFull,
      target: filepathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }
}
