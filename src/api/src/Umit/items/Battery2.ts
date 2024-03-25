// import { Examine } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
// import { Interact } from "../actions/InteractAction";

export const Battery2ItemAlias: string = "battery2";

export class Battery2Item extends Item {
    public constructor() {
        super(Battery2ItemAlias);
    }

    // interact(): ActionResult | undefined {
    //     throw new Error("Method not implemented.");
    // }

    // examine(): ActionResult | undefined {
    //     throw new Error("Method not implemented.");
    // }
    

    public name(): string {
        return "Battery2";
    }

}