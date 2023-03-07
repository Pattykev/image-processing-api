import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import File from './../file';

const req: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  describe('Endpoint:/', (): void => {
    it('gets /', async (): Promise<void> => {
      const res: supertest.Response = await req.get('/');
      expect(res.status).toBe(200);
    });
  });

  describe('endpoint: api/images', (): void => {
    it('gets /api/images?filename=fjord (valid argument)', async (): Promise<void> => {
      const res: supertest.Response = await req.get(
        '/api/images?filename=fjord'
      );
      expect(res.status).toBe(200);
    });

    it('gets /api/images?filename=fjord&width=100&height=100 (valid argument)', async (): Promise<void> => {
      const res: supertest.Response = await req.get(
        '/api/images?filename=fjord&width=100&height=100'
      );
      expect(res.status).toBe(200);
    });

    it('gets /api/images?filename=fjord&width=-100&height=100 (invalid argument)', async (): Promise<void> => {
      const res: supertest.Response = await req.get(
        '/api/images?filename=fjord&width=-100&height=100'
      );
      expect(res.status).toBe(200);
    });

    it('gets /api/images?filename(no argument)', async (): Promise<void> => {
      const res: supertest.Response = await req.get('/api/images');
      expect(res.status).toBe(200);
    });
  });
  describe('False endpoint:', (): void => {
    it('returns 404 status for invalid endpoint', async (): Promise<void> => {
      const res: supertest.Response = await req.get('/foo');
      expect(res.status).toBe(404);
    });
  });
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
    //empty
  }
});
