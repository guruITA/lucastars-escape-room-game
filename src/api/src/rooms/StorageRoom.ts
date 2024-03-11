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
import { WineBottleItem, WineBottleItemAlias } from "../items/WineBottleItem";
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

        if (!playerSession.inventory.includes(WineBottleItemAlias)) {
            objects.push(new WineBottleItem());
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
