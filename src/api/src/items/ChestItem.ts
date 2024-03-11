import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Open, OpenActionAlias } from "../base/actions/OpenAction";
import { Item } from "../base/gameObjects/Item";

export const ChestItemAlias: string = "chest";

export class ChestItem extends Item implements Examine, Open {
    public constructor() {
        super(ChestItemAlias, ExamineActionAlias, OpenActionAlias);
    }

    public name(): string {
        return "Chest";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "A small chest that might hold a secret...",
            "It appears to have a padlock on it",
        ]);
    }

    public open(): ActionResult | undefined {
        return new TextActionResult(["Enter the correct pin:"]);
    }
}
