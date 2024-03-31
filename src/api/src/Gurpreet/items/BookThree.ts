// This import is for handling different types of action results.
import { Pickup, PickUpActionLibraryAlias } from "../actions/PickupActionLibrary";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";

// These imports are for defining interfaces and aliases related to examining and talking actions.
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../../base/actions/TalkAction";

// This import is for the base class representing game items.
import { Item } from "../../base/gameObjects/Item";

// Import statement for retrieving the player session
import { getPlayerSession } from "../../instances";

// Import statement for the PlayerSession type
import { PlayerSession } from "../../types";
// import { resetPlayerSession } from "../instances";



/** 
 * Exporting the alias of the BookThree class
 */
export const BookThreeAlias: string = "book-3-item";

/** 
 * Class representing BookThree
 */
export class BookThree extends Item implements Examine, Pickup, Talk {

    /**
     * Constructor for the BookThree class
     */
    public constructor() {

        // Calling the constructor of the superclass (Item) with the book one alias, examine, pickup and talk action alias
        super(BookThreeAlias, ExamineActionAlias, PickUpActionLibraryAlias, TalkActionAlias);

    }


    /**
     * Returns the name of BookThree
     * @returns The name of BookThree
     */
    public name(): string {
        return "Book 3📖";
    }


    /**
     * Handles the examine action on the BookOne
     * @returns An action result for examining the BookOne
     */
    public examine(): ActionResult | undefined {

        return new ExamineActionResult(
            [
                "[Assistant]: Detective, I found something in book 3! There's a number written inside: number 4",
                "[Detective]: Let me see that. Hmm, number 4, you say? Interesting. This might be a clue. Let's keep it in mind as we continue our investigation."
            ], // Text displayed to the player
            ["book3"] // Image displayed of book one to the player
        );

    }


    /**
     * Handles the pickup action on the BookThree
     * @returns An action result for picking up the BookThree
     */
    public pickup(): ActionResult | undefined {

        // Retrieve the player session
        const playerSession: PlayerSession = getPlayerSession();

        // Check if the BookThree item is already in the player's inventory
        if(!playerSession.inventory.includes(BookThreeAlias)) {

            // If the BookThree item is not in the inventory, add it to the inventory
            playerSession.inventory.push(BookThreeAlias);

            playerSession.pickedUpBookThree = true;

            if(playerSession.pickedUpBookOne && playerSession.pickedUpBookTwo && playerSession.pickedUpBookThree) {

                playerSession.pickedUpAllBooks = true;
            
            }

            console.log(playerSession.pickedUpAllBooks);

            if (playerSession.pickedUpAllBooks) {
                return new TextActionResult([
                    "[Assistant]: Detective, I've found something behind the books! There's a locked cabinet here.",
                    "[Detective]: Excellent work, Assistant! You have a keen eye for detail. Let's see if we can find a way to unlock it."
                ]);
            }

            return new TextActionResult(["[Assistant]: Detective, I've picked up the third book, just as you suggested. Maybe it can help us further."]);

        } else {

            // If the BookThree item is already in the inventory, inform the player
            return new TextActionResult(["You already have the third book in your inventory."]);

        } 

    }


    /**
     * Handles the talk action on the BookThree
     * @param _choiceId The choice ID representing the player's selection
     * @returns An action result for talking to Book 3
     */
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return new TextActionResult(["You can't talk to book 3"]);
    }

}
