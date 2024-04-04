import { ActionResult } from "../../base/actionResults/ActionResult"; // Importing necessary action result classes
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction"; // Importing examine action and alias
import { Item } from "../../base/gameObjects/Item"; // Importing item class
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult"; // Importing specific examine action result class

// Alias for StickyNote item
export const StickyNoteItemAlias: string = "Sticky-Note";

// Class for StickyNoteItem, extending Item and implementing Examine interface
export class StickyNoteItem extends Item implements Examine {
    public constructor() {
        // Calling super constructor with alias and examine action alias
        super(StickyNoteItemAlias, ExamineActionAlias);
    }

    // Method to return item name
    public name(): string {
        return "Sticky Note📃";
    }

    // Method to handle examine action for the item
    public examine(): ActionResult | undefined {
        // Returning examine action result with description and associated dialogue
        return new ExamineActionResult(["You examined the sticky note and found a four-digit pin code written on it.",

                                        "[Will]: Detective, it seems there's a four-digit pin code written on this sticky note: '1865'.",
                                        "[John]: Assistant, that code could be crucial. I suggest writing it down in your notebook for safekeeping. '1865' could be the key to unlocking something significant in this castle. Let's keep our eyes peeled for a lock or a keypad where we can input this code.",
                                        "[Will]: Understood, Detective. I'll write it down right away."], ["StickyNote"]);
    }
}
