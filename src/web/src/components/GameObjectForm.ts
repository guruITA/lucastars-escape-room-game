import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import "./CustomInputElement";
import "./GameObjectData";
import { addGameObject, updateGameObject } from "../services/routeService";
import { gameService } from "../services/GameServices";

/**
 * Component met een GameObject formulier waarin je nieuwe game objecten kan aanmaken, en bestaande GameObjecten kan aanpassen.
 * Het toevoegen en aanpassen van de Gameobjecten wordt ook verwerkt in de database
 */
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
    * Deze actie gebeurt wanneer het onderdeel in de component wordt toegevoegd.
    */
    public connectedCallback(): void {

        // Zorgt ervoor dat de Originele connectedCallback functie eerst word uitgevoerd, voordat mijn toegevoegde functie(s) worden uitgevoerd.
        super.connectedCallback();

        // Hier haal ik de waarde van de geselecteerde gameobject op met behulp van de Dispatcht uit GameObjectData bestand en stop ik het in de gameobject element om te kunnen weergeven
        gameService.addEventListener("edit-form", (element: any) => {

            console.log(element);

            // Hiermee hall ik de gegevens open stop ik ze in de juiste variabelen om te weer te kunnen geven in gameobject formilier 
            const showData: GameObjectFormResult = element.data.entry;
            this.gameObjectId = showData.id;
            this.alias = showData.alias;
            this.name = showData.name;
            this.description = showData.description;
            this.type = showData.type;
            this.price = showData.price;
            this.hp = showData.hp;

            // Hier controleer ik de variabele `this.type` en het past de `this.selection` en `this.seletionType` aan
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
     * Deze functie wordt gebruikt om gegevens te bewerken.
     * Het haalt gegevens op uit de huidige formulier en maakt een object met de gegevens.
     * Als het bijwerken slaagt, wordt het succes gelogd. Als het mislukt, wordt een foutmelding gelogd.
     */
    private async updateData(): Promise<void> {


        // Hier hall ik de gegevens uit de formulier en stop ik het in de gameobject
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

            // Hier stop ik de variabele van de gameobject in de await functie
            const updateData: boolean = await updateGameObject(GameObjectFormResult);

            // Als het is gelukt met updaten moet ik een console log te zien krijgen en pagina moet reloaden maar hij komt niet hier terecht ik weet niet waarom 
            if (updateData) {

                console.log("Succesfully updated");
                window.location.reload();

            } else {

                console.log("Failed to updated");

            }

        } catch (error) {

            console.error("Failed to update gameobject data: ", error);

        }

    }


    /**
     * Deze functie wordt uitgevoerd wanneer er een verandering plaats vinden in het geselecteerde type.
     * Het vraagt aan de webcomponent om zichzelf bij te werken, zodat eventuele veranderingen worden weergegeven op de webpagina.
     * Het gebruikt het geselecteerde element van de keuzelijst om het gedrag van de rest van de applicatie aan te passen.
     * Het stelt ons in staat om bepaalde velden in het formulier weer te geven of te verbergen op basis van de selectie van de gebruiker.
     * 
     * @param event Het gebeurtenisobject dat wordt gegenereerd wanneer een verandering optreedt in het geselecteerde type.
     */
    private handleTypeChange(event: Event): void {

        /**
         * this.requestUpdate() vertelt de webcomponent om zichzelf opnieuw te renderen wanneer er iets in de component is veranderd
        */
        this.requestUpdate();

        /**
         * Met event.target kun je achterhalen op welk specifiek HTML-element een gebeurtenis, zoals een klik of een invoerwijziging, heeft plaatsgevonden.
        */
        this.selection = (event.target as HTMLSelectElement).value;

        // Met behulp van de waarde die wordt gestopt in 'this.selection' stop ik in in `this.selectedType` de waarde die wordt weergeven in de knop
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
     * Deze functie wordt uitgevoerd wanneer er op de knop wordt geklikt.
     * Vervolgens verzamelt het formuliergegevens om een nieuw gameobject toe te voegen.
     * Als het toevoegen succesvol is, wordt de pagina vernieuwd om de veranderingen te tonen.
     * Als het toevoegen mislukt, wordt een foutmelding weergegeven.
     * 
     * @param event Het gebeurtenisobject dat wordt gegenereerd wanneer er op een knop wordt geklikt.
     */
    private async handleButtonClick(event: Event): Promise<void> {

        /**
         * event.preventDefault() wordt gebruikt om de normale actie van een gebeurtenis te stoppen wanneer deze wordt geactiveerd. . 
         * Het wordt vaak gebruikt om te voorkomen dat formulieren worden verzonden of om te voorkomen dat links worden gevolgd, 
         * terwijl je de logica achter de actie controleert.
         */
        event.preventDefault();

        // Hier hall ik de gegevens uit de formulier en stop ik het in de gameobject
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

            // Hier stop ik de variabele van de gameobject in de await functie
            const success: boolean = await addGameObject(GameObjectFormResult);


            if (success) {

                // Als het is gelukt met toevoegen dan krijg je een een successvol bericht te zien
                this.isSuccess = true;
                this.isError = false;
                console.log("Added succesfully");
                window.location.reload();

            } else {

                // Als het het niet lukt dan krijg je een foutmelding te zien 
                this.isSuccess = false;
                this.isError = true;
                console.log("Failed adding");

            }

        } catch (error) {

            console.error("Failed to add game object:", error);

        }

    }


    /**
     * Hier word de styling voor GameObject formulier element aangepast
     */
    public static styles = css`
    .success {
        color: green;
    }

    .error {
        color: red;
    }
    `;


    /**
     * Deze functie wordt uitgevoerd wanneer er iets wordt ingevoerd in een Inputelement of TextAreaElement enzovoort.
     * Het haalt de ingevoerde waarde van de elementen op en stopt het in de variabele van de velden.
     * 
     * @param event Het gebeurtenisobject dat wordt gegenereerd wanneer er iets wordt ingevoerd in een Inputelement of TextAreaElement enzovoort.
     */
    private input(event: InputEvent): void {

        // Met dit haal je het element op
        const target: HTMLInputElement | HTMLTextAreaElement = event.target as HTMLInputElement | HTMLTextAreaElement;

        // Hiermee haal ik de ID van het element op
        const id: string = target.id;

        // Hiermee kan ik de ingevoerde waarde ophalen uit het element
        const value: string = target.value;


        // Met behulp van de switch kan ik bepalen welke waarde bij de juiste variabelen wordt gestopt 
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


    /**
     * @returns een TemplateResult die de HTML-formulier weergeeft
     */
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
    * In eenvoudige bewoordingen, in Lit, een webcomponentbibliotheek, wordt @change gebruikt om te reageren wanneer een gebruiker de invoer in een veld wijzigt
    */

    /**
     * In Lit, een bibliotheek voor het maken van webcomponenten, wordt @input gebruikt om te luisteren naar veranderingen die een gebruiker maakt in invoervelden
     */

    /**
     * In Lit, een bibliotheek voor het maken van webcomponenten, wordt @click gebruikt om te luisteren naar klikgebeurtenissen.
     */



    /**
     * @returns een TemplateResult die de gerenderde HTML weergeeft
     */
    public render(): TemplateResult<1> {

        return html`
        ${this.gameObjectForm()}
        `;

    }

}