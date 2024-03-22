import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { LibraryRoom } from "../../Gurpreet/rooms/LibraryRoom";
import { CustomAction } from "../../base/actions/CustomAction";
import { ControlRoom } from "../../kamal/rooms/ControlRoom";

export const MainRoomAlias: string = "main-room";

export class MainRoom extends Room {
    public constructor() {
        super(MainRoomAlias);
    }

    public name(): string {
        return "Main room";
    }

    public images(): string[] {
        return ["main_room"];
    }

    public actions(): Action[] {
        return [
            new CustomAction("library-room", "Library room", false), 
            new CustomAction("control-room", "Control room", false)
        ];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();
        return [this, ...inventoryItems];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example room."]);
    }

    public custom(alias: string): ActionResult | undefined {
        let room: Room | undefined;
        
        switch (alias) {
            case "library-room":
                room = new LibraryRoom();
                break;
            case "control-room":
                room = new ControlRoom();
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
