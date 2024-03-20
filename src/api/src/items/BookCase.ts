// This import is for handling different types of action results.
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";

// These imports are for defining interfaces and aliases related to examining and talking actions.
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../base/actions/TalkAction";

// This import is for the base class representing game items.
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

// import { resetPlayerSession } from "../instances";



/** 
 * Exporting the alias of the BookCase class
 */
export const BookCaseAlias: string = "book-case";

/** 
 * Class representing the BookCase item
 */
export class BookCase extends Item implements Examine, Talk {

    /**
     * Constructor for the BookCase class
     */
    public constructor() {
        
        // Calling the constructor of the superclass (Item) with the book case alias, examine and talk action alias
        super(BookCaseAlias, ExamineActionAlias, TalkActionAlias);

    }


    /**
     * Returns the name of the Book Case
     * @returns The name of the Book Case
     */
    public name(): string {

        return "Book case";

    }


    /**
     * Handles the examine action on the Book Case
     * @returns An action result for examining the Book Case
     */
    public examine(): ActionResult | undefined  {

        const playerSession: PlayerSession = getPlayerSession();

        // Check if the bookcase has been examined or not
        if (playerSession.isBookCaseExamined) {

            // If examined, return a text action result indicating that the bookcase has already been examined
            return new TextActionResult(["You have already examined the bookcase and you have already found the same similar books on the shelf."]);

        } else { 

            // Update examined status to false
            playerSession.isBookCaseExamined = true;

            // If not examined, return a text action result describing the books on the shelves
            return new TextActionResult(["You examined the bookcase and saw several similar books with numbers on the shelves."]);

        }

    }


    /**
     * Handles the talk action on the Book Case
     * @param _choiceId The choice ID representing the player's selection
     * @returns An action result for talking to the Book Case
     */
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return new TextActionResult(["You can't talk to a bookcase "]);
    }

}
