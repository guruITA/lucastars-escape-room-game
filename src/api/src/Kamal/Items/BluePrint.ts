import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineImageResult } from "../../base/actionResults/ExamineImageResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const BluePrintItemAlias: string = "BluePrint";

export class BluePrintItem extends Item implements Examine {
    public constructor() {
        super(BluePrintItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "BluePrint🔠";
    }

    public examine(): ActionResult | undefined {
        return new ExamineImageResult(["You examine the Blueprint. Perhaps you see something interesting..."], ["Blueprint"]);
    }

}
