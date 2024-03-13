// Import statements for handling different types of action results
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineActionResult } from "../base/actionResults/ExamineActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";

// Import statements for defining interfaces and aliases related to examining and talking actions
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../base/actions/TalkAction";

// Import statement for the base class representing game items
import { Item } from "../base/gameObjects/Item";

// Import statement for retrieving the player session
import { getPlayerSession } from "../instances";

// Import statement for the PlayerSession type
import { PlayerSession } from "../types";

// import { resetPlayerSession } from "../instances";



// Exporting the alias of the BookTwo class
export const BookTwoAlias: string = "book-2-item";

// Class representing the BookTwo item
export class BookTwo extends Item implements Examine, Pickup, Talk {

    /**
     * Constructor for the BookTwo class
     */
    public constructor() {

        // Calling the constructor of the superclass (Item) with the book one alias, examine, pickup and talk action alias
        super(BookTwoAlias, ExamineActionAlias, PickupActionAlias, TalkActionAlias);

    }


    /**
     * Returns the name of Book 2
     * @returns The name of Book 2
     */
    public name(): string {

        return "Book 2";

    }


    /**
     * Handles the examine action on Book 2
     * @returns An action result for examining Book 2
     */
    public examine(): ActionResult | undefined {

        return new ExamineActionResult(
            ["You are now examining the second book."],
            ["book1"]
        );

    }


    /**
     * Handles the pickup action on Book 2
     * @returns An action result for picking up Book 2
     */
    public pickup(): ActionResult | undefined {

        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(BookTwoAlias)) {

            // If the BookOne item is not in the inventory, add it to the inventory
            playerSession.inventory.push(BookTwoAlias);
            return new TextActionResult(["Well done! You picked up the second book."]);

        } else {

            // If the BookOne item is already in the inventory, inform the player
            return new TextActionResult(["You already have the second book in your inventory."]);

        }

    }


    /**
     * Handles the talk action on Book 2
     * @param _choiceId The choice ID representing the player's selection
     * @returns An action result for talking to Book 2
     */
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return new TextActionResult(["You can't talk to book 2"]);
    }

}
