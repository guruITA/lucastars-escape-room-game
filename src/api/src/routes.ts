import { Router } from "express";
export const router: Router = Router();

router.get("/", (_req, res) => {
    res.json("");
});

router.post("/gameobject/add", (req, res) => {
    if (
        !req.body.name ||
        req.body.name === "" ||
        !req.body.description ||
        req.body.description === "" ||
        !req.body.type ||
        req.body.type === "" ||
        (req.body.type === "item" && (!req.body.price || req.body.price === 0)) ||
        (req.body.type === "character" && (!req.body.hp || req.body.hp === 0))
    ) {
        res.status(400);
    } else {
        console.log(req.body);
        res.status(204);
    }

    res.json("");
});
