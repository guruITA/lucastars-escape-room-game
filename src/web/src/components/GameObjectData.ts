import { html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { getGameObjects, deleteGameObject } from "../services/routeService";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { gameService } from "../services/GameServices";


/**
 * Component met GameObject tabellen (item, character en room) te zien krijgt met update kan je de geselecteerde gameobject waarden sturen naar de formulier en met de delete knop verwijder je de gameobject uit de database.
 * Het weergeven en verwijderen van de Gameobjecten wordt ook verwerkt in de database
 */
@customElement("game-object-data")
export class LoadDatabase extends LitElement {


    @state() private gameObjects: GameObjectFormResult[] = [];


    /**
    * Deze actie gebeurt wanneer het onderdeel in de component wordt toegevoegd.
    */
    public async connectedCallback(): Promise<void> {


        // Zorgt ervoor dat de Originele connectedCallback functie eerst word uitgevoerd, voordat mijn toegevoegde functie(s) worden uitgevoerd.
        super.connectedCallback();

        // Ik voeg hier de getAllItems functie toe en dit zorgt ervoor dat hij de functie overridet om de gameobjecten weer te kunnen geven
        await this.getAllItems();

    }



    /**
     * Haalt alle data van de gameobjecten.
     * 
     * @returns {Promise<void>} Een Promise die aangeeft wanneer het ophalen van de items is voltooid.
     */
    private async getAllItems(): Promise<void> {

        try {

            this.gameObjects = await getGameObjects();
            console.log(this.gameObjects);

        } catch (error) {

            console.log("Failed to get gameobject data: ", error);

        }

    }


    /**
     * Verwijdert het geselecteerde gameobject uit de database.
     * @param id Met behulp vn de `id` kan je de gameobject verwijderd uit de database.
     */
    private async deleteData(id: number | undefined): Promise<void> {

        try {

            const confirmDelete: boolean = confirm("Are you sure you want to delete this?");

            if (confirmDelete) {

                await deleteGameObject(id);
                location.reload();
                console.log("Deleted succesfully");


            } else {

                console.log("Error while deleting");

            }

        } catch (error) {

            console.log("Failed to delete gameobject data", error);

        }

    }


    /**
    * Toont de gegevens van het geselecteerde gameobject in een gameobject formulier component.
    * 
    * @param element Het geselecteerde gameobject die moet worden weergegeven.
    */
    private showSelectedData(element: any): void {

        try {

            console.log("test");

            // Stuurt met behulp van Dispatcht een edit-form event met de gegevens van het geselecteerde gameobject
            gameService.dispatchEvent("edit-form", {

                entry: element

            });


        } catch (error) {

            console.log("Failed to update gameobject data", error);

        }

    }

    // Dit kan aangepast woorden want als er geen objecten zijn met die aangegeven type zie je dan onnodige lege tabelkopjes te zien

    /**
     * Render de tabel met gameobjecten type `Item`.
     * @returns Een TemplateResult die de tabel weergeeft.
     */
    private renderItemTable(): TemplateResult {

        return html`
        
            <h2>Items</h2>

            <table style="width:100%" id="Item">

                <tr>
                    <th>Id</th>
                    <th>Alias</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>

                ${this.gameObjects.map(element => {

            if (element.type === "Item") {

                return html`

                            <tr>
                                <td>${element.id}</td>
                                <td>${element.alias}</td>
                                <td>${element.name}</td>
                                <td>${element.description}</td>
                                <td>${element.type}</td>
                                <td>${element.price}</td>
                                <td><button type="button" @click="${(): void => this.showSelectedData(element)}" id="updateButton">Update</button></td>
                                <td><button type="button" @click="${(): Promise<void> => this.deleteData(element.id)}" id="deleteButton">Delete</button></td>
                            </tr>

                        `;

            } else {

                return html``;

            }
        })}
        
            </table>

        `;

    }


    /**
     * Render de tabel met gameobjecten type "Room".
     * @returns Een TemplateResult die de tabel weergeeft.
     */
    private renderRoomTable(): TemplateResult {

        return html`

            <h2>Rooms</h2>

            <table style="width:100%" id="Room">

                <tr>
                    <th>Id</th>
                    <th>Alias</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>

                ${this.gameObjects.map(element => {

            if (element.type === "Room") {

                return html`

                            <tr>
                                <td>${element.id}</td>
                                <td>${element.alias}</td>
                                <td>${element.name}</td>
                                <td>${element.description}</td>
                                <td>${element.type}</td>
                                <td><button type="button" @click="${(): void => this.showSelectedData(element)}" id="updateButton">Update</button></td>
                                <td><button type="button" @click="${(): Promise<void> => this.deleteData(element.id)}" id="deleteButton">Delete</button></td>
                            </tr>

                        `;

            } else {

                return html``;

            }
        })}

            </table>

        `;

    }


    /**
     * Render de tabel met gameobjecten type "Character".
     * @returns Een TemplateResult die de tabel weergeeft.
     */
    private renderCharacterTable(): TemplateResult {

        return html`

            <h2>Character</h2>

            <table style="width:100%" id="Room">

                <tr>
                    <th>Id</th>
                    <th>Alias</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>HP</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>

                ${this.gameObjects.map(element => {

            if (element.type === "Character") {

                return html`

                            <tr>
                                <td>${element.id}</td>
                                <td>${element.alias}</td>
                                <td>${element.name}</td>
                                <td>${element.description}</td>
                                <td>${element.type}</td>
                                <td>${element.hp}</td>
                                <td><button type="button" @click="${(): void => this.showSelectedData(element)}" id="updateButton">Update</button></td>
                                <td><button type="button" @click="${(): Promise<void> => this.deleteData(element.id)}" id="deleteButton">Delete</button></td>
                            </tr>

                        `;

            } else {

                return html``;

            }

        })}

            </table>

        `;

    }


    /**
     * Render alle tabellen van gameobjecten.
     * @returns Een TemplateResult die alle tabellen weergeeft.
     */
    public render(): TemplateResult {

        return html`

            ${this.renderItemTable()}
            ${this.renderRoomTable()}
            ${this.renderCharacterTable()}

        `;

    }

}
