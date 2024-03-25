import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const Cam3ItemAlias: string = "Cam3";

export class Cam3Item extends Item implements Examine {
    public constructor() {
        super(Cam3ItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Cam3🎥";
    }

    public examine(): ActionResult | undefined {
        return new ExamineActionResult(["You examine Cam4. Perhaps you see something interesting..."], ["MainHall_Room"]);
    }

}
