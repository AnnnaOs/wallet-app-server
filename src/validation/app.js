import express from 'express';
import cookieParser from 'cookie-parser';

import routes from '../routers/index.js';

const app = express;

app.use(cookieParser());
app.use(routes);
