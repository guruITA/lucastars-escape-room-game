import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { ImageActionResult } from "../base/actionResults/ImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { PickUp, PickUpActionAlias } from "../actions/PickUp";
import { Item } from "../base/gameObjects/Item";
import { ShowImage, ShowImageActionAlias } from "../actions/ShowImage";

export const StickyNoteItemAlias: string = "Sticky-Note";

export class StickyNoteItem extends Item implements Examine, PickUp, ShowImage {
    public constructor() {
        super(StickyNoteItemAlias, ExamineActionAlias, PickUpActionAlias, ShowImageActionAlias);
    }

    public name(): string {
        return "Sticky Note";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a Sticky Note."]);
    }
    public PickUp(): ActionResult | undefined {
        return new TextActionResult(["You picked up the Sticky Note."]);
    }
    public ShowImage(): ActionResult | undefined {
        return new ImageActionResult("example.png");
    }
}
