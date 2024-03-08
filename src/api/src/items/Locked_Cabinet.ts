import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineImageResult } from "../base/actionResults/ExamineImageResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { Talk, TalkChoiceAction } from "../base/actions/TalkAction";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const LockedCabinetItemAlias: string = "Locked Cabinet";

export class LockedCabinetItem extends Item implements Examine, Talk {
    public constructor() {
        super(LockedCabinetItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Locked Cabinet";
    }

    public examine(): ActionResult | undefined {
        return new ExamineImageResult(["Oh the cabinet is locked....... sometimes a bit of talking helps (;"], ["PinCode"]);

    }

    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        if (_choiceId === 1) {
            return new ExamineImageResult(
                ["try again"],
                ["example"]
            );
        }
        else if (_choiceId === 2) {
            return new ExamineImageResult(
                ["try again"],
                ["library_room"]
            );
        }
        else if (_choiceId === 3) {
            return new ExamineImageResult(
                ["try again"],
                ["library_room"]
            );
        }

        else if (_choiceId === 4) {
            return new ExamineImageResult(
                ["correct"],
                ["library_room"]
            );
        }

        return new TalkActionResult(
            this,
            ["good luck!"],
            [new TalkChoiceAction(1, "1 2 3 4"), new TalkChoiceAction(2, "2 3 4 1"),  new TalkChoiceAction(3, "3 4 1 2"),  new TalkChoiceAction(4, "4 1 2 3")]
        );
    }


}
