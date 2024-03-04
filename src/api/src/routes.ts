import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase } from "./services/databaseService";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
export const router: Router = Router();

router.get("/", (_req, res) => {
    res.json("");
});

router.post(
    "/gameobject/add",
    asyncHandler(async (req, res) => {
        const formData: GameObjectFormResult = req.body;

        if (
            !formData.alias ||
            formData.alias === "" ||
            !formData.name ||
            formData.name === "" ||
            !formData.description ||
            formData.description === "" ||
            !formData.type ||
            formData.type === "" ||
            (formData.type === "item" && (!formData.price || formData.price === 0)) ||
            (formData.type === "character" && (!formData.hp || formData.hp === 0))
        ) {
            res.status(400);
        } else {
            //Initiate database connection
            try {
                const db: any = await getConnection();

                const gameObjectResult: ResultSetHeader = await queryDatabase(
                    db,
                    "INSERT INTO gameobject (alias, name, description) VALUES (?, ?, ?)",
                    formData.alias,
                    formData.name,
                    formData.description
                );

                let resultSecond: any;

                switch (formData.type) {
                    case "item":
                        resultSecond = await queryDatabase(
                            db,
                            "INSERT INTO `item` (id, price) VALUES (?, ?)",
                            gameObjectResult.insertId,
                            formData.price
                        );
                        break;

                    case "room":
                        resultSecond = await queryDatabase(
                            db,
                            "INSERT INTO `room` (id) VALUES (?)",
                            gameObjectResult.insertId
                        );
                        break;
                    case "character":
                        resultSecond = await queryDatabase(
                            db,
                            "INSERT INTO `character` (id, hp) VALUES (?, 999)",
                            gameObjectResult.insertId,
                            formData.hp
                        );
                        break;
                }

                res.status(204);
            } catch (error) {
                console.log(error);
                res.status(400);
            }
        }

        res.json("");
    })
);
