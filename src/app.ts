import express from 'express';
import './db/mongoose.js';

import { studentRouter } from './routers/studentRouter.js';
import { courseRouter } from './routers/courseRouter.js';
import { defaultRouter } from './routers/defaultRouter.js';

export const app = express();

app.use(express.json());

app.use(studentRouter);
app.use(courseRouter);
app.use(defaultRouter);

