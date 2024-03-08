import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineImageResult } from "../base/actionResults/ExamineImageResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const Cam4ItemAlias: string = "Cam4";

export class Cam4Item extends Item implements Examine {
    public constructor() {
        super(Cam4ItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Cam4";
    }

    public examine(): ActionResult | undefined {
        return new ExamineImageResult(["You examine Cam4. Perhaps you see something interesting..."], ["MainHall_Room"]);
    }

}
