import { ActionResult } from "../../base/actionResults/ActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { ExamineCodeActionResult } from "../../base/actionResults/ExamineCodeActionResult";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const ChestObjectAlias: string = "Chest";

export class ChestObject extends Item implements Examine {
    public constructor() {
        super(ChestObjectAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Chest🔒";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.isBedRoomChestExamined = true;

        return new ExamineCodeActionResult(["Unlock the chest"],["chestlock"]);
    }

    
}
