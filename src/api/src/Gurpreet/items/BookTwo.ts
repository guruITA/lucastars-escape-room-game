import { Pickup, PickUpActionLibraryAlias } from "../actions/PickupActionLibrary";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../../base/actions/TalkAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";



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

        return "Book 2📖";

    }


    /**
     * Handles the examine action on the BookOne
     * @returns An action result for examining the BookOne
     */
    public examine(): ActionResult | undefined {

        return new ExamineActionResult(
            [
                "[Will]: Detective, I found something in book 2! There's a number written inside: number 2",
                "[John]: Let me see that. Hmm, number 2, you say? Interesting. This might be a clue. Let's keep it in mind as we continue our investigation."
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

            // Mark BookTwo as picked up
            playerSession.pickedUpBookTwo = true;

            // Check if all books are picked up
            if (playerSession.pickedUpBookOne && playerSession.pickedUpBookTwo && playerSession.pickedUpBookThree) {

                playerSession.pickedUpAllBooks = true;

            }

            // If all books are picked up, provide additional dialogue
            if (playerSession.pickedUpAllBooks) {
                return new TextActionResult([
                    "[Will]: Detective, I've found something behind the books! There's a locked cabinet here.",
                    "[John]: Excellent work, Assistant! You have a keen eye for detail. Let's see if we can find a way to unlock it."
                ]);
            }

            // Provide feedback about picking up BookTwo
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
