import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { FlashLightItemAlias } from "../items/Items/Flashlight";
import { PlayerSession } from "../types";

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
        const playerSession: PlayerSession = getPlayerSession();

        if (choiceId === 1){
            return new TextActionResult(["[John]: Right, the best thing a detective can do is remain calm and take a step back to re-evaluate their own progress. First of all, did you interact with everything in this room? Second of all, did you find upon something interesting? Maybe it ties back into something else important."]);       
        } else if (choiceId === 2){
            return new TextActionResult(["[John]: Suit yourself."]);
        }
        else if (choiceId ===3){
            playerSession.inventory = [];
            return new TextActionResult(["*You showed John the flashlight.*", "[John]: Uhm, nice flashlight?", "[Will]: Can you take this serious John? You think this will come handy anytime soon?", "[John]: My bad kid. The easiest question to ask yourself here is what the purpose of a flashlight is and wether or not you can use it on anything you've seen so far.", "[Will]: I get what you mean but this thing isn't functional.. If only I had something to give it some energy..", "[John]: Sounds like another case to Ace Apprentice Detective William to me, you got this kid.", "[Will]: Was that 'apprentice' part really necessary... Thanks though John.", "[John]: Don't mention it kid."]);
        }

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Ask for guidance"), new TalkChoiceAction(2, "Nevermind")
        ];


        if(playerSession.inventory.includes(FlashLightItemAlias)) {
            choiceActions.push(new TalkChoiceAction(3, "Show the Flashlight to John"));
        }
        return new TalkActionResult(
            this, 
            ["[John]: What's wrong Will?"],
            choiceActions
        );
        // return undefined;
        
    }
}