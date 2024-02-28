/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import "./CustomInputElement";
import "./GameObjectData";
import { addGameObject, updateGameObject } from "../services/routeService";
import { gameService } from "../services/GameServices";


@customElement("gameobject-form")
export class GameObjectForm extends LitElement {

    /**Lit heeft twee manieren om een reactieve field te maken: met een @property- of @state-decorator. De werking is van beide exact hetzelfde,
     *  alleen is @property bedoeld voor public fields, en @state voor private fields. Een @property maakt daarnaast van een field ook een tag die in te stellen 
     * is op een Web Component. Een @state is puur voor intern gebruik. 
    */

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

    /**
    * Wordt aangeroepen zodra de eerste render plaatsvindt, zorgt ervoor dat de data beschikbaar is voor het renderen.
    */
    public connectedCallback() {

        super.connectedCallback();

        gameService.addEventListener("edit-form", (element: any) => {

            console.log(element);

            const showData: GameObjectFormResult = element.data.entry;
            this.gameObjectId = showData.id;
            this.alias = showData.alias;
            this.name = showData.name;
            this.description = showData.description;
            this.type = showData.type;
            this.price = showData.price;
            this.hp = showData.hp;

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

    /**
     * 
    */
    private async updateData(): Promise<void> {

        const GameObjectFormResult: GameObjectFormResult = {
            id: this.gameObjectId,
            alias: this.alias,
            name: this.name,
            description: this.description,
            type: this.selectedType,
            price: this.selection === "1" ? this.price : undefined,
            hp: this.selection === "3" ? this.hp : undefined
        };

        console.log("Form data:", GameObjectFormResult);

        try {

            const updateData: boolean = await updateGameObject(GameObjectFormResult);
            console.log(updateData);

        } catch (error) {

            console.error("Failed to get gameobject data: ", error);

        }

    }


    /**
     * 
     */
    private handleTypeChange(event: Event): void {

        /**
         * this.requestUpdate() is als een verzoek aan een webcomponent om zichzelf bij te werken. Het vertelt de component om te controleren of er iets is veranderd,
         *  en zo ja, om die veranderingen te laten zien op de webpagina. Het is een manier om ervoor te zorgen dat de webpagina altijd up-to-date is met de laatste informatie
         *  of status van de component.
        */
        this.requestUpdate();

        /**
         * event.target wordt gebruikt binnen de handleTypeChange-methode om het geselecteerde element van de combobox te verkrijgen. 
         * Door event.target te gebruiken, kunnen we het geselecteerde waarde van de combobox (de waarde van het select-element) krijgen, 
         * en op basis daarvan het gedrag van de rest van de applicatie aanpassen. Dit stelt ons in staat om het weergeven of verbergen van bepaalde
         *  velden in het formulier te regelen op basis van de selectie van de gebruiker.
        */
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


    /**
     * 
     * @param event 
     */
    private async handleButtonClick(event: Event): Promise<void> {

        /**
         * event.preventDefault() wordt gebruikt om de normale actie van een gebeurtenis te stoppen wanneer deze wordt geactiveerd. 
         * Bijvoorbeeld, als je op een link klikt, zal de browser normaal gesproken naar de gekoppelde pagina gaan. Met event.preventDefault()
         *  kun je voorkomen dat de browser dit doet, zodat je JavaScript-code kunt uitvoeren in plaats van de standaardactie te laten plaatsvinden. 
         * Het wordt vaak gebruikt om te voorkomen dat formulieren worden verzonden of om te voorkomen dat links worden gevolgd, 
         * terwijl je de logica achter de actie controleert.
         */
        event.preventDefault();

        const GameObjectFormResult: GameObjectFormResult = {
            alias: this.alias,
            name: this.name,
            description: this.description,
            type: this.selectedType,
            price: this.selection === "1" ? this.price : undefined,
            hp: this.selection === "3" ? this.hp : undefined
        };

        console.log("Form data:", GameObjectFormResult);




        try {

            const success: boolean = await addGameObject(GameObjectFormResult);

            if (success) {

                this.isSuccess = true;
                this.isError = false;
                console.log("Added succesfully");
                window.location.reload();

            } else {

                this.isSuccess = false;
                this.isError = true;
                console.log("Failed adding");

            }

        } catch (error) {

            console.error("Failed to add game object:", error);

        }

    }


    /**
     * 
     */
    public static styles = css`
    .success {
        color: green;
    }

    .error {
        color: red;
    }
    `;

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
            default:
                break;
        }
    }


    public gameObjectForm(): TemplateResult<1> {
        return html`
            <h2>Game Object Form</h2>
            ${this.isSuccess ? html`<div class="success">Successfully added!</div>` : ""}
            ${this.isError ? html`<div class="error">Failed to add. Please check your data.</div>` : ""}
            <form>
                <custom-input-element label="Alias" type="text" Id="alias" @input=${this.input} .value=${this.alias}></custom-input-element>
                <custom-input-element label="Name" type="text" Id="name" @input=${this.input} .value=${this.name}></custom-input-element>
                <div>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" rows="4" @input=${this.input} .value=${this.description}></textarea>
                </div>
                <div>
                    <label for="type">Type:</label>
                    <select id="type" name="type" @change="${this.handleTypeChange}" .value=${this.selection} >
                        <option value="1">Item</option>
                        <option value="2">Room</option>
                        <option value="3">Character</option>
                    </select>
                </div>  
                ${this.selection === "1" ? html`                
                <div id="priceField">
                    <label for="price">Price:</label>
                    <input type="number" id="price" name="price" min="0" step="0.01" @input=${this.input} .value=${this.price}>
                </div>` : ""}
                ${this.selection === "3" ? html`
                <div id="hpField">
                    <label for="hp">HP:</label>
                    <input type="number" id="hp" name="hp" min="0" step="1" @input=${this.input} .value=${this.price}>
                </div>` : ""}
                <button type="button" id="submitButton" @click="${this.handleButtonClick}">Add ${this.selectedType}</button>
                <button type="button" id="updateButton" @click="${this.updateData}">Update ${this.selectedType}</button>
            </form>
        `;
    }


    /**
     * 
     * @returns 
     */
    public render(): TemplateResult<1> {

        return html`
        ${this.gameObjectForm()}
        `;

        /** In Lit wordt @change gebruikt om te luisteren naar veranderingen in invoerelementen, zoals tekstvelden of keuzelijsten.
         *  Wanneer een gebruiker iets wijzigt in het invoerelement, zoals tekst typen of een optie selecteren, wordt een specifieke functie. Dit stelt je in staat om acties uit te voeren op basis van wat de gebruiker heeft gewijzigd, bijvoorbeeld het bijwerken van gegevens of het tonen
         *  van informatie. 
        */

        /**
         * In Lit wordt @click gebruikt om te luisteren naar klikgebeurtenissen op een element, zoals een knop. Wanneer een gebruiker op het element klikt,
         *  wordt een specifieke functie. Hiermee kun je interactieve functies toevoegen aan je webcomponenten,
         *  zoals het tonen van een bericht of het uitvoeren van een bepaalde actie wanneer erop wordt geklikt.
        */

    }
}