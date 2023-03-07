import express from 'express';
import route from './routesApi/index';
import File from './file';

const app: express.Application = express();
const Port: number = 3000;

app.use(route);

app.listen(Port, async (): Promise<void> => {
  await File.createThumPath();

  const url: string = `http://localhost:${Port}`;
  console.log(`The server is listenning at: ${url}`);
});
export default app;
