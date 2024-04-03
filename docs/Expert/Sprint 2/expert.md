# Learning stories documentaties

## Inhoud
1. [Statische functies en variabelen](#statische-functies-en-variabelen)
2. [Polymorphism](#polymorphism)
3. [Object georiënteerd programmeren](#object-georiënteerd-programmeren)
4. []()
5. []()
6. []()

## Statische functie
Een statische functie is een functie die aan de klasse zelf is gekoppeld, niet aan een specifiek object/instantie van die klasse. Dit betekent dat je een statische functie kunt aanroepen zonder een instantie van de klasse te maken. In de code snippet die volgt zal dit verder worden toegelicht.


### Interaction action:
``` TS
/**
 * Represents the alias for interaction actions
 */
export const InteractionActionAlias: string = "interact";

/**
 * Represents the interface for objects that can be interacted with
 */
export interface Interact {
    /**
     * Handles the interaction with the object
     * @returns The result of the interaction
     */
    interact(): ActionResult | undefined;
}

/**
 * Represents an interaction action
 */
export class InteractionAction extends Action {
    /**
     * Constructs an InteractionAction
     */
    public constructor() {
        super(InteractionActionAlias, "interact", true);
    }

    /**
     * Handles the interaction action for a game object
     * @param gameObject The game object to interact with
     * @returns The result of the interaction
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, InteractionActionAlias)) {
            return castTo<Interact>(gameObject).interact();
        }

        return undefined;
    }
}
```

### Toelichting    
Deze 'static' functie word gebruikt voor de actie "Interact" die ik heb aangemaakt. De functie is verantwoordelijk voor het verwerken van een gameobject om hierop de eerder genoemde "interact" functie uit te voeren. De functie checkt eerst of het gekozen gameobject de interact interface gebruikt. Als dit zo is dan gebruikt het de functie 'castTo' uit de helpers.ts map, en roept het de Interact methode aan op het gameobject.

### Bron
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/oop_static/

## Polymorphism
Polymorphism, komt eigenlijk neer op dat meerdere classes dezelfde methodes kunnen gebruiken, maar met verschillende resultaten. In de code snippets hieronder zal dit verder toegelicht worden. 

### Flashlight item
``` TS
/**
* Handles the examine action for the flashlight item
* @returns The result of the examine action
*/
public examine(): ActionResult | undefined {
    return new TextActionResult(["An old flashlight. It looks like it might still work. Could be useful."]);
}

/**
* Handles the interact action for the flashlight item
* @returns The result of the interact action
*/
public interact(): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();
    if (!playerSession.inventory.includes(FlaslightItemAlias)) { // Checks if flashlight isn't already in inventory
        playerSession.pickedUpFlashlight = true;
        playerSession.inventory.push(FlaslightItemAlias);  // Puts flashlight in inventory
        return new TextActionResult(["You pick up the flashlight and test it. It still works!"]);
    } else {
        return new TextActionResult(["You shine it around you, just for fun."]);
    }  
}
```

### Pocketsquare item
```TS
/**
 * Handles the examine action for the pocketsquare item.
 * @returns The result of the examine action
 */
public examine(): ActionResult | undefined {
    return new TextActionResult(["I don't even know why Edward would want this back. It smells and it doesn't even look that good. Oh well, let's just give it back."]);
}

/**
 * Handles the interact action for the pocketsquare item
 * @returns The result of the interact action
 */
public interact(): ActionResult | undefined {
    return new TextActionResult(["You wave the pocketsquare around, letting it fall on the ground. While picking it up from the wooden floor you get a splinter. You took one damage."]);
}
```

### Toelichting   
Hierboven wordt polymorphism aangetoond doormiddel van 2 code snippets. In beide code snippets is te zien dat dezelfde method word gebruikt, maar verschillende uitkomsten heeft. Dit is eigenlijk wat polymorphism is.

## Object georiënteerd programmeren
De overige 3 punten van OOP (abstraction, encapsulation & inheritance) zullen in dit kopje worden toegelicht.


### Abstraction
Abstractie is het concept waarbij de complexiteit van een systeem wordt verborgen en alleen de relevante details aan de gebruiker worden getoond. Het stelt programmeurs in staat om zich te concentreren op de belangrijkste aspecten van een object of concept, terwijl de onnodige details worden verborgen. Bekijk de code snippet hieronder.    

```TS EntranceRoom
public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new InteractionAction()];
    }

    /**
     * Gets the game objects present in the room
     * @returns An array of game objects
     */
    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory(); // Defines the items in the inventory
        const playerSession: PlayerSession = getPlayerSession(); // Retrieves the player session
        const gameObjects: GameObject[] = [this, new EdwardCharacter(), new CouchObject(), new FlowerpotObject(), new PaintingObject(), ...inventoryItems];

        // Checks if Flashlight is NOT in inventory
        if (!playerSession.inventory.includes(FlaslightItemAlias)) {
            gameObjects.push(new FlashlightItem());
        }

        // Checks if the player completed edwards riddle
        if (playerSession.completedEdwardsRiddle) {
            gameObjects.push(new CarpetObject());
        }

        return gameObjects;
    }
```

### Toelichting 
Actions() returnt een reeks Action-objecten die de acties vertegenwoordigen die in de ruimte kunnen worden uitgevoerd. Deze methode abstract het proces van het bepalen van beschikbare acties.

Objecten(): returnt een array van GameObject-objecten die in de kamer aanwezig zijn. Deze methode abstract de logica om te bepalen welke objecten in de kamer aanwezig zijn op basis van de acties en toestand van de speler
<br>


### Encapsulation
Encapsulation houd in dat gegevens in een class die niet direct aangepast mogen worden vanaf buiten de class worden afgeschermd. Hierdoor beperk je de toegang en is het alleen nog mogelijk om dan de afgeschermde informatie via methodes van de class te krijgen.

Bij encapsulation wordt gebruik gemaakt van public, private, en protected.
* "public" houdt in dat deze eigenschap of methode toegankelijk is voor de code buiten deze class. Als niks staat aangeduid dan is het in typescript standaard public.
* "private" houdt in dat deze eigenschap of methode niet toegankelijk is voor code buiten deze class en ook niet voor de child via inheritance.
* "protected" houdt in dat deze code niet voor alle code buiten deze class beschikbaar is, maar wel voor de child classes via inheritance.      


```TS TextActionResult
export class TextActionResult extends ActionResult {
    private _text: string[];

    /**
     * Create a new instance of this action result
     * 
     * @param text Text to show
     */
    public constructor(text: string[]) {
        super();

        this._text = text;
    }

    /**
     * Text to show
     */
    public get text(): string[] {
        return this._text;
    }
}
```

### Toelichting
Zoals hierboven te zien is, is er een private _text variabel. Deze kan niet direct aangesproken of aagepast worden vanaf buiten de class. Verder in de code zien we een public get text() staan. Deze method maakt het mogelijk om dus alsnog private _text op te halen vanaf buiten de class.<br>

<br>

### Inheritance
Erfenis maakt het mogelijk om codehergebruik te bevorderen, omdat gemeenschappelijke kenmerken en gedragingen op één plaats kunnen worden gedefinieerd en vervolgens worden geërfd door verschillende klassen. Dit helpt de codebase te organiseren, vermijdt duplicatie en vergemakkelijkt onderhoud en uitbreiding van de software.<br>

```TS FlashlightItem
/**
 * Represents the alias for the flashlight item
 */
export const FlaslightItemAlias: string = "Flashlight";

/**
 * Represents a flashlight item within the game
 */
export class FlashlightItem extends Item implements Examine, Interact {
    /**
     * Constructs the FlashlightItem
     */
    public constructor() {
        super(FlaslightItemAlias, ExamineActionAlias, InteractionActionAlias);
    }
    ...
}
```

### Toelichting
Te zien aan het woord "extends" in de class definitie hierboven, kunnen we zien dat FlashlightItem een 'verlenging' is van Item. Hierdoor erft FlashlightItem alle eigenschappen en methods van Item. De 'super' functie in de constructor roept de constructor van de parent class "Item" aan, waardoor de initialisatie van de gemeenschappelijke eigenschappen wordt afgehandeld en de FlashlightItem-instantie kan worden gemaakt met de juiste eigenschappen van Item.<br>
<br>

### Bronnen 
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_denken/   
* https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/0_oop_concepten/   
* https://www.linkedin.com/learning/programming-foundations-object-oriented-design-3/object-oriented-thinking?resume=false&u=2132228    
<br>

## Abstract class
Een Abstract class is een class waar geen instanties van gemaakt kunnen worden. Het doel van een abstracte class is dat het een basis is voor andere classes.<br>

### Room.ts
```ts
export abstract class Room extends GameObject implements Examine, Custom {
    ...
}
```

### Entrance-room.ts
```ts
export class EntranceRoom extends Room implements Interact {
    ...
}
```

### Vault-room.ts
```ts
export class VaultRoom extends Room {
    ...
}
```

### Toelichting
Zoals hierboven te zien is, word er in room.ts een abstracte class aangemaakt, en in de andere 2 files word deze gebruikt doormiddel van de "extends" die te zien is bij de initialisatie van de class.
<br>

### Bronnen
* https://www.w3schools.com/typescript/typescript_classes.php<br>
* https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members<br>
</br>


## Interfaces
Een Interface is een soort 'contract' voor een object of methode. Dit houd in dat als je een interface gebruikt voor een object of methode, je **minimaal** de vereiste eigenschappen en methodes meegeven. In tegenstelling tot een 'Type', waar je **precies** de vereiste eigenschappen en methodes moet meegeven.

### InteractionAction.ts
```ts
export interface Interact {
    /**
     * Handles the interaction with the object
     * @returns The result of the interaction
     */
    interact(): ActionResult | undefined;
}
```

### CarpetObject.ts
```ts
export class CarpetObject extends Item implements Examine, Interact {
    ...
    // Uses Interact Interface
    public interact(): ActionResult | undefined {
        ...
    }
    ...
}
```

### Toelichting
Zoals hier te zien is, word er in InteractionAction.ts een interface aangemaakt. Deze wordt gebruikt in bijvoorbeeld CarpetObject.ts. Dit is te zien aan dat de interface word aangeroepen bij het initialiseren van de class door de 'impliments Interact'. Hierdoor gaat er gecheckt worden of er word voldaan aan de interface/'het contract'. Daaronder is te zien dat er word voldaan aan 'het contract' doordat "public interact(): ActionResult | undefined" word gebruikt.<br>

### Bronnen
* https://www.tutorialsteacher.com/typescript/typescript-interface
<br>

## Generics
Generics zijn een functie van TypeScript waarmee je herbruikbare componenten kunt maken die met verschillende datatypes kunnen werken. Met generics kun je een typeparameter definiëren bij het definiëren van een functie, class of interface. Deze typeparameter kan vervolgens worden gebruikt in de structuur van de functie, class of interface om flexibiliteit te bieden bij het werken met verschillende datatypes.<br>
 
### helpers.ts
```typescript
/**
 * Cast the given instance of a class to T
 *
 * @param instance Instance of a class to cast
 *
 * @returns Casted instance
 */
export function castTo<T>(instance: unknown): T {
    return instance as T;
}
```

### InteractionAction.ts
```ts
/**
 * Handles the interaction action for a game object
 * @param gameObject The game object to interact with
 * @returns The result of the interaction
 */
public static handle(gameObject: GameObject): ActionResult | undefined {
    if (implementsInterface(gameObject, InteractionActionAlias)) {
        // castTo gets used here
        return castTo<Interact>(gameObject).interact();
    }

    return undefined;
}
```

### TalkAction.ts
```ts
/**
 * Handle the Talk action
 *
 * @param gameObject Reference to the GameObject on which the Talk action should be executed
 * @param choiceId ID of the specific choice to handle
 *
 * @returns Result of the action
 */
public static handle(gameObject: GameObject, choiceId?: number): ActionResult | undefined {
    if (implementsInterface(gameObject, TalkActionAlias)) {
        return castTo<Talk>(gameObject).talk(choiceId);
    }

    return undefined;
}
```

### Toelichting
Zoals te zien is hierboven, word in helpers.ts een generic functie gemaakt waar gebruik gemaakt. Dit is te zien door de "<T>" die staat aangegeven, en door dat 'T' aangegeven staat als returnwaarde van de functie. Verder staat de "instance:unknown" voor het feit dat de het type van de parameter hier nog onbekend is. In de code snipper van InteractionAction.ts staat hoe dit in de praktijk gebruikt word. Daar is te zien dat de plek van de '<T>' word opgevuld door "<Interact>". Daaronder in TalkAction.ts gebeurd hetzelfde, maar dan met "<Talk>. Dit laat zien dat het erg flexibel is.<br>