import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase } from "./services/databaseService"; 
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


        const gameObjectQueryResult: ResultSetHeader = await queryDatabase(connection, "INSERT INTO gameobject (alias, name, description) VALUES (?, ?, ?)", formData.alias, formData.name, formData.description);

        const gameObjectId: number | undefined = gameObjectQueryResult.insertId;

        if (gameObjectId !== undefined) {

            if (formData.type === "Item") {
                await queryDatabase(connection, "INSERT INTO item (id, price) VALUES (?, ?)", gameObjectId, formData.price);
            } else if (formData.type === "Character") {
                await queryDatabase(connection, "INSERT INTO `character` (id, hp) VALUES (?, ?)", gameObjectId ,formData.hp);
            } else if (formData.type === "Room") {
                await queryDatabase(connection, "INSERT INTO room (id) VALUES (?)", gameObjectId);
            }

            /** 
             * await connection.commit() wordt gebruikt om alle wijzigingen die binnen een database transactie zijn gemaakt permanent te maken. 
             * Stel je voor dat je een lijst met taken hebt die je allemaal wilt uitvoeren, maar je wilt ze allemaal tegelijkertijd bevestigen of geen van allen. 
             * Met await connection.commit() vertel je de database dat je alle wijzigingen die je in de transactie hebt gemaakt wilt behouden en permanent wilt maken.
             * Dit betekent dat de database de veranderingen zal opslaan en ze niet ongedaan zal maken, zelfs als er een fout optreedt nadat de commit-opdracht is uitgevoerd.
             * Dit is het tegenovergestelde van rollback, waarbij alle wijzigingen worden teruggedraaid.
            */
            await connection.commit();

            console.log("Inserted successfully");
            res.status(204).end(); 
        } else {
            console.error("Failed to retrieve the inserted GameObject ID.");
            res.status(500).send("Failed to insert data.");
        }
    } catch (error) {
        console.error(error);

        /** 
         * await connection.rollback() wordt gebruikt in databases om terug te gaan naar de manier waarop de database was voordat we begonnen met het doen van een aantal veranderingen.
         * Stel je voor dat we een aantal dingen in een database veranderen, maar er gaat iets mis. Met connection.rollback() kunnen we die veranderingen ongedaan maken en de database 
         * terugzetten naar hoe het was voordat we begonnen met die veranderingen. Het is als een "terug" knop voor de database. 
        */
        if (connection) await connection.rollback(); 
        res.status(500).send("Internal Server Error"); 
    } finally {
        if (connection) {

            /**
             * connection.release() wordt gebruikt om de databaseverbinding vrij te geven nadat we klaar zijn met het uitvoeren van onze databasebewerkingen.
             * Stel je voor dat je een telefoonlijn gebruikt om met de database te praten. Nadat we onze boodschap hebben doorgegeven en onze taken zijn voltooid,
             * hangen we eigenlijk de telefoon op zodat andere mensen deze kunnen gebruiken. Met connection.release() vertellen we de database dat we klaar zijn met de verbinding 
             * en dat deze beschikbaar is voor andere taken of verzoeken. Dit helpt om middelen efficiënt te beheren en voorkomt dat de database te veel verbindingen 
             * tegelijkertijd vasthoudt.
             */
            connection.release();
        }
    }
}));
