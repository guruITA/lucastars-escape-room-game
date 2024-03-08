import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const DetectiveCharacterAlias: string = "detective-character";

export class DetectiveCharacter extends Character implements Examine {
    public constructor() {
        super(DetectiveCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Detective William McCarthy";
    }

    public examine(): ActionResult | undefined  {
        return new TextActionResult(["Detective William McCarthy was een man van weinig woorden maar onwrikbare vastberadenheid. Met een scherpe blik had hij een reputatie opgebouwd als een van de meest bekwame onderzoekers in New York City. Zijn stoïcijnse houding verborg de diepte van zijn toewijding aan gerechtigheid, en zijn vastberadenheid kende geen grenzen in zijn jacht op de waarheid. In zijn donkere ogen brandde een vlam van rechtvaardigheid die hem voortdreef, zelfs in de meest duistere tijden."]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TextActionResult(["Hint 1"]);
        }
        else if (_choiceId === 2) {
            return new TextActionResult(["Hint 2"]);
        }

        return new TalkActionResult(
            this,
            ["Hello!"],
            [new TalkChoiceAction(1, "can i have a hint?"), new TalkChoiceAction(2, "I still don't get it, can i have another one?")]
        );
    }
}
