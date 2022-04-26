/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import routes from './routes';

// env
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = express();

// CORS
app.use(cors());

// Security HTTP Middleware
app.use(helmet());

// Built-in Req Object Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use(morgan('dev'));

// Gzip Compression
app.use(compression());

// Define Route
app.use(routes);

// Initialize App
const appName = process.env.APP_NAME;
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});
