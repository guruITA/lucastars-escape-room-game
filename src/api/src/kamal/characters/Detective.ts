import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";

export const DetectiveCharacterAlias: string = "detective-character";

export class DetectiveCharacter extends Character implements Examine {
    public constructor() {
        super(DetectiveCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Detective William McCarthy🕵️‍♂️";
    }

    public examine(): ActionResult | undefined  {
        return new TextActionResult(["Ask Detective William McCarthy for hints!"]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TextActionResult(["Use the code provided on the sticky note to open the locked cabinet in the bedroom"]);
        }
        else if (_choiceId === 2) {
            return new TextActionResult(["The pin code that you need to open the locked cabinet is provided in the library"]);
        }

        return new TalkActionResult(
            this,
            ["How can I help you!"],
            [new TalkChoiceAction(1, "can I have a hint1?"), new TalkChoiceAction(2, "Can I have  hint2?")]
        );
    }
}
