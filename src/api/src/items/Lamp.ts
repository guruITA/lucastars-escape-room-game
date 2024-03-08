import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineActionResult } from "../base/actionResults/ExamineActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Talk, TalkChoiceAction } from "../base/actions/TalkAction";
import { Item } from "../base/gameObjects/Item";

export const LampAlias: string = "Lamp-item";

export let lampOn: boolean = false;

export class Lamp extends Item implements Examine, Talk {
    public constructor() {
        super(LampAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Lamp";
    }

    public examine(): ActionResult | undefined {
        return new TalkActionResult(
            this,
            ["Wat wil je met de lamp doen?"],
            [new TalkChoiceAction(1, "Lamp aan"), new TalkChoiceAction(2, "Lamp uit")]
        );
    }

    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        if (_choiceId === 1) {
            lampOn = true;
            return new ExamineActionResult(
                ["De lamp is nu aan"],
                ["library_room"]
            );
        } else if (_choiceId === 2) {
            lampOn = false;
            return new ExamineActionResult(
                ["De lamp is nu uit"],
                ["library_room_dark"]
            );
        }

        return new TextActionResult(
            ["Kan niet met lamp praten"],
        );
    }
}
