// import { Examine } from "../../base/actions/ExamineAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
// import { Interact } from "../actions/InteractAction";

export const Battery2ItemAlias: string = "battery2";

export class Battery2Item extends Item implements Examine {
    public constructor() {
        super(Battery2ItemAlias, ExamineActionAlias);
    }

    // interact(): ActionResult | undefined {
    //     throw new Error("Method not implemented.");
    // }

    // examine(): ActionResult | undefined {
    //     throw new Error("Method not implemented.");
    // }
    public examine(): ActionResult | undefined {
        return new ExamineActionResult(["Finally, the second battery. I should be able to finally light up dark places now..! Let's try the bed."], ["battery2"]);
     }

    public name(): string {
        return "Battery2";
    }

}