import { Router } from 'express';
import { getDroneLogsById } from '../utils/drone_helper.js';

export const router = Router();

router.get('/:droneId', async (req, res) => {
	const { droneId } = req.params;
	const { page } = req.query;

	const droneLogs = await getDroneLogsById(droneId, parseInt(page) || 1);
	return res.json(droneLogs);
});

router.post('/', (req, res) => {
	const {} = req.body;

	res.status(201).json({ message: 'Log entry created' });
});
