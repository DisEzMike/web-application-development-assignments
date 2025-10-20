import axios from 'axios';

const parseObject = (obj) => {
	if (!obj) return null;

	return {
		drone_id: obj.drone_id,
		drone_name: obj.drone_name,
		condition: obj.condition,
		light: obj.light,
		weight: obj.weight,
		country: obj.country,
		population: obj.population,
	};
};

const parseLogObject = (obj) => {
	if (!obj) return null;

	return {
		drone_id: obj.drone_id,
		drone_name: obj.drone_name,
		created: obj.created,
		country: obj.country,
		celsius: obj.celsius,
	}
}

export const getDroneConfig = async (droneId) => {
	const resp = await axios.get(process.env.DRONE_LOG_URL);
	const data = resp.data.data;

	const drone = data.find((cfg) => cfg.drone_id === parseInt(droneId));
	return parseObject(drone);
};


