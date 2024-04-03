# Expert Review Sprint 2

# Inhoudsopgave
- [Expert Review Sprint 2](#expert-review-sprint-2)
- [Inhoudsopgave](#inhoudsopgave)
- [Learning Stories Sprint 1(Behaald)](#learning-stories-sprint-1behaald)
- [Learning Stories Sprint 2](#learning-stories-sprint-2)
  - [Interfaces](#interfaces)
    - [InteractionAction.ts](#interactionactionts)
    - [FlashlightItem.ts](#flashlightitemts)
    - [Toelichting](#toelichting)
    - [Bronnen](#bronnen)
  - [Generics](#generics)
    - [helpers.ts](#helpersts)
    - [InteractionAction.ts](#interactionactionts-1)
    - [TalkAction.ts](#talkactionts)
    - [Toelichting](#toelichting-1)
    - [Bronnen](#bronnen-1)
  - [Abstract](#abstract)
    - [Room.ts](#roomts)
    - [Bedroom.ts](#bedroomts)
    - [Toelichting](#toelichting-2)
    - [Bronnen](#bronnen-2)
  - [UML Class Diagram](#uml-class-diagram)
    - [Bronnen](#bronnen-3)

# Learning Stories Sprint 1(Behaald)
De vorige expert had ik op niveau gekregen voor de volgende 3 learning stories:<br>
* Als student wil ik leren hoe ik de OO-principes abstraction, encapsulation en inheritance toepas in mijn code.<br>
* Als student wil ik leren hoe ik het OO-principe polymorfisme toepas in mijn code.<br>
* Als student wil ik leren hoe ik static functies en variabelen gebruik in mijn code<br>
[Link Sprint 1 Expert Docu](../Sprint%201/expertReview.md)<br>
</br>

# Learning Stories Sprint 2

* Als student wil ik leren hoe ik interfaces toepas in mijn code<br>
* Als student wil ik leren wat generics zijn en hoe ik ze gebruik in mijn code<br>
* Als student wil ik leren hoe ik abstracte classes toepas in mijn code<br>
</br>


## Interfaces
Een Interface is een soort 'contract' voor een object of methode. Dit houd in dat als je een interface gebruikt voor een object of methode, je **minimaal** de vereiste eigenschappen en methodes meegeven. In tegenstelling tot een 'Type', waar je **precies** de vereiste eigenschappen en methodes moet meegeven.<br>

* Voorbeeld:
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

### FlashlightItem.ts
```ts
export class FlashlightItem extends Item implements Examine, Interact {
    ...
    // Uses Interact Interface
    public interact(): ActionResult | undefined {
        ...
    }
    ...
}
```

### Toelichting
Zoals te zien is hierboven, word in helpers.ts een generic functie gemaakt waar gebruik gemaakt. Dit is te zien door de "<T>" die staat aangegeven, en door dat 'T' aangegeven staat als returnwaarde van de functie. Verder staat de "instance:unknown" voor het feit dat de het type van de parameter hier nog onbekend is. In de code snipper van InteractionAction.ts staat hoe dit in de praktijk gebruikt word. Daar is te zien dat de plek van de '<T>' word opgevuld door "<Interact>". Daaronder in TalkAction.ts gebeurd hetzelfde, maar dan met "<Talk>. Dit laat zien dat het erg flexibel is.<br>

### Bronnen
https://www.typescriptlang.org/docs/handbook/interfaces.html<br>

## Generics
Generics stellen je in staat om typen als parameters door te geven aan klassen, functies, interfaces en methoden. Dit stelt je in staat om herbruikbare componenten te schrijven die met verschillende datatypes kunnen werken, terwijl je toch typeveiligheid behoudt. Met generics kun je abstracte structuren maken die niet gebonden zijn aan een specifiek datatype, waardoor je flexibele en herbruikbare code kunt schrijven.<br>

* Voorbeeld<br>
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
</br>

### Toelichting
Zoals te zien is hierboven, word in helpers.ts een generic functie gemaakt waar gebruik gemaakt. Dit is te zien door de "<T>" die staat aangegeven, en door dat 'T' aangegeven staat als returnwaarde van de functie. Verder staat de "instance:unknown" voor het feit dat de het type van de parameter hier nog onbekend is. In de code snipper van InteractionAction.ts staat hoe dit in de praktijk gebruikt word. Daar is te zien dat de plek van de '<T>' word opgevuld door "<Interact>". Daaronder in TalkAction.ts gebeurd hetzelfde, maar dan met "<Talk>. Dit laat zien dat het erg flexibel is.<br>

### Bronnen

## Abstract
Een abstracte klasse in TypeScript is een klasse die niet rechtstreeks kan worden instanted. Het is bedoeld om afgeleid te worden, en dient als een blueprint voor andere klassen om van over te erven. Abstracte klassen kunnen abstracte methoden bevatten, wat methode declaraties zijn zonder implementatie. Subklassen van abstracte klassen moeten deze abstracte methoden implementeren.<br>

* Voorbeeld<br>
### Room.ts
```ts
export abstract class Room extends GameObject implements Examine, Custom {
    ...
}
```
### Bedroom.ts
```ts
export class BedRoom extends Room {
        ...
    }
```
### Toelichting
Zoals hierboven te zien is, word er in room.ts een abstracte class aangemaakt, en in de andere file word deze gebruikt doormiddel van de "extends" die te zien is bij de initialisatie van de class.
<br>

### Bronnen

## UML Class Diagram
Zoals je hieronder kunt zien is er een UML Class diagram gemaakt op basis van mijn kamer, de bedroom.<br>

### Bronnen
* https://www.visual-paradigm.com/guide/uml-unified-modeling-language/uml-class-diagram-tutorial/<br>
* https://www.lucidchart.com/pages/uml-class-diagram<br>
* https://creately.com/blog/diagrams/uml-diagram-types-examples/<br> 