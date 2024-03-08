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
            ["What do you want to do with the lamp?"],
            [new TalkChoiceAction(1, "Turn it on"), new TalkChoiceAction(2, "Turn it off")]
        );

    }


    public talk(_choiceId?: number | undefined): ActionResult | undefined {

        if (_choiceId === 1) {

            lampOn = true;

            return new ExamineActionResult(
                ["The room is illuminated by the lamp. You can now search more easily."],
                ["library_room"]
            );

        } else if (_choiceId === 2) {

            lampOn = false;

            return new ExamineActionResult(
                ["The room plunges into darkness as the lamp goes off."],
                ["library_room_dark"]
            );

        }

        return new TextActionResult(
            ["You can't talk to a lamp"],
        );

    }

}
