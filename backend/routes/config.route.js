import axios from "axios";
import { Router } from "express";

export const router = Router();

router.get('/:droneId', async (req, res) => {
    const { droneId } = req.params;

    const resp = await axios.get(process.env.DRONE_CONFIG_URL);
    const data = resp.data.data;

    const drone = data.find(cfg => cfg.drone_id === parseInt(droneId));
    
    if (drone) {
        return res.json(drone);
    } else {
        return res.status(404).json({ message: 'Drone not found' });
    }
});