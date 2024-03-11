import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { PickupAction } from "../base/actions/PickupAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { WineCellarItem, WineCellarItemAlias } from "../items/WineCellarItem";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { WineBottle1Item } from "../items/WineBottle1Item";
import { WineBottle2Item } from "../items/WineBottle2Item";
import { WineBottle3Item } from "../items/WineBottle3Item";
import { WineBottle4Item } from "../items/WineBottle4Item";

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

        if (!playerSession.openedWineCellar) {
            objects.push(new WineCellarItem());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's an old stuffy storage room!"]);
    }

    public actions(): Action[] {
        return [new ExamineAction(), new PickupAction()];
    }
}
