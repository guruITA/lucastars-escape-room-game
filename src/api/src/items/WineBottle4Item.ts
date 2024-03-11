import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Open, OpenActionAlias } from "../base/actions/OpenAction";
import { Item } from "../base/gameObjects/Item";
import { resetPlayerSession } from "../instances";

export const WineBottle4ItemAlias: string = "wine-bottle-4"; //1884

export class WineBottle4Item extends Item implements Examine, Open {
    public constructor() {
        super(WineBottle4ItemAlias, ExamineActionAlias, OpenActionAlias);
    }

    public name(): string {
        return "Wine bottle";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Hmm, this wine looks old. Bottle says 1884"]);
    }

    public open(): ActionResult | undefined {
        resetPlayerSession();

        return new TextActionResult(["You died of alcohol poisoning. Game over..."]);
    }
}
