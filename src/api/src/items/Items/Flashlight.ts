import { Interact, InteractActionAlias } from "../../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineImageResult } from "../../base/actionResults/ImageActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const FlashLightItemAlias: string = "flashlight";

export class FlashlightItem extends Item implements Examine, Interact {

    public constructor() {
        super(FlashLightItemAlias, ExamineActionAlias, InteractActionAlias);
    }
    
    public name(): string {
        return "Flashlight";
    }

    public examine(): ActionResult | undefined {
        return new ExamineImageResult(["It's a flashlight...", "*Click*", "Damn..! No luck, the batteries are dead but maybe I can find some new ones in here."], ["flashlight"]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(!playerSession.pickedUpFlashlight) {
            playerSession.pickedUpFlashlight = true;
            playerSession.inventory.push(FlashLightItemAlias);

            return new TextActionResult(["*I picked up the flashlight, now I should go ahead and look for the batteries..*"]);
        }

        return undefined;
    }

}