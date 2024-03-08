import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineActionResult } from "../base/actionResults/ExamineActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
// import { resetPlayerSession } from "../instances";


export const BookOneAlias: string = "book-1-item";


export class BookOne extends Item implements Examine, Pickup {

    public constructor() {

        super(BookOneAlias, ExamineActionAlias, PickupActionAlias);

    }


    public name(): string {

        return "Book 1";

    }


    public examine(): ActionResult | undefined {
        
        return new ExamineActionResult(
            ["Book 1"],
            ["book1"]
        );

    }


    public pickup(): ActionResult | undefined {

        const playerSession: PlayerSession = getPlayerSession();
    
        if (!playerSession.inventory.includes(BookOneAlias)) {

            playerSession.inventory.push(BookOneAlias);
            return new TextActionResult(["You picked up the first book. Well done!"]);

        } else {
            
            return new TextActionResult(["You already have the first book in your inventory."]);

        }

    }
    

    // public example(): ActionResult | undefined {
    //     resetPlayerSession();

    //     return new TextActionResult(["This is an example action executed on an item, which caused your game to reset.", "<GAME OVER>"]);
    // }
}
