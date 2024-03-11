//import { ExampleAction } from "../actions/ExampleAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { PickupAction } from "../base/actions/PickupAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { WineBottle1Item, WineBottle1ItemAlias } from "../items/WineBottle1Item";
import { WineBottle2Item, WineBottle2ItemAlias } from "../items/WineBottle2Item";
import { WineBottle3Item, WineBottle3ItemAlias } from "../items/WineBottle3Item";
import { WineBottle4Item, WineBottle4ItemAlias } from "../items/WineBottle4Item";
import { PlayerSession } from "../types";

export const StorageRoomAlias: string = "storage-room";

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

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if (!playerSession.inventory.includes(WineBottle1ItemAlias)) {
            objects.push(new WineBottle1Item());
        }

        if (!playerSession.inventory.includes(WineBottle2ItemAlias)) {
            objects.push(new WineBottle2Item());
        }

        if (!playerSession.inventory.includes(WineBottle3ItemAlias)) {
            objects.push(new WineBottle3Item());
        }

        if (!playerSession.inventory.includes(WineBottle4ItemAlias)) {
            objects.push(new WineBottle4Item());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's an old stuffy storage room!"]);
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new PickupAction(),
            new CustomAction("inspect-storage-box", "Test action", false),
        ];
    }
}
