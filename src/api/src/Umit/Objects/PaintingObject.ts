import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interact, InteractActionAlias } from "../actions/InteractAction";
import { Battery2ItemAlias } from "../items/Battery2";


export const PaintingObjectAlias: string = "painting";

export class PaintingObject extends Item implements Examine, Interact {

    public constructor() {
        super(PaintingObjectAlias, ExamineActionAlias, InteractActionAlias);
    }
    
    public name(): string {
        return "Painting";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["[Will]: Just a regular painting... Art's never really been my thing in all honesty.", "[John]: Me neither, it's just that my lady insists spending our pennies on a new painting every now and then, I frankly don't see why."]);
  }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpBattery2 && playerSession.pickedUpFlashlight && playerSession.pickedUpBattery1){
            playerSession.pickedUpBattery2 = true;
            playerSession.inventory.push(Battery2ItemAlias);
        return new TextActionResult([".... Ahh!! I see.","*Fidget, fidget*","This was here all along? You serious??","[John]: Great work Will. Now there is one thing left to do in here."]);
    }
        else{
            return new TextActionResult(["Been staring at this painting for a minute, can't explain why but.. Something's off. I'll maybe get back later here."]);
        }
}

}