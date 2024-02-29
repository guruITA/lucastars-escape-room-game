import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase, ResultSetHeader } from "./services/databaseService";
export const router: Router = Router();

//Initiate database connection
const db: any = getConnection();

router.get("/", (_req, res) => {
    res.json("");
});

router.post(
    "/gameobject/add",
    asyncHandler(async (req, res) => {
        if (
            !req.body.alias ||
            req.body.alias === "" ||
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
            const gameObjectResult: ResultSetHeader = await queryDatabase(
                db,
                "INSERT INTO gameobject (alias, name, description, type) VALUES (?,?,?,?)",
                [req.body.alias, req.body.name, req.body.description, req.body.type]
            );

            let query: string = `INSERT INTO ${req.body.type} `;
            let values: Array<string> = [gameObjectResult.insertId];

            switch (req.body.type) {
                case "item":
                    query += "(id, price) VALUES (?,?)";
                    values.push(req.body.price);
                    break;

                case "room":
                    query += "(id) VALUES (?)";
                    break;
                case "character":
                    query += "(id, hp) VALUES (?,?)";
                    values.push(req.body.hp);
                    break;
            }

            const typeInsertResult: ResultSetHeader = await queryDatabase(db, query, values);

            res.status(204);
        }

        res.json("");
    })
);
