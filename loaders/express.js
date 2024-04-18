import express from 'express';
import cors from 'cors';
import { prefix, frontUrl } from './../config/index.js';
import routes from './../routes/index.js';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

export default (server) => {
    server.enable('trust proxy');
    server.use(cors({ origin: frontUrl }));
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(morgan('dev'));
    server.use(helmet());
    server.use(compression());
    server.use(express.static('public'));
    server.disable('x-powered-by');
    server.disable('etag');

    server.use(prefix, routes);
};