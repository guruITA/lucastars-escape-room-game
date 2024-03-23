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
        return new ExamineActionResult(["You examine the sticky note. Perhaps you see something interesting..."], ["StickyNote"]);
    }
   
    
}
