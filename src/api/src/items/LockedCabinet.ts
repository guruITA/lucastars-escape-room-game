// This import is for handling different types of action results.
import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineCodeActionResult } from "../base/actionResults/ExamineCodeActionResult";

// These imports are for defining interfaces and aliases related to examining actions.
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";

// This import is for the base class representing game items.
import { Item } from "../base/gameObjects/Item";
 


// Exporting the alias for the LibraryRoom class
export const LockedCabinetItemAlias: string = "Locked Cabinet";

// Class representing the Locked Cabinet item
export class LockedCabinetItem extends Item implements Examine {

    /**
     * Constructor for the LockedCabinetItem class
     */
    public constructor() {

        // Calling the constructor of the superclass (Item) with the locked cabinet alias, examine action alias
        super(LockedCabinetItemAlias, ExamineActionAlias);
    }
 
    /**
     * Returns the name of the Locked Cabinet
     * @returns The name of the Locked Cabinet
     */
    public name(): string {
        return "Locked Cabinet";
    }
 
    /**
     * Handles the examine action on the Locked Cabinet
     * @returns An action result for examining the Locked Cabinet
     */
    public examine(): ActionResult | undefined {
        return new ExamineCodeActionResult(
            ["Unlock the locked cabinet to find the second number of secret room"], // Text displayed to the player
            ["locked-cabinet"] // Image displayed of locked cabinet to the player
            );
    }
 
   
}