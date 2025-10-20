import { Router } from 'express';
import { getDroneLogsById, createDroneLog } from '../services/drone_service.js';

export const router = Router();

router.get('/:droneId', async (req, res) => {
	const { droneId } = req.params;
	const { page } = req.query;

	const droneLogs = await getDroneLogsById(droneId, parseInt(page) || 1);
	return res.json(droneLogs);
});

router.post('/', async (req, res) => {
	const { drone_id, drone_name, country, celsius } = req.body;
	if (!drone_id || !drone_name || !country || celsius === undefined) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	const payload = {
		drone_id,
		drone_name,
		country,
		celsius,
	};

	try {
		const resp = await createDroneLog(payload);
		return res
			.status(201)
			.json({
				message: 'Log entry created successfully',
				data: resp.data,
			});
	} catch (e) {
		return res.status(500).json({ message: 'Failed to create log entry' });
	}
});
