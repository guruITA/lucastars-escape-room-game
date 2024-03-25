import { ActionResult } from "../../base/actionResults/ActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { ExamineCodeActionResult } from "../../base/actionResults/ExamineCodeActionResult";

export const LockedRoomItemAlias: string = "Locked Room";

export class LockedRoomItem extends Item implements Examine {
    public constructor() {
        super(LockedRoomItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Locked Room🔒";
    }

    public examine(): ActionResult | undefined {

        return new ExamineCodeActionResult(["Unlock the room"], ["locked-cabinet"]);
    }

    
}
