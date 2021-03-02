import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import createConnection from './database';
import { AppError } from './errors/AppError';
import { router } from './routes';
import path from 'path';

createConnection();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use('/files',
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
app.use(router)

export default app;