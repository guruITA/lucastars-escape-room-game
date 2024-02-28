/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { getGameObjects, deleteGameObject } from "../services/routeService";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { gameService } from "../services/GameServices";

@customElement("game-object-data")
export class LoadDatabase extends LitElement {


    @state() private gameObjects: GameObjectFormResult[] = [];


    /**
     * Wordt aangeroepen zodra de eerste render plaatsvindt, zorgt ervoor dat de data beschikbaar is voor het renderen.
     */
    public async connectedCallback(): Promise<void> {

        super.connectedCallback();
        await this.getAllItems();

    }


    /**
     * 
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
     * 
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
    * 
    */
    private showSelectedData(element: any) {

        try {

            console.log("test");

            gameService.dispatchEvent("edit-form", { 
                entry: element
            });


        } catch (error) {

            console.log("Failed to update gameobject data", error);

        }

    }

    


    /**
     * 
     * @returns 
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
                                <td><button type="button" @click="${() => this.showSelectedData(element)}" id="updateButton">Update</button></td>
                                <td><button type="button" @click="${() => this.deleteData(element.id)}" id="deleteButton">Delete</button></td>
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
     * 
     * @returns 
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
                                <td><button type="button" @click="${() => this.showSelectedData(element)}" id="updateButton">Update</button></td>
                                <td><button type="button" @click="${() => this.deleteData(element.id)}" id="deleteButton">Delete</button></td>
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
     * 
     * @returns 
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
                                <td><button type="button" @click="${() => this.showSelectedData(element)}" id="updateButton">Update</button></td>
                                <td><button type="button" @click="${() => this.deleteData(element.id)}" id="deleteButton">Delete</button></td>
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
     * 
     * @returns 
     */
    public render(): TemplateResult {
        return html`
            ${this.renderItemTable()}
            ${this.renderRoomTable()}
            ${this.renderCharacterTable()}
        `;
    }

}
