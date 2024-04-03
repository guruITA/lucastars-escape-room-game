import { ActionResult } from "../../base/actionResults/ActionResult"; // Importing necessary action result classes
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult"; // Importing specific examine action result class
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction"; // Importing examine action and alias
import { Item } from "../../base/gameObjects/Item"; // Importing item class

// Alias for Cam3 item
export const Cam3ItemAlias: string = "Cam3";

// Class for Cam3Item, extending Item and implementing Examine interface
export class Cam3Item extends Item implements Examine {
    public constructor() {
        // Calling super constructor with alias and examine action alias
        super(Cam3ItemAlias, ExamineActionAlias);
    }

    // Method to return item name
    public name(): string {
        return "Cam3🎥";
    }

    // Method to handle examine action for the item
    public examine(): ActionResult | undefined {
        // Returning examine action result with description and associated hint
        return new ExamineActionResult(["You examine Cam4. Perhaps you see something interesting..."], ["MainHall_Room"]);
    }
}
