import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase } from "./services/databaseService";
import { ResultSetHeader, PoolConnection } from "mysql2/promise";


export const router: Router = Router();


/**
 * Dit is een POST-verzoek om een nieuw gameobject toe te voegen.
 */
router.post("/gameobject/add", asyncHandler(async (req, res) => {

    console.log("ADD DATA \n");

    // Hier haal ik gegevens op metbehulp van de request en stop ik het in de GameObjectFormResult variabele
    const formData: GameObjectFormResult = req.body as GameObjectFormResult;

    // Hier controleer ik of de velden zijn ingevuld krijg je een status melding 400 te zien
    if (!formData.alias || !formData.name || !formData.description || !formData.type) {
        res.status(400).send("Alias, name, description, and type are required.");
        return;
    }

    if ((formData.type === "Item" && !formData.price) || (formData.type === "Character" && !formData.hp)) {
        res.status(400).send(formData.type === "Item" ? "Price is required for an Item." : "HP is required for a Character.");
        return;
    }

    // Variabele voor de database verbinding
    let connection: PoolConnection | undefined = undefined;

    try {

        // Variabele voor het krijgen van de databaseverbinding
        connection = await getConnection();

        // Als er iets misgaat kunnen je alle veranderingen die er gemaakt zijn ongedaan maken. 
        // Het helpt om ervoor te zorgen dat de database altijd in een goede blijft zelfs als er problemen zijn tijdens het verwerken van gegevens.
        await connection.beginTransaction();
        console.log("Begin transaction");

        // Hier zit de query om gegevens toe te kunnen voegen
        const gameObjectQueryResult: ResultSetHeader = await queryDatabase(connection,
            "INSERT INTO gameobject (alias, name, description, type) VALUES (?, ?, ?, ?)",
            formData.alias,
            formData.name,
            formData.description,
            formData.type
        );

        // Hier krijg de toe gevoegde gameobject insert id
        const gameObjectId: number | undefined = gameObjectQueryResult.insertId;

        // Als je de id krijgt
        if (gameObjectId !== undefined) {

            // Als forData.type (item, character of room) voeg ik het aan het juiste tabel toe
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

            // Dit bevestigt alle veranderingen die zijn aangebracht binnen de transactie en maakt ze permanent in de database.
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

        // Dit wordt gebruikt om alle wijzigingen die zijn aangebracht binnen de huidige transactie ongedaan te maken.
        if (connection) await connection.rollback();
        res.status(500).send("Internal Server Error");

    } finally {

        if (connection) {

            // Dit wordt gebruikt om de databaseverbinding vrij te geven nadat alle bewerkingen zijn uitgevoerd.
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

        await connection.beginTransaction();
        console.log("Begin transaction");

        const updateGameObjectQuery: ResultSetHeader = await queryDatabase(connection,
            "UPDATE gameobject SET alias = ?,    name = ?, description = ?, type = ? WHERE id = ?",
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
                    "UPDATE `character` SET hp = ? WHERE = ?",
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




/**
Router:
 
De Router wordt geïnitialiseerd om endpoints te definiëren voor verschillende soorten aanvragen.

POST /gameobject/add:

Dit endpoint voegt een nieuw gameobject toe aan de database.
Het ontvangt gegevens van een nieuw gameobject via een POST-verzoek, valideert de invoer en voegt deze toe aan de database.
Er wordt een transactie gestart om de integriteit van de gegevens te waarborgen.
De invoer wordt gecontroleerd en toegevoegd aan de database, waarbij verschillende tabellen worden bijgewerkt op basis van het type gameobject.

GET /gameobject/getAll:

Dit endpoint haalt alle gameobjecten op uit de database.
Het voert een query uit om alle gameobjecten op te halen, inclusief bijbehorende informatie zoals prijs voor items en HP voor personages.
De resultaten worden teruggestuurd als een JSON-respons.

POST /gameobject/delete:

Dit endpoint verwijdert een gameobject uit de database op basis van het meegeleverde ID.
Het ontvangt het ID van het te verwijderen gameobject, voert de verwijderingsquery uit en bevestigt de transactie.

POST /gameobject/update:

Dit endpoint bijwerkt een bestaand gameobject in de database.
Het ontvangt de bijgewerkte gegevens van een gameobject via een POST-verzoek, voert de update-query uit en bevestigt de transactie.
Afhankelijk van het type gameobject worden bijwerkingen uitgevoerd op gerelateerde tabellen, zoals het bijwerken van de prijs voor items of HP voor personages.
 */