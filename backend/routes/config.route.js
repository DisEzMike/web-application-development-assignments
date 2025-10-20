import { Router } from "express";
import { getDroneCondition } from "../utils/drone_helper.js";

export const router = Router();

router.get('/:droneId', async (req, res) => {
    const { droneId } = req.params;

    const drone = await getDroneCondition(droneId);
    if (drone) {
        const data = {
            drone_id: drone.drone_id,
            drone_name: drone.drone_name,
            light: drone.light,
            country: drone.country,
            weight: drone.weight,
        }
        return res.json(data);
    } else {
        return res.status(404).json({ message: 'Drone not found' });
    }
});