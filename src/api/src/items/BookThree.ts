import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
// import { resetPlayerSession } from "../instances";

export const BookThreeAlias: string = "book-3-item";

export class BookThree extends Item implements Examine, Pickup {
    public constructor() {
        super(BookThreeAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Book 3";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Book 3"]);
    }

    public pickup(): ActionResult | undefined {

        const playerSession: PlayerSession = getPlayerSession();

        if(!playerSession.inventory.includes(BookThreeAlias)) {

            playerSession.inventory.push(BookThreeAlias);

            return new TextActionResult(["You picked up the third book that you needed"]);

        } else {

            return new TextActionResult(["You have already picked up the third book that you needed"]);

        } 

    }

    // public example(): ActionResult | undefined {
    //     resetPlayerSession();

    //     return new TextActionResult(["This is an example action executed on an item, which caused your game to reset.", "<GAME OVER>"]);
    // }
}
