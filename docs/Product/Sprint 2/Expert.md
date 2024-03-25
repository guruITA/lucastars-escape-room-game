 
## Inleiding
Met deze documentatie toon ik de bewijzen voor de expert review van sprint 1.
 
## Learning stories  
Hier toon ik de learning stories die ik gedaan heb. Eerst leg ik de onderdelen uit en toon ik gerelateerde ingekorte code snippetd en daarna toon ik een UML-diagram.
 

> - [#11 Als student wil ik leren hoe ik de OO-principes abstraction, encapsulation en inheritance toepas in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/11)
> - [#13 Als student wil ik leren hoe ik abstracte classes toepas in mijn code](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/13)
> - [#8 Als student wil ik leren hoe ik User Centered Design methodes effectief inzet voor doelgericht onderzoek en het verzamelen van waardevolle gebruikersfeedback in mijn ontwerpproces.](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/jooduumeenii48/-/issues/8)

 
 
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



#### User Centered Design:
 ![voor user test](/src/web/wwwroot/public/assets/img/rooms/oldLayout.png)

Feedback: </br>
User Lennard Fonteijn
1- Is tasks niet een beetje walkthrough geintegreerd in de game? Of is examinen maar de helft van het werk?
JE zou ervoor kunnen kiezen dat een speler die aan/uit kan zetten om echt helemaal in het diepe gegooid te worden.

2- Als je beetje een detective bent, zou je er als visual nog een notitieblokje van kunnen maken ipv. blauw vlak.

#### UML
 ![UML](/src/web/wwwroot/public/assets/img/rooms/src_diagram.png)

![UML](/src/web/wwwroot/public/assets/img/rooms/uml.png)
 

#### Bronnen:
Knowledge base
* [Knowledgebase HBO-ICT Abstraction ](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/abstraction/#abstractie-abstraction)
* [Knowledgebase HBO-ICT Encapsulation](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/encapsulation/#inkapseling-encapsulation)
* [Knowledgebase HBO-ICT Inheritance](https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/inheritance/#overerving-inheritance)
* * [Knowledgebase HBO-ICT Abstract](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)
 