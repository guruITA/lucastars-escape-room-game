import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const Cam1ItemAlias: string = "Cam1";

export class Cam1Item extends Item implements Examine {
    public constructor() {
        super(Cam1ItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Cam1🎥";
    }

    public examine(): ActionResult | undefined {
        return new ExamineActionResult(["You examine Cam1. Perhaps you see something interesting..."], ["libraryHint"]);
    }

}
