import { Router } from 'express';

export const router = Router();

router.get('/:droneId', (req, res) => {
	const { droneId } = req.params;

	res.json({
		condition: 'good',
	});
});

router.post('/', (req, res) => {
    const { } = req.body;

    res.status(201).json({ message: 'Log entry created' });
})
