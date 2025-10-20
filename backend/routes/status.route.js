import { Router } from "express";

export const router = Router();

router.get('/:droneId', (req, res) => {
    const { droneId } = req.params;

    res.json({
        condition: "good"
    });
});