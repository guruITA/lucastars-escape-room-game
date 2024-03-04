export async function addGameObject(formData: GameObjectFormResult): Promise<boolean> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/add`, {
            method: "post",
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
        console.log(error);
        return false;
    }
}

export async function getGameObjects(): Promise<any> {
    const response: any = await fetch(`${viteConfiguration.API_URL}gameobject`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.json();
}
