import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Open, OpenActionAlias } from "../base/actions/OpenAction";
import { Item } from "../base/gameObjects/Item";
import { resetPlayerSession } from "../instances";

export const WineBottle1ItemAlias: string = "wine-bottle-1"; //1897

export class WineBottle1Item extends Item implements Examine, Open {
    public constructor() {
        super(WineBottle1ItemAlias, ExamineActionAlias, OpenActionAlias);
    }

    public name(): string {
        return "Wine bottle";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Hmm, this wine looks old. Bottle says 1987"]);
    }

    public open(): ActionResult | undefined {
        resetPlayerSession();

        return new TextActionResult(["You died of alcohol poisoning. Game over..."]);
    }

    public images(): string[] {
        return ["bottle_1903"];
    }
}
