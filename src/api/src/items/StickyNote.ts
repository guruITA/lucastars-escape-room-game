import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { PickUp, PickUpActionAlias } from "../actions/PickUpAction";
import { Item } from "../base/gameObjects/Item";
import { PlayerSession } from "../types";
import { getPlayerSession } from "../instances";
import { ExamineImageResult } from "../base/actionResults/ExamineImageResult";

export const StickyNoteItemAlias: string = "Sticky-Note";

export class StickyNoteItem extends Item implements Examine, PickUp {
    public constructor() {
        super(StickyNoteItemAlias, ExamineActionAlias, PickUpActionAlias);
    }

    public name(): string {
        return "Sticky Note";
    }

    public examine(): ActionResult | undefined {
        return new ExamineImageResult(["You examine the sticky note. Perhaps you see something interesting..."], ["StickyNote"]);
    }
    public PickUp(): ActionResult | undefined {
        const playerSession : PlayerSession = getPlayerSession();
        
        if(!playerSession.inventory.includes(StickyNoteItemAlias)) {
            playerSession.inventory.push(StickyNoteItemAlias);
            return new TextActionResult(["You picked up the Sticky Note."]);
        }
        return undefined;
    }
    
}
