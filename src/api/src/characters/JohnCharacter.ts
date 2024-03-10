import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const JohnCharacterAlias: string = "john";

export class JohnCharacter extends Character {
    public constructor() {
        super(JohnCharacterAlias, ExamineActionAlias);
    } 

    public name(): string {
        return "John";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's John."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1){
            return new TextActionResult([".. Mmm, well I don't feel like just giving you the right answers at the beginning, why don't you check around the room if anything stands out? Maybe the Bed is something to check out."]);       
        } else if (choiceId === 2){
            return new TextActionResult(["Suit yourself."]);
        }
        return new TalkActionResult(this, ["What's wrong Will?"], [new TalkChoiceAction(1, "Ask for guidance."), new TalkChoiceAction(2, "Nevermind.")]);
        // return undefined;
        
    }
}