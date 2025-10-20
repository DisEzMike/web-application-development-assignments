import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import { router as configRoutes } from './routes/config.route.js';
import { router as statusRoutes } from './routes/status.route.js';
import { router as logRoutes } from './routes/log.route.js';


const app = express();

const corsOptions = {
	origin: ['http://localhost:3000']
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
})

app.use('/configs', configRoutes);
app.use('/status', statusRoutes);
app.use('/logs', logRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
