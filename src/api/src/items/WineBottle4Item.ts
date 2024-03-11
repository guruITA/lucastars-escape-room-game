import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../base/actions/PickupAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const WineBottle4ItemAlias: string = "wine-bottle-4";

export class WineBottle4Item extends Item implements Examine, Pickup {
    public constructor() {
        super(WineBottle4ItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Wine bottle 4";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Hmm, this wine looks old. Bottle says 1884"]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(WineBottle4ItemAlias)) {
            playerSession.inventory.push(WineBottle4ItemAlias);
            return new TextActionResult(["You pick up the wine bottle"]);
        }

        return undefined;
    }
}
