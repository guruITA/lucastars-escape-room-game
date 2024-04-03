import { ActionResult } from "../../base/actionResults/ActionResult"; // Importing necessary action result classes
import { TextActionResult } from "../../base/actionResults/TextActionResult"; // Importing specific text action result class
import { ExamineAction } from "../../base/actions/ExamineAction"; // Importing examine action class
import { Action } from "../../base/actions/Action"; // Importing action class
import { GameObject } from "../../base/gameObjects/GameObject"; // Importing game object class
import { Room } from "../../base/gameObjects/Room"; // Importing room class
import { DetectiveCharacterControlRoom } from "../characters/DetectiveCharacterControlRoom"; // Importing DetectiveCharacterControlRoom class
import { getPlayerSession } from "../../instances"; // Importing function to get player session
import { Cam1Item } from "../items/Cam1"; // Importing Cam1Item class
import { Cam2Item } from "../items/Cam2"; // Importing Cam2Item class
import { Cam3Item } from "../items/Cam3"; // Importing Cam3Item class
import { TalkAction } from "../../base/actions/TalkAction"; // Importing talk action class
import { LockedCabinetItem } from "../items/Locked_Cabinet"; // Importing LockedCabinetItem class
import { MainRoom } from "../../Gurpreet_1/rooms/MainRoom"; // Importing MainRoom class
import { CustomAction } from "../../base/actions/CustomAction"; // Importing custom action class
import { StickyNoteItem } from "../items/StickyNote"; // Importing StickyNoteItem class

// Alias for ControlRoom
export const ControlRoomAlias: string = "Control-room";

// Class for ControlRoom, extending Room
export class ControlRoom extends Room {
    public constructor() {
        super(ControlRoomAlias); // Calling super constructor with alias
    }

    // Method to return room name
    public name(): string {
        return "Control Room⚙️";
    }

    // Method to return room images
    public images(): string[] {
        return ["Control_Room"];
    }

    // Method to return available actions in the room
    public actions(): Action[] {
        return [
            new ExamineAction(), // Add examine action
            new TalkAction(), // Add talk action
            new CustomAction("exit-room", "Exit room↜", false) // Add custom action to exit room
        ];       
    }

    // Method to return objects in the room
    public objects(): GameObject[] {
        const objects: GameObject[] = [this]; // Initialize array with current room
        
        // Add objects to the room
        objects.push( 
            new DetectiveCharacterControlRoom(),  
            new Cam1Item(),
            new Cam2Item(),
            new Cam3Item(),
            new StickyNoteItem(),
            new LockedCabinetItem(),
        );
        
        return objects;
    }

    // Method to handle examine action for the room
    public examine(): ActionResult | undefined {
        return new TextActionResult(["[Will]: Wow, this control room is like the nerve center of the entire castle. It's filled with monitors, surveillance cameras, and sticky notes scattered around.",
        
        "[John]: Looks like we've got our work cut out for us. Let's start by examining these monitors. They might give us some insight into what's been happening here.",
        
        "[Will]: Agreed. And these sticky notes could hold valuable clues. Let's make sure not to overlook anything.",
        
        "[John]: Keep an eye out for any cryptic messages or patterns. They could lead us to the pin code we need to unlock that secret room."]);
    }

    // Method to handle custom actions for the room
    public custom(alias: string): ActionResult | undefined {
        let room: Room | undefined;
        
        switch (alias) {
            case "exit-room":
                room = new MainRoom(); // Create MainRoom instance
                break;
            
            default:
                return undefined; // Return undefined if no matching custom action found
        }
    
        if (room) {
            getPlayerSession().currentRoom = room.alias; // Set current room in player session
            return room.examine(); // Return examine result of the new room
        }
    
        return undefined; // Return undefined if room is not defined
    }
}
