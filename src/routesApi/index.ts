import express from 'express';
import images from './api/images';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send(
    '<h1>Welcome to my image processing API </h1> <p>Listening at <code><a href="/api/images">/api/images</a></code> for queries contening at least a valid filename. Optionally use both width and height to set the size</p><p>For example<ul><li><a href="/api/images?filename=fjord">/api/images?filename=fjord</a><li><a href="/api/images?filename=fjord&width=100&height=100">/api/images?filename=fjord&width=100&height=100</a></ul></p>'
  );
});
export default routes;
