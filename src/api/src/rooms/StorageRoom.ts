import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { PickupAction } from "../base/actions/PickupAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { WineCellarItem } from "../items/WineCellarItem";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { ChestItem } from "../items/ChestItem";
import { OpenAction } from "../base/actions/OpenAction";

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
}
