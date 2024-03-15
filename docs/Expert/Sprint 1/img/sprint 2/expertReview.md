## Expert Review

### Inhoudsopgave
1. [Expert Review](#expert-review)<br>
2. [Wat wil met dit document laten zien?](#wat-wil-ik-met-dit-document-laten-zien)<br>
3. [Learning Stories](#learning-stories)<br>
4. [OOP](#object-georienteerd-programmeren)


## Wat wil ik met dit document laten zien?

### Learning Stories
* Als student wil ik leren hoe ik de OO-principes abstraction, encapsulation en inheritance toepas in mijn code.<br>
* Als student wil ik leren hoe ik het OO-principe polymorfisme toepas in mijn code.<br>
* Als student wil ik leren hoe ik static functies en variabelen gebruik in mijn code<br>
  

## Object Georienteerd Programmeren 
Met het onderdeel "K5 Object georiënteerd programmeren" geef ik bewijs dat ik volgens [de richtlijnen van de opleiding HBO-ICT Object geörienteerd programmeren](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/0_oop_intro/) gewerkt heb. Dat doe ik door de "Object georiënteerd programmeren" per onderdeel te benoem met voorbeelden uit het project als bewijs.<br>

### Static
Een statische functie is een functie die aan de klasse zelf is gekoppeld, niet aan een specifiek object/instantie van die klasse. Dit betekent dat je een statische functie kunt aanroepen zonder een instantie van de klasse te maken. In de code snippet die volgt zal dit verder worden toegelicht. 

```ts
export const PickupActionAlias: string = "pickup";

export interface Pickup {
    pickup(): ActionResult | undefined;
}

export class PickupAction extends Action {
    public constructor() {
        super(PickupActionAlias, "Pickup", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, PickupActionAlias)) {
            return castTo<Pickup>(gameObject).pickup();
        }

        return undefined;
    }
}
```
* Toelichting:

The static function handle is verantwoordelijk voor het verwerken van een GameObject om een ​​PickupAction uit te voeren.
Er is een GameObject als parameter nodig.<br>

Het controleert of het meegeleverde GameObject de Pickup-interface implementeert met behulp van de implementsInterface-helperfunction.
Als het GameObject de Pickup-interface implementeert, cast het het GameObject naar Pickup met behulp van de castTo-functie en roept vervolgens de pickup-methode erop aan.<br>

Als het GameObject de Pickup-interface niet implementeert, of als er een andere reden is dat het niet kan worden opgehaald, returnd hey undefined, wat aangeeft dat er geen actie is uitgevoerd.<br>

#### Bronnen
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/oop_static/<br>

### Abstraction
Abstraction is een van de key components en pillars van de OOP principe. Abstractie is het concept waarbij de complexiteit van een systeem wordt verborgen en alleen de relevante details aan de gebruiker worden getoond. Het stelt programmeurs in staat om zich te concentreren op de belangrijkste aspecten van een object of concept, terwijl de onnodige details worden verborgen. Bekijk de code snippet hieronder.<br>

* Snippet:<br>
```ts
    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];
    }

```
Actions() returnt een reeks Action-objecten die de acties vertegenwoordigen die in de ruimte kunnen worden uitgevoerd. Deze methode abstract het proces van het bepalen van beschikbare acties.<br>

Objecten(): returnt een array van GameObject-objecten die in de kamer aanwezig zijn. Deze methode abstract de logica om te bepalen welke objecten in de kamer aanwezig zijn op basis van de acties en toestand van de speler.<br>


#### Bronnen
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_denken/<br>
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/0_oop_concepten/<br>
* https://www.linkedin.com/learning/programming-foundations-object-oriented-design-3/object-oriented-thinking?resume=false&u=2132228<br>
* https://blog.jetbrains.com/webstorm/2019/02/write-object-oriented-typescript-abstraction/<br>
  
### Encapsulation
Encapsulation is een van de key components en pillars van de OOP principe. Encapsulation houd in dat gegevens in een class die niet direct aangepast mogen worden vanaf buiten de class worden afgeschermd. Hierdoor beperk je de toegang en is het alleen nog mogelijk om dan de afgeschermde informatie via methodes van de class te krijgen.<br>

Bij encapsulation wordt gebruik gemaakt van public, private, en protected.<br>
* "public" houdt in dat deze eigenschap of methode toegankelijk is voor de code buiten deze class. Als niks staat aangeduid dan is het in typescript standaard public.<br>
* "private" houdt in dat deze eigenschap of methode niet toegankelijk is voor code buiten deze class en ook niet voor de child via inheritance.<br>
* "protected" houdt in dat deze code niet voor alle code buiten deze class beschikbaar is, maar wel voor de child classes via inheritance.<br>

* Snippet:<br>
```ts
export const BedRoomAlias: string = "bedroom";

export class BedRoom extends Room {
    public constructor() {
        super(BedRoomAlias);
    }

    public name(): string {
        return "Bedroom";
    }

    public images(): string[] {
        return[
            "bedroom"
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if(!playerSession.inventory.includes(FlashLightItemAlias)){
            objects.push(new FlashlightItem());
        }
        
        objects.push(new JohnCharacter());
        // return[this, new FlashlightItem(), new JohnCharacter()];

        return objects;
    }   

    public actions(): Action[] {
        return[new ExamineAction(), new TalkAction(), new InteractAction(), new CustomAction("test-me","Inspect Room", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The bedroom, it looks like it hasn't been used in ages. There should still be important clues in here to help me reach my answer."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "test-me"){
            return new TextActionResult([".. The dust has filled the air and the wood's creaking with every footstep we make..", "Checking out the bed and closet might be a neat idea for starters."]);
        }

        return undefined;
    }

}
```
Elke methode binnen de class Bedroom een specifiek aspect van het gedrag van de ruimte, zoals de naam, afbeeldingen, beschikbare acties, objecten en onderzoeksresultaten omvat.<br>

De methoden verbergen interne details over hoe ze werken, waardoor andere delen van de code via goed gedefinieerde interfaces kunnen communiceren met de Bedroom-class.<br>

De logica voor het maken van objecten in de kamer is Encapsulated in de object()-methode, gebaseerd op spelersacties en vooraf gedefinieerde voorwaarden.<br>

Toegang tot getPlayerSession() is Encapsulated in de getPlayerSession() functie, waardoor de implementatiedetails worden weggenomen en een indirecte laag wordt geboden.<br>

#### Bronnen
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_denken/<br>
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/0_oop_concepten/<br>
* https://www.linkedin.com/learning/programming-foundations-object-oriented-design-3/object-oriented-thinking?resume=false&u=2132228<br>
* https://dev.to/wizdomtek/exploring-object-oriented-programming-with-typescript-22b#:~:text=Encapsulation%20is%20a%20principle%20of,*%20public%20%3A%20The%20default%20modifier.<br>
  
### Inheritance
Inheritance is een van de key components en pillars van de OOP principe. Inheritance betekent het volgende: dat een klasse variabelenvoor methodes - functies en procedures erft van een superklasse. Dit heb ik als volgens toegepast op mijn code. Inheritance maakt het mogelijk om codehergebruik te bevorderen, omdat gemeenschappelijke kenmerken en gedragingen op één plaats kunnen worden gedefinieerd en vervolgens worden geërfd door verschillende klassen. Dit helpt de codebase te organiseren, vermijdt duplicatie en vergemakkelijkt onderhoud en uitbreiding van de software.<br>
<br>

* Snippet:
```ts
export class FlashlightItem extends Item implements Examine, Interact {

    public constructor() {
        super(FlashLightItemAlias, ExamineActionAlias, InteractActionAlias);
    }
}
```

#### Bronnen
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_denken/<br>
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/0_oop_concepten/<br>
* https://www.linkedin.com/learning/programming-foundations-object-oriented-design-3/object-oriented-thinking?resume=false&u=2132228<br>
* https://www.typescripttutorial.net/typescript-tutorial/typescript-inheritance/<br>
  
### Polymorphism
Polymorphism is een van de key components en pillars van de OOP principe. Polymorphism, komt eigenlijk neer op dat meerdere classes dezelfde methodes kunnen gebruiken, maar met verschillende resultaten. In de code snippets hieronder zal dit verder toegelicht worden.

* Snippet:<br>
```ts
    public examine(): ActionResult | undefined {
        return new ExamineImageResult(["It's a flashlight...", "*Click*", "Damn..! No luck, the batteries are dead but maybe I can find some new ones in here."], ["flashlight"]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(!playerSession.pickedUpFlashlight) {
            playerSession.pickedUpFlashlight = true;
            playerSession.inventory.push(FlashLightItemAlias);

            return new TextActionResult(["*I picked up the flashlight, now I should go ahead and look for the batteries..*"]);
        }

        return undefined;
    }
```
#### Bronnen
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_denken/<br> 
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/0_oop_concepten/<br>
* https://www.linkedin.com/learning/programming-foundations-object-oriented-design-3/object-oriented-thinking?resume=false&u=2132228<br>
* https://blog.bitsrc.io/polymorphism-in-typescript-oop-17646dcda307<br>

## Interfaces
### UML Class Diagram
#### Bronnen
* https://www.visual-paradigm.com/guide/uml-unified-modeling-language/uml-class-diagram-tutorial/<br>
* https://www.lucidchart.com/pages/uml-class-diagram<br>
* https://creately.com/blog/diagrams/uml-diagram-types-examples/<br> 