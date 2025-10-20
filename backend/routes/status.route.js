import { Router } from 'express';
import { getDroneConfig } from '../services/drone_service.js';

export const router = Router();

router.get('/:droneId', async (req, res) => {
	const { droneId } = req.params;

	const drone = await getDroneConfig(droneId);
	if (drone) {
		const condition = drone.condition;
		return res.json({ condition });
	} else {
		return res.status(404).json({ message: 'Drone not found' });
	}
});
