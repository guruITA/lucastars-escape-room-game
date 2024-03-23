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
            new CustomAction("MainRoom", "MainRoom↜", false)

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
        return new TextActionResult(["The control room serves as the nerve center for the entire castle.As the players, you must navigate through a series of clues left behind in the room to uncover the mysteries surrounding the castle.The control room is equipped with surveillance cameras, monitors and sticky notes left behind by the previous occupants. you must decipher the cryptic messages and piece together the clues to get to the pin code to open the secret room."]);
    }
    public custom(alias: string): ActionResult | undefined {
        let room: Room | undefined;
        
        switch (alias) {
            case "MainRoom":
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
