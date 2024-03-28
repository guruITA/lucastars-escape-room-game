// Import statements for handling different types of action results
import { Pickup, PickUpActionLibraryAlias } from "../actions/PickupActionLibrary";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";

// Import statements for defining interfaces and aliases related to examining and talking actions
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../../base/actions/TalkAction";

// Import statement for the base class representing game items
import { Item } from "../../base/gameObjects/Item";

// Import statement for retrieving the player session
import { getPlayerSession } from "../../instances";

// Import statement for the PlayerSession type
import { PlayerSession } from "../../types";

// import { resetPlayerSession } from "../instances";



/** 
 * Exporting the alias of the BookTwo class
 */
export const BookTwoAlias: string = "book-2-item";

/** 
 * Class representing the BookTwo item
 */
export class BookTwo extends Item implements Examine, Pickup, Talk {

    /**
     * Constructor for the BookTwo class
     */
    public constructor() {

        // Calling the constructor of the superclass (Item) with the book one alias, examine, pickup and talk action alias
        super(BookTwoAlias, ExamineActionAlias, PickUpActionLibraryAlias, TalkActionAlias);

    }


    /**
     * Returns the name of Book 2
     * @returns The name of Book 2
     */
    public name(): string {

        return "Book 2";

    }


    /**
     * Handles the examine action on the BookOne
     * @returns An action result for examining the BookOne
     */
    public examine(): ActionResult | undefined {

        return new ExamineActionResult(
            [
                "[Assistant]: Detective, I found something in book 2! There's a number written inside: number 2",
                "[Detective]: Let me see that. Hmm, number 2, you say? Interesting. This might be a clue. Let's keep it in mind as we continue our investigation."
            ], // Text displayed to the player
            ["book2"] // Image displayed of book one to the player
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

            playerSession.pickedUpBookTwo = true;

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

            return new TextActionResult(["[Assistant]: Detective, I've picked up the second book, just as you suggested. Maybe it can help us further."]);

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
