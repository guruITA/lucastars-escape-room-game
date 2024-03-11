import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Open, OpenActionAlias } from "../base/actions/OpenAction";
import { Item } from "../base/gameObjects/Item";
import { resetPlayerSession } from "../instances";

export const WineBottle3ItemAlias: string = "wine-bottle-3"; //1903

export class WineBottle3Item extends Item implements Examine, Open {
    public constructor() {
        super(WineBottle3ItemAlias, ExamineActionAlias, OpenActionAlias);
    }

    public name(): string {
        return "Wine bottle";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Hmm, this wine looks old. Bottle says 1903"]);
    }

    public open(): ActionResult | undefined {
        resetPlayerSession();

        return new TextActionResult(["You died of alcohol poisoning. Game over..."]);
    }
}
