// import { Examine } from "../../base/actions/ExamineAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
// import { Interact } from "../actions/InteractAction";

export const Battery1ItemAlias: string = "battery1";

export class Battery1Item extends Item implements Examine{
    public constructor() {
        super(Battery1ItemAlias, ExamineActionAlias);
    }

    // interact(): ActionResult | undefined {
    //     throw new Error("Method not implemented.");
    // }

    public examine(): ActionResult | undefined {
       return new ExamineActionResult(["The first battery.. I managed to find it inside the clock and it's got the number 1 carved across it. Where to find the other one..?"], ["battery1"]);
    }
    

    public name(): string {
        return "Battery1";
    }

}