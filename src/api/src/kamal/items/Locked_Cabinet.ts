import { ActionResult } from "../../base/actionResults/ActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { ExamineCodeActionResult } from "../../base/actionResults/ExamineCodeActionResult";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const LockedCabinetItemAlias: string = "Locked Cabinet";

export class LockedCabinetItem extends Item implements Examine {
    public constructor() {
        super(LockedCabinetItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Locked Cabinet🔒";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.isControlRoomCabinetExamined = true;

        return new ExamineCodeActionResult(["You approach the locked cabinet in the control room, its sturdy metal frame suggesting it holds something of significance."], ["locked-cabinet-control"]);
    }

    
}
