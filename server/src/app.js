import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { CLIENT_ORIGIN } from './config/index.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(morgan('dev'));
app.use(express.json());

app.use(routes);

app.use(notFound);
app.use(errorHandler);

export default app;
