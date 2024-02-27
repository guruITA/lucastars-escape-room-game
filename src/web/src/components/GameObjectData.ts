import { html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { getGameObjects } from "../services/routeService";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";

@customElement("game-object-data")
export class LoadDatabase extends LitElement {


    @state() private gameObjects: GameObjectFormResult[] = [];


    /**
     * Zorgt ervoor dat de data beschikbaar is voor het renderen.
     */
    public async connectedCallback(): Promise<void> {

        super.connectedCallback();
        await this.getAllItems();

    }


    /**
     * Haalt alle items op vanuit de database.
     */
    private async getAllItems(): Promise<void> {

        try {

            this.gameObjects = await getGameObjects();
            console.log(this.gameObjects);

        } catch (error) {

            console.log(error);

        }

    }


    /**
     * Render de tabel voor items.
     * @returns Een TemplateResult voor de tabel met items.
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
                                <td><button type="button" id="updateButton">Update</button></td>
                                <td><button type="button" id="deleteButton">Delete</button></td>
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
     * Render de tabel voor kamers.
     * @returns Een TemplateResult voor de tabel met kamers.
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
                                <td><button type="button" id="updateButton">Update</button></td>
                                <td><button type="button" id="deleteButton">Delete</button></td>
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
     * Render de tabel voor karakters.
     * @returns Een TemplateResult voor de tabel met karakters.
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
                                <td><button type="button" id="updateButton">Update</button></td>
                                <td><button type="button" id="deleteButton">Delete</button></td>
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
     * Render functie voor het component.
     * @returns Een TemplateResult voor de render van het component.
     */
    public render(): TemplateResult {
        return html`
            ${this.renderItemTable()}
            ${this.renderRoomTable()}
            ${this.renderCharacterTable()}
        `;
    }

}
