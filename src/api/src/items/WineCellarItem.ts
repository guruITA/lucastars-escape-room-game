import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { WineBottle1ItemAlias } from "./WineBottle1Item";
import { WineBottle2ItemAlias } from "./WineBottle2Item";
import { WineBottle3ItemAlias } from "./WineBottle3Item";
import { WineBottle4ItemAlias } from "./WineBottle4Item";

export const WineCellarItemAlias: string = "wine-bottle";

export class WineCellarItem extends Item implements Examine {
    public constructor() {
        super(WineCellarItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Wine cellar";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.openedWineCellar) {
            playerSession.openedWineCellar = true;
            playerSession.inventory.push(WineBottle1ItemAlias);
            playerSession.inventory.push(WineBottle2ItemAlias);
            playerSession.inventory.push(WineBottle3ItemAlias);
            playerSession.inventory.push(WineBottle4ItemAlias);
            return new TextActionResult([
                "You examined the wine cellar and discover multiple bottles inside.",
            ]);
        }
        return new TextActionResult(["You already opened the wine cellar."]);
    }
}
