import { ActionResult } from "../../base/actionResults/ActionResult"; // Importing necessary action result classes
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction"; // Importing examine action and alias
import { Item } from "../../base/gameObjects/Item"; // Importing item class
import { ExamineCodeActionResult } from "../../base/actionResults/ExamineCodeActionResult"; // Importing specific examine code action result class
import { getPlayerSession } from "../../instances"; // Importing function to get player session
import { PlayerSession } from "../../types"; // Importing PlayerSession type

// Alias for LockedCabinet item
export const LockedCabinetItemAlias: string = "Locked Cabinet";

// Class for LockedCabinetItem, extending Item and implementing Examine interface
export class LockedCabinetItem extends Item implements Examine {
    public constructor() {
        // Calling super constructor with alias and examine action alias
        super(LockedCabinetItemAlias, ExamineActionAlias);
    }

    // Method to return item name
    public name(): string {
        return "Locked Cabinet🔒";
    }

    // Method to handle examine action for the item
    public examine(): ActionResult | undefined {
        // Getting player session
        const playerSession: PlayerSession = getPlayerSession();
        
        // Updating player session flag to indicate cabinet examination
        playerSession.isControlRoomCabinetExamined = true;

        // Returning examine code action result with description and associated code
        return new ExamineCodeActionResult(["You approach the locked cabinet in the control room, its sturdy metal frame suggesting it holds something of significance."], ["locked-cabinet-control"]);
    }   
}
