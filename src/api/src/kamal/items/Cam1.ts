import { ActionResult } from "../../base/actionResults/ActionResult"; // Importing necessary action result classes
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult"; // Importing specific examine action result class
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction"; // Importing examine action and alias
import { Item } from "../../base/gameObjects/Item"; // Importing item class

// Alias for Cam1 item
export const Cam1ItemAlias: string = "Cam1";

// Class for Cam1Item, extending Item and implementing Examine interface
export class Cam1Item extends Item implements Examine {
    public constructor() {
        // Calling super constructor with alias and examine action alias
        super(Cam1ItemAlias, ExamineActionAlias);
    }

    // Method to return item name
    public name(): string {
        return "Cam1🎥";
    }

    // Method to handle examine action for the item
    public examine(): ActionResult | undefined {
        // Returning examine action result with description and associated hint
        return new ExamineActionResult(["You examine Cam1. Perhaps you see something interesting..."], ["libraryHint"]);
    }
}
