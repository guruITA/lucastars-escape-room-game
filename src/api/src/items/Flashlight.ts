import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const FlashLightItemAlias: string = "flashlight";

export class FlashlightItem extends Item implements Examine, Pickup {

    public constructor() {
        super(FlashLightItemAlias, ExamineActionAlias, PickupActionAlias);
    }
    
    public name(): string {
        return "Flashlight";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a flashlight...", "*Click*", "Damn..! No luck, the batteries are dead but maybe I can find some new ones in here."]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["AAAAAAAHHHHHHHHHHHHH"]);
    }

}