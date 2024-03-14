# Expert review (Sprint 1) 

> ## Gekozen learning stories
> - [#11 Als student wil ik leren hoe ik de OO-principes abstraction, encapsulation en inheritance toepas in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/11)
> - [#12 Als student wil ik leren hoe ik het OO-principe polymorfisme toepas in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/12)
> - [#14 Als student wil ik leren hoe ik static functies en variabelen gebruik in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/14)


> ## Abstarction
> Abstractie verwijst naar het idee om complexe details te verbergen en alleen de relevante informatie bloot te stellen. Het maakt het mogelijk om te focussen op wat belangrijk is, zonder je zorgen te maken over de interne werking van een functie of proces.
> 
> ```typescript 
> /**
>  * Handelt een klikgebeurtenis op de "OK" knop voor de minigame af
>  */
> private handleClickCodeOK(): void {
> 
>     // Controleert of de ingevoerde code overeenkomt met de geheime code
>     if (this.codeSoFar === "4422") {
> 
>         console.log("Stuur ontgrendelingscode-actie naar API met code: " + this.codeSoFar);
> 
>         // Stelt isCodeCorrect in op true als de code correct is
>         this.isCodeCorrect = true;
> 
>     } else {
> 
>         console.log("Onjuiste code ingevoerd, probeer opnieuw.");
> 
>         // Stelt isCodeCorrect in op false als de code onjuist is
>         this.isCodeCorrect = false;
> 
>     }
> 
>     // Reset de ingevoerde code
>     this.codeSoFar = "";
> 
>     // Vraagt een update aan om de UI bij te werken
>     this.requestUpdate();
> }
> ```
> ### Toelichting 
> In dit voorbeeld zie je in de handleClickCodeOK() functie de logica voor het controleren van de ingevoerde code en het bijwerken van de UI. Het verbergt de details van hoe de code wordt gecontroleerd en wat er gebeurt als de code correct of incorrect is, waardoor het gemakkelijker wordt om alleen te focussen op wat er moet gebeuren wanneer de "OK" knop wordt geklikt.
>
> ### Bronnen 
> [knowledgebase Abstraction](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/abstraction/)


> ## Encapsulation
> Encapsulation betekent dat we bepaalde informatie en functies in een klasse verbergen voor de buitenwereld, zodat alleen de klasse er zelf toegang toe heeft. Dit helpt om onze code veiliger te maken en om te voorkomen dat externe code per ongeluk de interne werking van onze klasse verstoort.
> 
> ```typescript 
> export class GameCanvas extends LitElement {
>     private codeSoFar: string = ""; // De cijfers die door de speler zijn ingevoerd
>     private isCodeCorrect: boolean = false; // of de ingevoerde code correct is of niet
>     private secretCode: string = "5"; // De juiste code om het tweede nummer van de geheime kamer te ontgrendelen
> 
>     /**
>      * Wanneer er op een nummerknop wordt geklikt, wordt dat nummer toegevoegd aan de ingevoerde code
>      */
>     private handleClickCode(code: string): void {
>         this.codeSoFar += code;
>         this.requestUpdate(); // Het scherm updaten om de nieuwe code te tonen
>     }
> 
>     /**
>      * Behandelt een klikgebeurtenis op de "OK" knop voor de minigame
>      */
>     private handleClickCodeOK(): void {
> 
>         // Controleert of de ingevoerde code overeenkomt met de geheime code
>         if (this.codeSoFar === "4422") {
> 
>             console.log("Stuur ontgrendelingscode-actie naar API met code: " + this.codeSoFar);
> 
>             // Stelt isCodeCorrect in op true als de code correct is
>             this.isCodeCorrect = true;
> 
>         } else {
> 
>             console.log("Onjuiste code ingevoerd, probeer opnieuw.");
> 
>             // Stelt isCodeCorrect in op false als de code onjuist is
>             this.isCodeCorrect = false;
> 
>         }
> 
>         // Reset de ingevoerde code
>         this.codeSoFar = "";
> 
>         // Vraagt een update aan om de UI bij te werken
>         this.requestUpdate();
> 
>     }
> 
> 
>     /**
>      * Controleert of de ontgrendelingscode-minigame is ingeschakeld
>      */
>     private get unlockCodeMiniGameEnabled(): boolean {
> 
>         // Geeft true terug als de minigame "unlock-code" is
>         return this.miniGame === "unlock-code";
> 
>     }
> 
>     /**
>      * Handelt de backspace-knop voor de minigame af
>      */
>     private handleBackspace(): void {
> 
>         // Verwijdert het laatste karakter uit de ingevoerde code
>         this.codeSoFar = this.codeSoFar.slice(0, -1);
> 
>         // Vraagt een update aan om de weergegeven code bij te werken
>         this.requestUpdate();
>     }
> }
> ```
> ### Toelichting 
> In dit voorden worden bepaalde variabelen en functies gemarkeerd als privé, wat betekent dat alleen de GameCanvas-klasse zelf ze kan gebruiken. Deze privévariabelen en -functies houden interne gegevens bij en voeren taken uit binnen de klasse, terwijl ze tegelijkertijd beschermen tegen directe toegang van buitenaf. Dit helpt om de code georganiseerd en veilig te houden.
>
> # Bronnen 
> [knowledgebase Encapsulation](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/encapsulation/#inkapseling-encapsulation)


> ## Inheritence
> Inheritance betekent dat een nieuwe klasse de eigenschappen en acties van een bestaande klasse erft. Dit helpt om code te hergebruiken en zorgt voor een logische structuur in ons programma.
> 
> ```typescript
> /**
>  * Exporteren van het alias van de BookOne klasse
>  */
> export const BookOneAlias: string = "book-1-item";
> 
> /**
>  * Klasse die BookOne vertegenwoordigt
>  */ 
> export class BookOne extends Item implements Examine, Pickup, Talk {
> 
>     /**
>      * Constructor voor de BookOne klasse
>      */
>     public constructor() {
> 
>         // Roep de constructor van de superklasse (Item) aan met de alias voor BookOne, en de acties examine, pickup en talk
>         super(BookOneAlias, ExamineActionAlias, PickupActionAlias, TalkActionAlias);
> 
>     }
> 
>     // Andere methoden specifiek voor de BookOne klasse...
> }
> ```
> ### Uitleg 
> In dit voorbeeld wordt inheritance gebruikt, waarbij Item de hoofdklasse (superklasse) vertegenwoordigt en BookOne de subklasse is die ervan erft. De BookOne-klasse erft alle basisfuncties en eigenschappen van de hoofdklasse (Item), maar voegt ook specifieke acties toe, zoals onderzoeken, oppakken en praten, die uniek zijn voor dit boekobject. Dit helpt om de code georganiseerd te houden en bevordert het hergebruik van code.
>
> ### Bronnen
> [knowledgebase Inheritence](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/inheritance/)



> ## Polymorfisme
> Polymorfisme betekent dat je verschillende dingen kunt doen met objecten van verschillende klassen, zelfs als ze dezelfde naam hebben voor een bepaalde actie, zoals een methode. Dus zelfs als twee klassen dezelfde methode hebben, kunnen ze die methode anders uitvoeren, afhankelijk van hoe ze zijn gedefinieerd. Dit maakt het gemakkelijk om op een consistente manier met verschillende soorten objecten te werken, zelfs als ze verschillende gedrag hebben.
>
> ```typescript 
> import { ActionResult } from "../base/actionResults/ActionResult";
> import { TextActionResult } from "../base/actionResults/TextActionResult";
> import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
> import { Talk, TalkActionAlias } from "../base/actions/TalkAction";
> import { Item } from "../base/gameObjects/Item";
> 
> /** 
>  * Alias voor de BookCase klasse
>  */
> export const BookCaseAlias: string = "book-case";
> 
> /** 
>  * Variabele om bij te houden of de boekenkast is onderzocht
>  */
> export let examined: boolean = false;
> 
> /** 
>  * Klasse die de boekenkast vertegenwoordigt en implementeert Examine en Talk interfaces
>  */
> export class BookCase extends Item implements Examine, Talk {
> 
>     /**
>      * Constructor voor de BookCase klasse
>      */
>     public constructor() {
>         // Roep de constructor van de superklasse (Item) aan met de boekenkast alias, Examine en Talk action aliases
>         super(BookCaseAlias, ExamineActionAlias, TalkActionAlias);
>     }
> 
>     /**
>      * Methode die het onderzoeken van de boekenkast afhandelt
>      * @returns Een ActionResult voor het onderzoeken van de boekenkast
>      */
>     public examine(): ActionResult | undefined {
>         if (examined) {
>             // Als onderzocht, retourneer een TextActionResult die aangeeft dat de boekenkast al is onderzocht
>             return new TextActionResult(["Je hebt de boekenkast al onderzocht en je hebt al dezelfde boeken op de planken gevonden."]);
>         } else {
>             // Werk de onderzochte status bij naar true
>             examined = true;
>             // Als niet onderzocht, retourneer een TextActionResult die de boeken op de planken beschrijft
>             return new TextActionResult(["Je hebt de boekenkast onderzocht en zag verschillende vergelijkbare boeken met nummers op de planken."]);
>         }
>     }
> 
>     /**
>      * Methode die de praatactie op de boekenkast afhandelt
>      * @param _choiceId De keuze-ID die de selectie van de speler vertegenwoordigt
>      * @returns Een ActionResult voor het praten met de boekenkast
>      */
>     public talk(_choiceId?: number | undefined): ActionResult | undefined {
>         return new TextActionResult(["Je kunt niet met een boekenkast praten."]);
>     }
> 
> } 
> ```
>
> ### Uitleg
> In dit voorbeeld wordt polymorfisme gebruikt in de BookCase-klasse. Hoewel de boekenkast en andere objecten verschillende acties kunnen uitvoeren, zoals onderzoeken of praten, kunnen ze nog steeds op dezelfde manier worden behandeld. Dit betekent dat we dezelfde methode examine() en talk() kunnen gebruiken voor de boekenkast, zelfs als het gedrag anders is dan bij andere objecten. Hierdoor kunnen we efficiënter en flexibeler code schrijven.
>
> ### Bronnen
> [knowledgebase Polymorfisme](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/polymorfisme/)



> ## Static functies
> Statische functies zijn speciale taken die horen bij een hele groep dingen, niet alleen bij één specifiek ding. Je kunt deze taken direct op de groep toepassen, zonder dat je één specifiek ding nodig hebt. Ze zijn handig voor speciale klusjes die te maken hebben met de hele groep, niet alleen met één ding.
>
> ```typescript
> import { ActionResult } from "../base/actionResults/ActionResult";
> import { Action } from "../base/actions/Action";
> import { GameObject } from "../base/gameObjects/GameObject";
> import { castTo, implementsInterface } from "../base/helpers";
> 
> /** Alias voor de PickupAction klasse */
> export const PickupActionAlias: string = "pickup-action";
> 
> /** Interface die aangeeft dat een object kan worden opgepakt */
> export interface Pickup {
>     pickup(): ActionResult | undefined;
> }
> 
> /** Klasse die de Pickup-actie vertegenwoordigt */
> export class PickupAction extends Action {
>     public constructor() {
>         super(PickupActionAlias, "Pickup", true);
>     }
> 
>     /**
>      * Methode die de Pickup-actie afhandelt voor een game object
>      * @param gameObject Het game object waarop de actie wordt uitgevoerd
>      * @returns Een ActionResult voor het uitvoeren van de Pickup-actie op het gegeven game object
>      */
>     public static handle(gameObject: GameObject): ActionResult | undefined {
>         if (implementsInterface(gameObject, PickupActionAlias)) {
>             return castTo<Pickup>(gameObject).pickup();
>         }
> 
>         return undefined;
>     }
> }
> ```
>
> ### Uitleg
> In deze voorbeeld wordt een static functie gebruikt voor de "Pickup" actie die ik heb gemaakt. Het handelt de "Pickup" actie af voor een game object. Het kijkt eerst of het gekozen game object de mogelijkheid heeft om opgepakt te worden. Als dat zo is, wordt de "pickup" actie van het game object uitgevoerd. Zo niet, dan gebeurt er niets.
>
> ### Bronnen
> [knowledgebase static functies](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/oop_static/)