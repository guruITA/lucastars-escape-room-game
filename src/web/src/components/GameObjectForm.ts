import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";

import { addGameObject } from "../../services/routeService";


@customElement("gameobject-form")
export class GameObjectForm extends LitElement {


    @property() private selection: string = "";
    @property() private selectedType: string = "";
    @property() private isSuccess: boolean = false;
    @property() private isError: boolean = false;


    private handleTypeChange(event: Event): void {

        this.requestUpdate();

        /**event.target wordt gebruikt binnen de handleTypeChange-methode om het geselecteerde element van de combobox te verkrijgen. Door event.target te gebruiken, kunnen we het geselecteerde waarde van de combobox (de waarde van het select-element) krijgen, en op basis daarvan het gedrag van de rest van de applicatie aanpassen. Dit stelt ons in staat om het weergeven of verbergen van bepaalde velden in het formulier te regelen op basis van de selectie van de gebruiker. */
        this.selection = (event.target as HTMLSelectElement).value;

        switch(this.selection) {

            case "1" :
                this.selectedType = "Item";
                break;

            case "2" :
                this.selectedType = "Room";
                break;

            case "3":
                this.selectedType = "Character";
                break;

        }
        
    }

    private async handleButtonClick(event: Event): Promise<void> {

        event.preventDefault();
        
        const aliasInput: HTMLInputElement = this.shadowRoot!.querySelector("#alias") as HTMLInputElement;
        const nameInput: HTMLInputElement = this.shadowRoot!.querySelector("#name") as HTMLInputElement;
        const descriptionInput: HTMLTextAreaElement = this.shadowRoot!.querySelector("#description") as HTMLTextAreaElement;
        const priceInput: HTMLInputElement = this.shadowRoot!.querySelector("#price") as HTMLInputElement;
        const hpInput: HTMLInputElement = this.shadowRoot!.querySelector("#hp") as HTMLInputElement;

        const GameObjectFormResult: GameObjectFormResult = {
            alias: aliasInput.value,
            name: nameInput.value,
            description: descriptionInput.value,
            type: this.selectedType,
            price: this.selection === "1" ? parseFloat(priceInput.value) : undefined,
            hp: this.selection === "3" ? parseInt(hpInput.value) : undefined
        };

        console.log("Form data:", GameObjectFormResult);

        const success: boolean = await addGameObject(GameObjectFormResult);

        if (success) {
            this.isSuccess = true;
            this.isError = false;
            console.log("Added succesfully");
        } else {
            this.isSuccess = false;
            this.isError = true;
            console.log("Failed adding");
        }
    
    }


    public static styles = css`
    .success {
        color: green;
    }

    .error {
        color: red;
    }
`;


    public render(): TemplateResult<1> {

        return html`
            <h2>Game Object Form</h2>
            ${this.isSuccess ? html`<div class="success">Successfully added!</div>` : ""}
            ${this.isError ? html`<div class="error">Failed to add. Please check your data.</div>` : ""}
            <form>
                <custom-input-element label="Alias" type="text" Id="alias"></custom-input-element>
                <custom-input-element label="Name" type="text" Id="name"></custom-input-element>
                <div>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" rows="4"></textarea>
                </div>
                <div>
                    <label for="type">Type:</label>
                    <select id="type" name="type" @change="${this.handleTypeChange}">
                        <option value=""></option>
                        <option value="1">Item</option>
                        <option value="2">Room</option>
                        <option value="3">Character</option>
                    </select>
                </div>  
                ${this.selection === "1" ? html`                
                <div id="priceField">
                    <label for="price">Price:</label>
                    <input type="number" id="price" name="price" min="0" step="0.01">
                </div>` : ""}
                ${this.selection === "3" ? html`
                <div id="hpField">
                    <label for="hp">HP:</label>
                    <input type="number" id="hp" name="hp" min="0" step="1">
                </div>` : ""}
                <button type="button" id="submitButton" @click="${this.handleButtonClick}">Add ${this.selectedType}</button>
            </form>
        `;

    }
}
