import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
// import { resetPlayerSession } from "../instances";

export const BookTwoAlias: string = "book-2-item";

export class BookTwo extends Item implements Examine, Pickup {
    public constructor() {
        super(BookTwoAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Book 2";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Book 2"]);
    }

    public pickup(): ActionResult | undefined {

        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(BookTwoAlias)) {

            playerSession.inventory.push(BookTwoAlias);

            return new TextActionResult(["You picked up the second book that you needed"]);

        } else {

            return new TextActionResult(["You have already picked up the second book that you needed"]);

        }

    }

}
