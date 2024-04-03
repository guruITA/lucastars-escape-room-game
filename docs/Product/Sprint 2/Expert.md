 
## Inleiding
Met deze documentatie toon ik de bewijzen voor de expert review van sprint 1.
 
## Learning stories  
Hier toon ik de learning stories die ik gedaan heb. Eerst leg ik de onderdelen uit en toon ik gerelateerde ingekorte code snippetd en daarna toon ik een UML-diagram.
 

> - [#11 Als student wil ik leren hoe ik de OO-principes abstraction, encapsulation en inheritance toepas in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/11)
> - [#12 Als student wil ik leren hoe ik het OO-principe polymorfisme toepas in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/12)
> - [#13 Als student wil ik leren hoe ik abstracte classes toepas in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/13)
>  - [#14 Als student wil ik leren hoe ik static functies en variabelen gebruik in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/14)
>  - [#15 Als student wil ik leren hoe ik interfaces toepas in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/15)
>  - [#16 Als student wil ik leren wat generics zijn en hoe ik ze gebruik in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/16)


 
 
#### Abstraction
Abstractie houdt in dat je alleen de nodige informatie voor je programma in de classes stopt en dat je overbodige informatie weglaat.
 
<details>
<summary>Code snippet Abstraction</summary>  
 
Hierbij wordt een class getoond die een child van de parent class Item is. Dit is terug te zien aan het woord "extends".
 
Bij het instantiëren van deze class worden alleen de benodigde informatie gebruikt, waardoor deze voldoet aan abstractie. Dit is terug te zien aan de constructor.
 
```typescript
***
 
/**
* The Cam1Item class, extending the Item class
* This class implements the Examine interface, to handle the actions in the room.

*/
export class Cam1Item extends Item implements Examine {
    public constructor() {
        super(Cam1ItemAlias, ExamineActionAlias);
    }
    ***
 
}
```
</details>
 
#### Encapsulation
Inkapseling houdt in dat je gegevens die niet direct van buiten de class bewerkt mogen worden afschermt. Hierdoor beperk je de toegang en is het alleen nog mogelijk om dan de afgeschermde informatie via methodes van de class te krijgen.
 
Bij Inkapseling wordt gebruik gemaakt van public, private, en protected.
* "public" houdt in dat deze eigenschap of methode toegankelijk is voor de code buiten deze class. Als niks staat aangeduid dan is het in typescript standaard public.
* "private" houdt in dat deze eigenschap of methode niet toegankelijk is voor code buiten deze class en ook niet voor de child via inheritance.
* "protected" houdt in dat deze code niet voor alle code buiten deze class beschikbaar is, maar wel voor de child classes via inheritance.
 
<details>
<summary>Code snippet Encapsulation</summary>
  
```typescript
***
 

@customElement("game-canvas")
export class GameCanvas extends LitElement {
    // Private property encapsulating the current game state
    private gameState: GameState = {};


    // Public method to refresh the game state
    public async refreshState(): Promise<void> {
        // This method allows external components to trigger the refresh of the game state.
        // By making it public, other parts of the application can interact with the GameCanvas component
        // and initiate the update process when necessary.
        this.gameState = await getState();
        this.requestUpdate();
    }

    // Other methods and properties...
}

```
</details>
 
#### Inheritance
Erfenis houdt in dat classes methodes en eigenschappen van de parent class overnemen. Deze kunnen dan door de nieuwe child class gebruikt worden. Hierdoor is het hergebruiken van code veel gemakkelijker.
 
De eigenschappen kunnen geïnitieerd worden in de constructor door het wordt “super” te gebruiken. De methodes en eigenschappen kunnen, als deze in de parent class aangeduid zijn met public of protected, aangeroepen worden in de child door het woord “super” te gebruiken.
 
<details>
<summary>Code snippet Inheritance</summary>
 
Hierbij is te zien dat door gebruik te maken van "extends" erfenis toepast. De methodes en eigenschappen van de class "Room" worden dus hergebruikt in de "ControlRoom".
 
Door gebruik te maken van "super" in de "constructor" wordt de constructor van de parent class "Room" aangesproken voor variabelen die wij meegeven.
 
```typescript
 
***
/**
* The ControlRoom class, extending the base Room class
*/
export class ControlRoom extends Room, implements Examine {
    public constructor() {
        super(ControlRoomAlias, ExamineActionAlias);
    }

***
 
}
```
</details>
 
#### Polymorphism
 Polymorfisme betekent dat je verschillende dingen kunt doen met objecten van verschillende klassen, zelfs als ze dezelfde naam hebben voor een bepaalde actie, zoals een methode. Dus zelfs als twee klassen dezelfde methode hebben, kunnen ze die methode anders uitvoeren, afhankelijk van hoe ze zijn gedefinieerd. Dit maakt het gemakkelijk om op een consistente manier met verschillende soorten objecten te werken, zelfs als ze verschillende gedrag hebben.

<details>
<summary>Code snippet Polymorphism</summary>
In dit voorbeeld wordt polymorfisme toegepast in de DetectiveCharacterControlRoom-klasse. Hoewel de detectiveclass en andere karakters verschillende acties kunnen uitvoeren, zoals onderzoeken of praten, kunnen ze nog steeds op dezelfde manier worden behandeld. Dit betekent dat we dezelfde methoden examine() en talk() kunnen gebruiken voor de detectivekamer, zelfs als het gedrag anders is dan bij andere objecten. Hierdoor kunnen we efficiënter en flexibeler code schrijven.

```typescript

// Klasse die de detective karakteriseert, implementeert Examine en Talk interfaces
export class DetectiveCharacterControlRoom extends Character implements Examine, Talk {
    constructor() {
        // Roep de constructor van de basis Character klasse aan met de alias van de detectivekamer
        super(DetectiveCharacterControlRoomAlias);
    }

    // Methode om de naam van de detective op te halen
    public name(): string {
        return "Detective John🕵️‍♂️";
    }

    // Implementatie van de examine methode voor de detectivekamer
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Ask Detective William McCarthy for hints!"]);
    }

    // Implementatie van de talk methode voor de detectivekamer
    public talk(choiceId?: number): ActionResult | undefined {
        switch (choiceId) {
            // Als choiceId 1 is, geef de eerste hint terug
            case 1:
                return new TextActionResult([
                    "[John]: In the bedroom's hidden realm, a secret lies untold,",
                    "Unlock the cabinet's embrace with numbers, bold.",
                    "On a note, concealed, a clue to behold,",
                    "Crack the code, and mysteries shall unfold."
                ]);
            // Als choiceId 2 is, geef de tweede hint terug
            case 2:
                return new TextActionResult([
                    "[John]: The code you seek to free the cabinet's hold,",
                    "Rests not within the pages, but on a lamp bold.",
                    "In the library's quiet, amidst shadows and light,",
                    "There lies the key, hidden in plain sight."
                ]);
            // Als choiceId geen van bovenstaande is, geef een standaard dialoog terug
            default:
                return new TalkActionResult(
                    this,
                    ["[Will]: Detective, do you have a moment? I could use a hint.",
                    "[John]: Of course, Assistant. How can I help you?"],
                    [new TalkChoiceAction(1, "Can I have the first hint?"), new TalkChoiceAction(2, "Can I have the second hint?")]
                );
        }
    }
}
```

</details>

#### abstract
Een abstracte functie is een functie die wordt gedeclareerd in een klasse, maar geen implementatie heeft binnen die Class. In plaats daarvan moet de implementatie worden geleverd door afgeleide Class. 
<details>
<summary>Code snippet Abstract</summary>  
 
Deze TypeScript-code definieert een abstracte basisklasse genaamd Room.
 
wat betekent dat deze niet rechtstreeks kan worden geïnstantieerd maar dient als blauwdruk voor andere Class die ervan erven.
 
```typescript
***
/**
 * Base class used to represent a room
 *
 * @remarks Implements the Examine action by default
 */
export abstract class Room extends GameObject implements Examine {
    /**
     * Create a new instance of this room
     *
     * @param alias Alias of this room
     * @param interfaces List of interfaces this room implements
     */
    protected constructor(alias: string, ...interfaces: string[]) {
        super(alias, ...interfaces, ExamineActionAlias, );
    }
```
</details>

#### Static functions and variables
Static functions and variables belong to the class itself rather than instances of the class. They can be accessed without creating an instance of the class.

<details>
<summary>Code snippet Static functions and variables</summary>

```typescript
export class MathUtils {
    // Static variable
    static PI: number = 3.14159;

    // Static function to calculate the area of a circle
    static calculateCircleArea(radius: number): number {
        return this.PI * radius * radius;
    }
}

// Accessing static variables and calling static functions
console.log(MathUtils.PI); // Output: 3.14159
console.log(MathUtils.calculateCircleArea(5)); // Output: 78.53975

```

</details>

#### Interfaces
Interfaces define a contract for classes to follow. They describe the structure that classes must adhere to, including properties and methods.



<details>
<summary>Code snippet Interfaces</summary>

Interface Definitie (Examine): De interface Examine definieert een contract voor objecten die de examine methode moeten ondersteunen. Het biedt een duidelijke structuur voor welke methoden een klasse die het implementeert moet hebben.

```typescript

/** Alias used to identity the Examine action and interface */
export const ExamineActionAlias: string = "examine";

/**
 * Interface for GameObjects that need to support the Examine action
 */
export interface Examine {
    /**
     * Execute the Examine action
     * 
     * @returns Result of the Examine action
     */
    examine(): ActionResult | undefined;
}

/**
 * Class used to represent the Examine action
 */
export class ExamineAction extends Action {
    /**
     * Create a new instance of the Examine action
     */
    public constructor() {
        super(ExamineActionAlias, "Examine", true);
    }

    /**
     * Handle the Examine action
     *
     * @param gameObject Reference to the GameObject on which the Examine action should be executed
     *
     * @returns Result of the action
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, ExamineActionAlias)) {
            return castTo<Examine>(gameObject).examine();
        }

        return undefined;
    }
}

```
</details>

#### Generics
Generics allow you to create flexible, reusable functions and classes that work with any data type.

<details>
<summary>Code snippet Generics</summary>

De castTo-functie gebruikt generics om een instance van een onbekend type (unknown) naar een gespecificeerd type T te casten. Dit maakt de functie flexibel en herbruikbaar voor verschillende typen.

1- Type veiligheid: Het gebruik van generics in combinatie met type-asserties (zoals as T) biedt type veiligheid tijdens het compileren. Dit vermindert het risico op fouten tijdens runtime doordat de compiler de juistheid van de cast controleert op basis van het opgegeven type.

2- Herbruikbaarheid: Omdat de castTo-functie generisch is, kan deze worden gebruikt om verschillende typen te casten, wat de herbruikbaarheid van de code vergroot.

```typescript

export function castTo<T>(instance: unknown): T {
    return instance as T;
}

}
```

</details>
#### UML

![uml](<class_diagram (1).drawio.png>)
![arrow](image-2.png) <br>
![arrow](image-3.png)

 

#### Bronnen:
Knowledge base
* [Knowledgebase HBO-ICT Abstraction ](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/abstraction/#abstractie-abstraction)
* [Knowledgebase HBO-ICT Encapsulation](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/encapsulation/#inkapseling-encapsulation)
* [Knowledgebase HBO-ICT Inheritance](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/inheritance/#overerving-inheritance)
* [Knowledgebase HBO-ICT Abstract](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)
* [Knowledgebase HBO-ICT polymorfisme](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/polymorfisme/)
* [Knowledgebase HBO-ICT Pijlers van OOP](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/0_pijlers_van_oop/)
