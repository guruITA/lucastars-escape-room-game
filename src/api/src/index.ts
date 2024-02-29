import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import { router } from "../../web/src/routes";

export const app: Express = express();

config();
config({ path: ".env.local", override: true });

app.use(cors());
app.use(express.json());

app.use(router);

/**
 
De poort waarop de server moet luisteren voor inkomende verzoeken.
Als de omgevingsvariabele 'PORT' is ingesteld, word die waarde voor de server gebruikt.
zo niet, luistert de server op poort 8080.
*/
const port: number = (process.env.PORT || 8080) as number;

app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});

