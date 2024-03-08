import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineImageResult } from "../base/actionResults/ExamineImageResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const Cam3ItemAlias: string = "Cam3";

export class Cam3Item extends Item implements Examine {
    public constructor() {
        super(Cam3ItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Cam3";
    }

    public examine(): ActionResult | undefined {
        return new ExamineImageResult(["You examine Cam3. Perhaps you see something interesting..."], ["Storage_Room"]);
    }

}
