import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase } from "./services/databaseService";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { ResultSetHeader } from "mysql2";
export const router: Router = Router();

router.get("/", (_req, res) => {
    res.json("");
});

router.get(
    "/gameobject",
    asyncHandler(async (req, res) => {
        let data: Array<any>;

        try {
            const db: any = await getConnection();

            const gameObjects: any = await queryDatabase(db, "SELECT * FROM gameobject");

            res.status(200);
            data = gameObjects;
        } catch (error) {
            console.log(error);
        }

        res.send(data);
    })
);

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

router.delete(
    "/gameobject",
    asyncHandler(async (req, res) => {
        try {
            const db: any = await getConnection();

            switch (req.body.type) {
                case "item":
                    console.log("item");
                    break;
                case "room":
                    console.log("room");
                    break;
                case "character":
                    console.log("character");
                    break;
            }

            const deleteObjectResult: ResultSetHeader = await queryDatabase(
                db,
                "DELETE FROM gameobject WHERE gameobject.id = ?",
                req.body
            );

            res.status(200);
            res.json(deleteObjectResult);
        } catch (error) {
            res.status(500);
            res.json(error);
        }
    })
);
