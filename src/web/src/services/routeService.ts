import { GameObjectFormResult } from "@shared/GameObjectFormResult";


/**
 * Voegt een gameobject toe aan de database.
 * @param formData De gegevens van het toe te voegen gameobject.
 * @returns Een Promise<boolean> die aangeeft of de toevoeging succesvol was.
 */
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


/**
 * Haalt alle gameobjecten op uit de database.
 * @returns Een Promise<any> met het array van gameobjecten als de operatie succesvol is, anders wordt false geretourneerd.
 */
export async function getGameObjects(): Promise<any> {
    
    try {
        
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {

            const gameObjects: GameObjectFormResult[] = await response.json();
            return gameObjects;

        } else {

            return false; 

        }

    } catch (error) {

        console.error("Error getting game objects:", error);
        return false;

    }

}