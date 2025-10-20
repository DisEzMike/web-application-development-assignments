import axios from 'axios';

export const getDroneCondition = async (droneId) => {
    const resp = await axios.get(process.env.DRONE_CONFIG_URL);
	const data = resp.data.data;

	return data.find((cfg) => cfg.drone_id === parseInt(droneId));
}