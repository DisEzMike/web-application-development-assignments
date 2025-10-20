import { Router } from 'express';
import { getDroneCondition } from '../utils/drone_helper.js';

export const router = Router();

router.get('/:droneId', async (req, res) => {
	const { droneId } = req.params;

	const drone = await getDroneCondition(droneId);
	if (drone) {
		const condition = drone.condition;
		return res.json({ condition });
	} else {
		return res.status(404).json({ message: 'Drone not found' });
	}
});
