import { ActionResult } from "../../base/actionResults/ActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";

export const StickyNoteItemAlias: string = "Sticky-Note";

export class StickyNoteItem extends Item implements Examine {
    public constructor() {
        super(StickyNoteItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Sticky Note📃";
    }

    public examine(): ActionResult | undefined {
        return new ExamineActionResult(["You examined the sticky note and found a four-digit pin code written on it.",

                                        "[Will]: Detective, it seems there's a four-digit pin code written on this sticky note: '1865'.",
                                        "[John]: Assistant, that code could be crucial. I suggest writing it down in your notebook for safekeeping. '1865' could be the key to unlocking something significant in this castle. Let's keep our eyes peeled for a lock or a keypad where we can input this code.",
                                        "[Will]: Understood, Detective. I'll write it down right away."], ["StickyNote"]);
    }
   
    
}
