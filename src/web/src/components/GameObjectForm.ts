import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import "./CustomInputElement";
import "./GameObjectData";
import { addGameObject, updateGameObject } from "../services/routeService";
import { gameService } from "../services/GameServices";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    // Declaratie van de private properties met behulp van de state decorator
    @state() private gameObjectId: number | undefined = 0;
    @state() private alias: string = "";
    @state() private name: string = "";
    @state() private type: string = "";
    @state() private description: string = "";
    @state() private price: number | undefined = 0;
    @state() private hp: number | undefined = 0;
    @state() private selection: string = "";
    @state() private selectedType: string = "";
    @state() private isSuccess: boolean = false;
    @state() private isError: boolean = false;

    // Deze functie wordt uitgevoerd wanneer de component aan het DOM wordt toegevoegd
    public connectedCallback(): void {
        super.connectedCallback();
        // Eventlistener toevoegen voor het bewerken van formulieren
        gameService.addEventListener("edit-form", (element: any) => {
            const showData: GameObjectFormResult = element.data.entry;
            // Data van het game object invullen in de formulier velden
            this.gameObjectId = showData.id;
            this.alias = showData.alias;
            this.name = showData.name;
            this.description = showData.description;
            this.type = showData.type;
            this.price = showData.price;
            this.hp = showData.hp;

            // Controleren van het type om de selectie en geselecteerde type bij te werken
            switch (this.type) {
                case "Item":
                    this.selection = "1";
                    this.price = showData.price;
                    this.selectedType = "Item";
                    break;
                case "Room":
                    this.selection = "2";
                    this.selectedType = "Room";
                    break;
                case "Character":
                    this.selection = "3";
                    this.price = showData.hp;
                    this.selectedType = "Character";
                    break;
            }
        });
    }

    // Functie om gegevens bij te werken
    private async updateData(): Promise<void> {
        // Formulier gegevens verzamelen
        const GameObjectFormResult: GameObjectFormResult = {
            id: this.gameObjectId,
            alias: this.alias,
            name: this.name,
            description: this.description,
            type: this.selectedType,
            price: this.selection === "1" ? this.price : undefined,
            hp: this.selection === "3" ? this.hp : undefined
        };

        try {
            // Update uitvoeren van het game object
            const updateData: boolean = await updateGameObject(GameObjectFormResult);
            if (updateData) {
                console.log("Succesvol bijgewerkt");
                window.location.reload();
            } else {
                console.log("Bijwerken mislukt");
            }
        } catch (error) {
            console.error("Fout bij het bijwerken van game object gegevens: ", error);
        }
    }

    // Functie om formuliergegevens toe te voegen
    private async handleButtonClick(event: Event): Promise<void> {
        event.preventDefault();
        // Formulier gegevens verzamelen
        const GameObjectFormResult: GameObjectFormResult = {
            alias: this.alias,
            name: this.name,
            description: this.description,
            type: this.selectedType,
            price: this.selection === "1" ? this.price : undefined,
            hp: this.selection === "3" ? this.hp : undefined
        };

        try {
            // Toevoegen van game object
            const success: boolean = await addGameObject(GameObjectFormResult);
            if (success) {
                this.isSuccess = true;
                this.isError = false;
                console.log("Succesvol toegevoegd");
                window.location.reload();
            } else {
                this.isSuccess = false;
                this.isError = true;
                console.log("Toevoegen mislukt");
            }
        } catch (error) {
            console.error("Fout bij het toevoegen van game object:", error);
        }
    }

    // Functie om het geselecteerde type te wijzigen
    private handleTypeChange(event: Event): void {
        this.selection = (event.target as HTMLSelectElement).value;
        switch (this.selection) {
            case "1":
                this.selectedType = "Item";
                break;
            case "2":
                this.selectedType = "Room";
                break;
            case "3":
                this.selectedType = "Character";
                break;
        }
    }

    // Functie om invoergegevens bij te werken
    private input(event: InputEvent): void {
        const target: HTMLInputElement | HTMLTextAreaElement = event.target as HTMLInputElement | HTMLTextAreaElement;
        const id: string = target.id;
        const value: string = target.value;

        switch (id) {
            case "alias":
                this.alias = value;
                break;
            case "name":
                this.name = value;
                break;
            case "description":
                this.description = value;
                break;
            case "price":
                this.price = parseFloat(value);
                break;
            case "hp":
                this.hp = parseInt(value);
                break;
        }
    }

    // CSS voor de component
    public static styles = css`
        .form-container {
            width: 100%;
            max-width: 500px;
            margin: 0 auto; /* Center de formuliercontainer */
        }

        /* Stijlen voor formulieronderdelen */
        .form-group {
            margin-bottom: 10px;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input[type="text"],
        textarea,
        select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        /* Stijlen voor de knoppen */
        .button-group button {
            margin-right: 10px;
        }

        /* Stijlen voor succes- en foutmeldingen */
        .success {
            color: green;
        }

        .error {
            color: red;
        }
    `;

    // Renderen van het formulier
    public gameObjectForm(): TemplateResult<1> {
        return html`
            <div class="form-container">
                <h2>Game Object Form</h2>
                ${this.isSuccess ? html`<div class="success">Succesvol toegevoegd!</div>` : ""}
                ${this.isError ? html`<div class="error">Toevoegen mislukt. Controleer uw gegevens.</div>` : ""}
                <form>
                    <div class="form-group">
                        <custom-input-element label="Alias" type="text" id="alias" @input=${this.input} .value=${this.alias}></custom-input-element>
                        <custom-input-element label="Name" type="text" id="name" @input=${this.input} .value=${this.name}></custom-input-element>
                    </div>
                    <div class="form-group">
                        <label for="description">Beschrijving:</label>
                        <textarea id="description" name="description" rows="4" @input=${this.input} .value=${this.description}></textarea>
                    </div>
                    <div class="form-group">
                        <label for="type">Type:</label>
                        <select id="type" name="type" @change="${this.handleTypeChange}" .value=${this.selection} >
                            <option value="1">Item</option>
                            <option value="2">Room</option>
                            <option value="3">Character</option>
                        </select>
                    </div>
                    ${this.selection === "1" ? html`
                        <div class="form-group">
                            <label for="price">Prijs:</label>
                            <input type="number" id="price" name="price" min="0" step="0.01" @input=${this.input} .value=${this.price}>
                        </div>` : ""}
                    ${this.selection === "3" ? html`
                        <div class="form-group">
                            <label for="hp">HP:</label>
                            <input type="number" id="hp" name="hp" min="0" step="1" @input=${this.input} .value=${this.price}>
                        </div>` : ""}
                    <div class="button-group">
                        <button type="button" id="submitButton" @click="${this.handleButtonClick}">Toevoegen ${this.selectedType}</button>
                        <button type="button" id="updateButton" @click="${this.updateData}">Bijwerken ${this.selectedType}</button>
                    </div>
                </form>
            </div>
        `;
    }

    // Renderfunctie van de component
    public render(): TemplateResult<1> {
        return html`${this.gameObjectForm()}`;
    }
}
