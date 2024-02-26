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

export async function getGameObject(formData: GameObjectFormResult): Promise<boolean> {
    try {
        
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/get`, {
            method: "GET",
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
        console.error("Error updating game object:", error);
        return false;
    }
}

export async function updateGameObject(formData: GameObjectFormResult): Promise<boolean> {
    try {
        
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/update`, {
            method: "PUT",
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
        console.error("Error updating game object:", error);
        return false;
    }
}

export async function deleteGameObject(formData: GameObjectFormResult): Promise<boolean> {
    try {
        
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/delete`, {
            method: "DELETE",
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
        console.error("Error deleting game object:", error);
        return false;
    }
}