import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { DetectiveCharacterControlRoom } from "../characters/DetectiveCharacterControlRoom";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { StickyNoteItem, StickyNoteItemAlias } from "../items/StickyNote";
import { BluePrintItem } from "../items/BluePrint";
import { Cam1Item } from "../items/Cam1";
import { Cam2Item } from "../items/Cam2";
import { Cam3Item } from "../items/Cam3";
import { PlayerSession } from "../../types";
import { TalkAction } from "../../base/actions/TalkAction";
import { LockedCabinetItem } from "../items/Locked_Cabinet";
import { MainRoom } from "../../Gurpreet_1/rooms/MainRoom";
import { CustomAction } from "../../base/actions/CustomAction";


export const ControlRoomAlias: string = "Control-room";

export class ControlRoom extends Room {
    public constructor() {
        super(ControlRoomAlias);
    }

    public name(): string {
        return "Control Room⚙️";
    }

    public images(): string[] {
        return ["Control_Room"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(), 
            new CustomAction("exit-room", "Exit room↜", false)

            ];       
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if (!playerSession.inventory.includes(StickyNoteItemAlias)){
            objects.push(new StickyNoteItem());
        }
        
        objects.push( 
            new DetectiveCharacterControlRoom(),  
            new BluePrintItem(), 
            new Cam1Item(),
            new Cam2Item(),
            new Cam3Item(),
            new LockedCabinetItem(),
        );

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["[Assistant]: Wow, this control room is like the nerve center of the entire castle. It's filled with monitors, surveillance cameras, and sticky notes scattered around.",
        
        "[Detective]: Looks like we've got our work cut out for us. Let's start by examining these monitors. They might give us some insight into what's been happening here.",
        
        "[Assistant]: Agreed. And these sticky notes could hold valuable clues. Let's make sure not to overlook anything.",
        
        "[Detective]: Keep an eye out for any cryptic messages or patterns. They could lead us to the pin code we need to unlock that secret room."]);
    }
    public custom(alias: string): ActionResult | undefined {
        let room: Room | undefined;
        
        switch (alias) {
            case "exit-room":
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
