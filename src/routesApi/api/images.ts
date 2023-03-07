import express from 'express';
import File from './../../file';

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

const validate = async (query: ImageQuery): Promise<null | string> => {
  if (!(await File.isImageAvailable(query.filename))) {
    const availableImageNames: string = (
      await File.getAvailableImageNames()
    ).join(',');
    return `please pass a valid filename in the 'filename' query segment. Available filesnames are: ${availableImageNames}.`;
  }
  if (!query.width && !query.height) {
    return null;
  }

  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return 'provide a positive numerical value for width';
  }

  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return 'provide a positive numerical value for height';
  }
  return null;
};

const images: express.Router = express.Router();
images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const validationMessage: null | string = await validate(req.query);
    if (validationMessage) {
      res.send(validationMessage);
      return;
    }
    let error: null | string = '';

    if (!(await File.isThumbnailAvailable(req.query))) {
      error = await File.createThumb(req.query);
    }

    if (error) {
      res.send(error);
      return;
    }

    const path: null | string = await File.getImagePath(req.query);
    if (path) {
      res.sendFile(path);
    } else {
      res.send('This should never happened again' + path);
    }
  }
);

export default images;
