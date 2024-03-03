import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase } from "/HBO ICT PB1-tafau/jooduumeenii48/src/api/src/services/databaseServices";
import { ResultSetHeader, PoolConnection } from "mysql2/promise";

export const router: Router = Router();



router.post("/gameobject/add", asyncHandler(async (req, res) => {

    const formData: GameObjectFormResult = req.body as GameObjectFormResult;

    if (!formData.alias || !formData.name || !formData.description || !formData.type) {
        res.status(400).send("Alias, name, description, and type are required.");
        return;
    }

    if ((formData.type === "Item" && !formData.price) || (formData.type === "Character" && !formData.hp)) {
        res.status(400).send(formData.type === "Item" ? "Price is required for an Item." : "HP is required for a Character.");
        return;
    }


    let connection: PoolConnection | undefined = undefined;

    try {
        connection = await getConnection();

        /**
         * await connection.beginTransaction() is als het starten van een speciaal soort spel in een computerspel.
         * Het betekent dat alle acties die je doet in dat spel bij elkaar horen en als één geheel worden uitgevoerd. 
         * Als je begint met dit speciale spel, worden alle bewegingen die je maakt, zoals het verplaatsen van je personage of het verzamelen van voorwerpen, 
         * onderdeel van dat speciale spel totdat je het spel beëindigt. Het helpt om te zorgen dat alles in de juiste volgorde en zonder problemen verloopt. 
        */
        await connection.beginTransaction();
        console.log("Begin transaction");

        const gameObjectQueryResult: ResultSetHeader = await queryDatabase(connection,
            "INSERT INTO gameobject (alias, name, description, type) VALUES (?, ?, ?, ?)",
            formData.alias,
            formData.name,
            formData.description,
            formData.type
        );

        const gameObjectId: number | undefined = gameObjectQueryResult.insertId;

        if (gameObjectId !== undefined) {

            if (formData.type === "Item") {

                await queryDatabase(connection,
                    "INSERT INTO item (id, price) VALUES (?, ?)",
                    gameObjectId,
                    formData.price
                );

            } else if (formData.type === "Character") {

                await queryDatabase(connection,
                    "INSERT INTO `character` (id, hp) VALUES (?, ?)",
                    gameObjectId,
                    formData.hp
                );

            } else if (formData.type === "Room") {

                await queryDatabase(connection,
                    "INSERT INTO room (id) VALUES (?)",
                    gameObjectId
                );

            }

            await connection.commit();
            console.log("Commit");

            console.log("Inserted successfully");
            res.status(204).end();

        } else {

            console.error("Failed to retrieve the inserted GameObject ID.");
            res.status(500).send("Failed to insert data.");

        }

    } catch (error) {

        console.error(error);
        if (connection) await connection.rollback();
        res.status(500).send("Internal Server Error");

    } finally {

        if (connection) {

            connection.release();
            console.log("Connection released");

        }

    }

}));

/**
 * Dit is een GET-verzoek om gegevens weer te kunnen geven.
 */
router.get("/gameobject/getAll", asyncHandler(async (_req, res) => {

    console.log("GET DATA \n");

    let connection: PoolConnection | undefined = undefined;


    try {

        connection = await getConnection();

        await connection.beginTransaction();
        console.log("Begin transaction");

        const resultAllGameObject: any[] = await queryDatabase(connection,
            "SELECT g.id, g.alias, g.name, g.description, g.type, i.price, c.hp FROM gameobject AS g LEFT JOIN item AS i ON g.id = i.id LEFT JOIN room AS r ON g.id = r.id LEFT JOIN `character` AS c ON g.id = c.Id ORDER BY g.id ASC;"
        );

        console.log(resultAllGameObject);

        if (resultAllGameObject !== undefined) {

            res.json(resultAllGameObject);

            console.log("Data selected successfully");
            res.status(204).end();

        } else {

            console.error("Failed to get data.");
            res.status(500).send("Failed to get data.");

        }

    } catch (error) {

        console.error(error);
        
        if (connection) await connection.rollback();
        res.status(500).send("Internal Server Error");

    } finally {

        if (connection) {

            connection.release();
            console.log("Connection released");

        }

    }

}));


/**
 * Dit is een POST-verzoek om een gameobject te kunnen verwijderen.
 */
router.post("/gameobject/delete", asyncHandler(async (req, res) => {

    console.log("DELETE \n");

    const formData: GameObjectFormResult = req.body as GameObjectFormResult;

    if (!formData.id) {
        res.status(400).send("Failed to delete data.");
        return;
    }


    let connection: PoolConnection | undefined = undefined;

    try {
        connection = await getConnection();

        await connection.beginTransaction();
        console.log("Begin transaction");

        const deleteGameObject: ResultSetHeader = await queryDatabase(connection,
            "DELETE FROM gameobject WHERE id = ?",
            formData.id,
        );

        if (deleteGameObject) {

            await connection.commit();
            console.log("Commit");

            console.log("Deleted successfully");
            res.status(204).end();

        } else {

            console.error("Failed to delete gameobject data.");
            res.status(500).send("Failed to delete data.");

        }

    } catch (error) {

        console.error(error);

        if (connection) await connection.rollback();
        res.status(500).send("Internal Server Error");

    } finally {

        if (connection) {

            connection.release();
            console.log("Connection released");

        }

    }

}));


/**
 * Dit is een POST-verzoek om een gameobject te kunnen bewerken.
 */
router.post("/gameobject/update", asyncHandler(async (req, res) => {

    console.log("UPDATE \n");

    const formData: GameObjectFormResult = req.body as GameObjectFormResult;

    let connection: PoolConnection | undefined = undefined;

    try {

        connection = await getConnection();
        console.log(connection);
        await connection.beginTransaction();
        console.log("Begin transaction");

        const updateGameObjectQuery: ResultSetHeader = await queryDatabase(connection,
            "UPDATE gameobject SET alias = ?, name = ?, description = ?, type = ? WHERE id = ?",
            formData.alias,
            formData.name,
            formData.description,
            formData.type,
            formData.id
        );

        console.log(updateGameObjectQuery);

        if (updateGameObjectQuery) {

            if (formData.type === "Item") {

                await queryDatabase(connection,
                    "UPDATE item SEt price = ? WHERE id = ?",
                    formData.price,
                    formData.id
                );

            } else if (formData.type === "Character") {

                await queryDatabase(connection,
                    "UPDATE `character` SET hp = ? WHERE id = ?",
                    formData.hp,
                    formData.id
                );

            } else if (formData.type === "Room") {

                await queryDatabase(connection,
                    "UPDATE gameobject SET alias = ?, name = ?, description = ?, type = ? WHERE id = ?",
                    formData.alias,
                    formData.name,
                    formData.description,
                    formData.type,
                    formData.id
                );

                await connection.commit();
                console.log("Commit");

                console.log("Updated successfully");
                res.status(204).end();

            }

        } else {

            console.error("Failed to update gameobject.");
            res.status(500).send("Failed to update data.");

        }

    } catch (error) {

        console.error(error);

        if (connection) await connection.rollback();
        res.status(500).send("Internal Server Error");  

    } finally {

        if (connection) {

            connection.release();
            console.log("Connection released");

        }

    }

}));

