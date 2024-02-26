import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import "./CustomInputElement";
import "./GameObjectData";
import { addGameObject } from "../services/routeService";


@customElement("gameobject-form")
export class GameObjectForm extends LitElement {

    /**Lit heeft twee manieren om een reactieve field te maken: met een @property- of @state-decorator. De werking is van beide exact hetzelfde,
     *  alleen is @property bedoeld voor public fields, en @state voor private fields. Een @property maakt daarnaast van een field ook een tag die in te stellen 
     * is op een Web Component. Een @state is puur voor intern gebruik. 
    */

    @state() private selection: string = "";
    @state() private selectedType: string = "";
    @state() private isSuccess: boolean = false;
    @state() private isError: boolean = false;


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

        /**
         * event.preventDefault() wordt gebruikt om de normale actie van een gebeurtenis te stoppen wanneer deze wordt geactiveerd. 
         * Bijvoorbeeld, als je op een link klikt, zal de browser normaal gesproken naar de gekoppelde pagina gaan. Met event.preventDefault()
         *  kun je voorkomen dat de browser dit doet, zodat je JavaScript-code kunt uitvoeren in plaats van de standaardactie te laten plaatsvinden. 
         * Het wordt vaak gebruikt om te voorkomen dat formulieren worden verzonden of om te voorkomen dat links worden gevolgd, 
         * terwijl je de logica achter de actie controleert.
         */
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

            <game-object-data></game-object-data>
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
