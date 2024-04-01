import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";

export const DetectiveCharacterControlRoomAlias: string = "detective-character-control-room";

export class DetectiveCharacterControlRoom extends Character implements Examine {
    public constructor() {
        super(DetectiveCharacterControlRoomAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Detective John🕵️‍♂️";
    }

    public examine(): ActionResult | undefined  {
        return new TextActionResult(["Ask Detective William McCarthy for hints!"]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TextActionResult(["[John]:  In the bedroom's hidden realm, a secret lies untold,",
            "Unlock the cabinet's embrace with numbers, bold.",
            "On a note, concealed, a clue to behold,",
            "Crack the code, and mysteries shall unfold."]);
        }
        else if (_choiceId === 2) {
            return new TextActionResult(["[John]: The code you seek to free the cabinet's hold,",
            "Rests not within the pages, but on a lamp bold.",
            "In the library's quiet, amidst shadows and light,",
            "There lies the key, hidden in plain sight."]);
        }

        return new TalkActionResult(
            this,
            ["[Will]: Detective, do you have a moment? I could use a hint.",
            "[John]: Of course, Assistant. How can I help you?"],
            [new TalkChoiceAction(1, "can I have the first hint?"), new TalkChoiceAction(2, "Can I have the seconed hint?")]
        );
    }
}
