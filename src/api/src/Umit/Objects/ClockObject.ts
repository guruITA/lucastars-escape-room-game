import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interact, InteractActionAlias } from "../actions/InteractAction";
import { Battery1ItemAlias } from "../items/Battery1";


export const ClockObjectAlias: string = "clock";

export class ClockObject extends Item implements Examine, Interact {

    public constructor() {
        super(ClockObjectAlias, ExamineActionAlias, InteractActionAlias);
    }
    
    public name(): string {
        return "Clock";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["[Will]: A grandfather's clock eh? It's been a while since I've seen one, it's typically associated with old people now.", "[John]: .. You know, fun fact, I own one.", "[Will]: ... I feel bad for you.", "[John]: Why do I feel like I've just got insulted..?"]);
  }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpBattery1 && playerSession.pickedUpFlashlight){
            playerSession.inventory.push(Battery1ItemAlias);
        return new TextActionResult(["..!!", "After fidgeting with the clock I noticed there was something shiny stuck inside of it... A battery?? Neat, this is perfect!","[Will]: ?.. Ahh, got it..", "[John]: Noticed something, ain'cha?", "[Will]: That's right, across this battery, someone carved the number 1 across it in latin.. Meaning there is another one hidden somewhere around here.", "[John]: Great eye, Will. We're a step closer."]);
    }
        else{
            return new TextActionResult(["Just your regular clock, doesn't seem to interest me now though, maybe I'll check back later after I found something."]);
        }
}

}