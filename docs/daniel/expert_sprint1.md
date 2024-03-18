# Expert review - Sprint 1 - Daniël
Hier bevindt zich alle documentatie voor mijn expert review van sprint 1

## Gekozen learning stories

### 1. Als student wil ik leren hoe ik de OO-principes abstraction, encapsulation en inheritance toepas in mijn code
#### Abstraction
Voor een van de items in mijn gameroom heb ik een class gemaakt: 'WineCellarItem'. In deze class gebruik ik enkel de logica/imports/methods die benodigd zijn.

````ts
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { WineBottle1ItemAlias } from "./WineBottle1Item";
import { WineBottle2ItemAlias } from "./WineBottle2Item";
import { WineBottle3ItemAlias } from "./WineBottle3Item";
import { WineBottle4ItemAlias } from "./WineBottle4Item";

export const WineCellarItemAlias: string = "wine-bottle";

export class WineCellarItem extends Item implements Examine {
    public constructor() {
        super(WineCellarItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Wine cellar";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.openedWineCellar) {
            playerSession.openedWineCellar = true;
            playerSession.inventory.push(WineBottle1ItemAlias);
            playerSession.inventory.push(WineBottle2ItemAlias);
            playerSession.inventory.push(WineBottle3ItemAlias);
            playerSession.inventory.push(WineBottle4ItemAlias);
            return new TextActionResult([
                "You examined the wine cellar and discover multiple bottles inside.",
            ]);
        }
        return new TextActionResult(["You already opened the wine cellar."]);
    }
}


````

#### Encapsulation
In de class 'StorageRoom' bevinden zich methoden met de access modifier 'public' wat betekend dat deze buiten de class kunnen worden aangeroepen op een instantie de class.

````ts
    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, new ChestItem(), ...getGameObjectsFromInventory()];

        if (!playerSession.openedWineCellar) {
            objects.push(new WineCellarItem());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's an old stuffy storage room!"]);
    }

    public actions(): Action[] {
        return [new ExamineAction(), new OpenAction()];
    }
````

#### Inheritance
De class 'StorageRoom' overerft van de class 'Room'. In de constructor wordt d.m.v. de super methode de constructor van de overgeërfde class ook uitgevoerd.

````ts
import { Room } from "../base/gameObjects/Room";

export const StorageRoomAlias: string = "storage-room";

export class StorageRoom extends Room {
    public constructor() {
        super(StorageRoomAlias);
    }
}
````

### 2. Als student wil ik leren hoe ik het OO-principe polymorfisme toepas in mijn code
Polymorphism pas ik toe in mijn class 'StorageRoom'. Deze overerft nl. van de class 'Room' welke een images methode bevat. In de StorageRoom class definieer bepaal ik wat die methode in dit geval doet. 

````ts
export class StorageRoom extends Room {
    public constructor() {
        super(StorageRoomAlias);
    }

    public name(): string {
        return "Storage Room";
    }

    public images(): string[] {
        return ["bg_storage_room"];
    }
````

### 3. Als student wil ik leren hoe ik abstracte classes toepas in mijn code
In mijn class WineBottle1Item overerf ik van een abstracte class, nl. GameObject. In de GameObject class wordt bijv. een methode name gedefinieerd zonder te beschrijven wat deze doet. In de WineBottle1Item moet ik deze methode definieren omdat ik hier pas bepaal wat deze doet.

````ts
export abstract class GameObject implements HasInterfaces {
    private _alias: string;
    private _interfaces: string[];

    /**
     * Create a new instance of this game object
     * 
     * @param alias Alias of this game object
     * @param interfaces List of interfaces this game object implements
     */
    protected constructor(alias: string, ...interfaces: string[]) {
        this._alias = alias;
        this._interfaces = interfaces;
    }

    /**
     * Name of this game object
     */
    public abstract name(): string;
    

export class WineBottle1Item extends Item implements Examine, Open {
    public constructor() {
        super(WineBottle1ItemAlias, ExamineActionAlias, OpenActionAlias);
    }

    public name(): string {
        return "Wine bottle";
    }
````

## Bronnen
1. Knowledgebase HBO-ICT - Concepten in Object Oriented Programming - https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/0_oop_concepten/
2. Knowledgebase HBO-ICT - Pijlers van OOP - https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/pijlers_van_oop/0_pijlers_van_oop/
3. Stackify - OOP Concepts for Beginners: What is Polymorphism - https://stackify.com/oop-concept-polymorphism/   
