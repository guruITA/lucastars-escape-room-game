import { GameObjectFormResult } from "@shared/GameObjectFormResult";

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


export async function getGameObjects(): Promise<false | GameObjectFormResult[] | null> {
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