import { Router } from "express";

export const router: Router = Router();

router.get("/", (_req, res) => {
    res.json({ hello: "world" });
});

router.get("/test", (_req, res) => {
    res.json({ hello: "test" });
});

router.post("/gameobject/add", (req, res) => {
    res.send("got a request");
});
