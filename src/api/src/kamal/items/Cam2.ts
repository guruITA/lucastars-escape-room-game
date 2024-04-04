import { ActionResult } from "../../base/actionResults/ActionResult"; // Importing necessary action result classes
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult"; // Importing specific examine action result class
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction"; // Importing examine action and alias
import { Item } from "../../base/gameObjects/Item"; // Importing item class

// Alias for Cam2 item
export const Cam2ItemAlias: string = "Cam2";

// Class for Cam2Item, extending Item and implementing Examine interface
export class Cam2Item extends Item implements Examine {
    public constructor() {
        // Calling super constructor with alias and examine action alias
        super(Cam2ItemAlias, ExamineActionAlias);
    }

    // Method to return item name
    public name(): string {
        return "Cam2🎥";
    }

    // Method to handle examine action for the item
    public examine(): ActionResult | undefined {
        // Returning examine action result with description and associated hint
        return new ExamineActionResult(["You examine Cam2. Perhaps you see something interesting..."], ["Bed_Room"]);
    }
}
