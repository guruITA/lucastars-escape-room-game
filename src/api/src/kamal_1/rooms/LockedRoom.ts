import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { CustomAction } from "../../base/actions/CustomAction";
import { LockedCabinetItem } from "../rooms/lockedRoom1";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { MainRoom } from "../../Gurpreet_1/rooms/MainRoom";

export const LockedRoomAlias: string = "LockedRoom";

export class LockedRoom extends Room {
    public constructor() {
        super(LockedRoomAlias);
    }

    public name(): string {
        return "LockedRoom";
    }

    public images(): string[] {
        return ["MainHall_Room"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new CustomAction("MianRoom", "MianRoom↜", false), 
        ];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new LockedCabinetItem()];
    }


    public examine(): ActionResult | undefined {
        return new TextActionResult(["this is the locked Room"]);
    }

    public custom(alias: string): ActionResult | undefined {
        let room: Room | undefined;
        
        switch (alias) {
            case "MianRoom":
                room = new MainRoom();
                break;

            default:
                return undefined; 
        }
    
        if (room) {
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
    
        return undefined;
    }
    
}
