import { GameObjectFormResult } from "../../shared/GameObjectFormResult";
import { Router } from "express";
// import asyncHandler from "express-async-handler";

export const router: Router = Router();

router.post("/gameobject/add", (req, res) => {

    const formData: GameObjectFormResult = req.body as GameObjectFormResult;
    
    if (!formData.alias || !formData.name || !formData.description || !formData.type) {
        return res.status(400).send("Alias, name, description, and type are required.");
    }

    if (formData.type === "Item" && !formData.price) {
        return res.status(400).send("Price is required for an Item.");
    }

    if (formData.type === "Character" && !formData.hp) {
        return res.status(400).send("HP is required for a Character.");
    }

    console.log(req.body);

    return res.status(204).end();
});
