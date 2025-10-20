import { Router } from 'express';
import { getDroneConfig } from '../services/drone_service.js';

export const router = Router();

router.get('/:droneId', async (req, res) => {
	const { droneId } = req.params;

	try {
		const drone = await getDroneConfig(droneId);
		if (drone) {
			const condition = drone.condition;
			return res.json({ condition });
		} else {
			return res.status(404).json({ message: 'Drone not found' });
		}
	} catch (e) {
		if (e instanceof Error) {
			return res.status(400).json({ message: e.message });
		} else if (e instanceof AxiosError) {
			return res.status(e.response?.status || 500).json({ message: e.message });
		} else {
			return res.status(500).json({ message: 'Unknown error' });
		}
	}
});
