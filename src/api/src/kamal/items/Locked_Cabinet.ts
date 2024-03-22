import { ActionResult } from "../../base/actionResults/ActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { ExamineCodeActionResult } from "../../base/actionResults/ExamineCodeActionResult";

export const LockedCabinetItemAlias: string = "Locked Cabinet";

export class LockedCabinetItem extends Item implements Examine {
    public constructor() {
        super(LockedCabinetItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Locked Cabinet🔒";
    }

    public examine(): ActionResult | undefined {

        return new ExamineCodeActionResult(["Unlock the Cabinet"], ["locked-cabinet"]);
    }

    
}
