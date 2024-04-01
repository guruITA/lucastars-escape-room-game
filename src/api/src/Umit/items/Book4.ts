// import { Pickup, PickupActionAlias } from "../../actions/InteractAction";
// import { ActionResult } from "../../base/actionResults/ActionResult";
// import { TextActionResult } from "../../base/actionResults/TextActionResult";
// import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
// import { Item } from "../../base/gameObjects/Item";
// import { getPlayerSession } from "../../instances";
// import { PlayerSession } from "../../types";

// import { ActionResult } from "../../base/actionResults/ActionResult";
// import { Examine } from "../../base/actions/ExamineAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
// import { Interact } from "../actions/InteractAction";

export const Book4ItemAlias: string = "book4";

export class Book4Item extends Item implements Examine {
    public constructor() {
        super(Book4ItemAlias, ExamineActionAlias);
    }

    // interact(): ActionResult | undefined {
    //     throw new Error("Method not implemented.");
    // }

    // examine(): ActionResult | undefined {
    //     throw new Error("Method not implemented.");
    // }
    
    public examine(): ActionResult | undefined {
        return new ExamineActionResult(["The fourth book.. It's best to check out it's contents.", "*Rustle, rustle*", ".. Got it. The last number is 1, that should solve the puzzle inside the library!"], ["book4"]);
     }

    public name(): string {
        return "Book 4";
    }

}