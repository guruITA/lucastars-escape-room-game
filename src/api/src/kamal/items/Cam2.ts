import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const Cam2ItemAlias: string = "Cam2";

export class Cam2Item extends Item implements Examine {
    public constructor() {
        super(Cam2ItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Cam2🎥";
    }

    public examine(): ActionResult | undefined {
        return new ExamineActionResult(["You examine Cam2. Perhaps you see something interesting..."], ["Bed_Room"]);
    }

}
