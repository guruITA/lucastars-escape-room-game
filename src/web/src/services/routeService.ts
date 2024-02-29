import { GameObjectFormResult } from "../../../shared/GameObjectFormResult";

export async function addGameObject(formData: GameObjectFormResult): Promise<boolean> {

    try {
        
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/add`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),

        });

        if (response.ok) {

            return true;

        } else {

            return false;

        }

    } catch (error) {

        console.error("Error adding game object:", error);
        return false;

    }
}

export async function getGameObjects(): Promise<any> {
    try {
        // Een API-aanroep om alle game objecten op te halen.
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Controleert of de API-call succesvol was.
        if (response.ok) {
            const gameObjects: GameObjectFormResult[] = await response.json();
            return gameObjects;

        } else {
            return false; 
        }
    } catch (error) {
        // Logt eventuele fouten die tijdens het ophalen zijn opgetreden.
        console.error("Error getting game objects:", error);
        return false;
    }
}

    export async function updateGameObject(element: GameObjectFormResult): Promise<boolean> {
        try {
            // Een API-aanroep om een game object bij te werken.
            const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/update`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(element),
            });
            
            // Controleert of de API-call succesvol was.
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            // Logt eventuele fouten die tijdens het updaten zijn opgetreden.
            console.error("Error while updating game", error);
            return false;
        }
    }

    export async function deleteGameObject(id: number | undefined): Promise<boolean> {
        try {
            // Een API-aanroep om een game object te verwijderen
            const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: id}),
    
            });
            // Geeft waar terug als de API-aanroep succesvol was, anders false.
            return response.ok;
    
        } catch (error) {
            // Logt eventuele fouten die tijdens het verwijderen zijn opgetreden.
            console.error("Error deleting game object:", error);
            return false;
    
        }
    }



