import { promises as fs } from 'fs';
import path from 'path';
import File from './../file';

describe('Test image processing with sharp module', (): void => {
  it('raises an error(invalid value for width)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'foo',
      width: '-100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });
  it("raises an error(file name doesn't exist)", async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'foo',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('successful resized(file name exist)', async (): Promise<void> => {
    const resizedImagePath: string = path.resolve(
      File.imagesThumbPath,
      'fjord-100x100.jpg'
    );
    let errorFile: null | string = '';
    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = "File doesn't exist ";
    }
    expect(errorFile).not.toBeNull();
  });
  afterAll(async (): Promise<void> => {
    const resizedImagePath: string = path.resolve(
      File.imagesThumbPath,
      'fjord-100x100.jpg'
    );
    try {
      await fs.access(resizedImagePath);
      fs.unlink(resizedImagePath);
    } catch {
      //no empty
    }
  });
});
