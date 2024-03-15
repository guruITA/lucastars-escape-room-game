// This import is for handling different types of action results.
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineActionResult } from "../base/actionResults/ExamineActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";

// These imports are for defining interfaces and aliases related to examining and talking actions.
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../base/actions/TalkAction";

// This import is for the base class representing game items.
import { Item } from "../base/gameObjects/Item";

// Import statement for retrieving the player session
import { getPlayerSession } from "../instances";

// Import statement for the PlayerSession type
import { PlayerSession } from "../types";
// import { resetPlayerSession } from "../instances";



/**
 * Exporting the alias of the BookOne class
 */
export const BookOneAlias: string = "book-1-item";

/**
 * Class representing BookOne
 */ 
export class BookOne extends Item implements Examine, Pickup, Talk {

    /**
     * Constructor for the BookOne class
     */
    public constructor() {

        // Calling the constructor of the superclass (Item) with the book one alias, examine, pickup and talk action alias
        super(BookOneAlias, ExamineActionAlias, PickupActionAlias, TalkActionAlias);

    }


    /**
     * Returns the name of BookOne
     * @returns The name of BookOne
     */
    public name(): string {

        return "Book 1";

    }


    /**
     * Handles the examine action on the BookOne
     * @returns An action result for examining the BookOne
     */
    public examine(): ActionResult | undefined {
        
        return new ExamineActionResult(
            ["You are now examining the first book."], // Text displayed to the player
            ["book1"] // Image displayed of book one to the player
        );

    }


    /**
     * Handles the pickup action on the BookOne
     * @returns An action result for picking up the BookOne
     */
    public pickup(): ActionResult | undefined {

        // Retrieve the player session
        const playerSession: PlayerSession = getPlayerSession();
    
        // Check if the BookOne item is already in the player's inventory
        if (!playerSession.inventory.includes(BookOneAlias)) {

            // If the BookOne item is not in the inventory, add it to the inventory
            playerSession.inventory.push(BookOneAlias);
            return new TextActionResult([" Well done! You picked up the first book."]);

        } else {
            
            // If the BookOne item is already in the inventory, inform the player
            return new TextActionResult(["You already have the first book in your inventory."]);

        }

    }


    /**
     * Handles the talk action on the Book Case
     * @param _choiceId The choice ID representing the player's selection
     * @returns An action result for talking to Book 1
     */
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return new TextActionResult(["You can't talk to book 1"]);
    }

}
