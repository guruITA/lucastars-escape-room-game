// This import is for handling different types of action results.
import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { ExamineCodeActionResult } from "../../base/actionResults/ExamineCodeActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";

// These imports are for defining interfaces and aliases related to examining and talking actions.
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../../base/actions/TalkAction";

// This import is for the base class representing game items.
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";



/** 
 * Exporting the alias of the LockedCabinet class
 */
export const LockedCabinetLibraryAlias: string = "Locked Cabinet Controlroom";

/** 
 * Class representing the Locked Cabinet item
 */
export class LockedCabinetLibrary extends Item implements Examine, Talk {

    /**
     * Constructor for the LockedCabinetItem class
     */
    public constructor() {

        // Calling the constructor of the superclass (Item) with the locked cabinet alias, examine and talk action alias
        super(LockedCabinetLibraryAlias, ExamineActionAlias, TalkActionAlias);
    }

    /**
     * Returns the name of the Locked Cabinet
     * @returns The name of the Locked Cabinet
     */
    public name(): string {
        return "Locked Cabinet";
    }

    /**
     * Handles the examine action on the Locked Cabinet
     * @returns An action result for examining the Locked Cabinet
     */
    public examine(): ActionResult | undefined {
        


        // Retrieve the player session
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.isLibraryCabinetExamined = true;        

        if (playerSession.pickedUpBookOne && playerSession.pickedUpBookTwo && playerSession.pickedUpBookThree && playerSession.pickedUpBook4) {

            return new ExamineCodeActionResult(
                [
                    "[Will]: Detective, remember those numbers we found in the books earlier? Maybe they're the code for this locked cabinet.",
                    "[John]: Hmm, it's worth a shot. Go ahead and try it, Assistant. You might be onto something."
                ], // Text displayed to the player
                ["locked-cabinet"] // Image displayed of locked cabinet to the player
            );

        } else {

            return new ExamineActionResult([
                "[John]: Assistant, it seems we're missing a crucial piece of the puzzle. Without that missing book, we won't be able to unlock the four-digit code for the locked cabinet.",
                "[Will]: I'll search every inch of this castle until I find it, Detective. There must be a clue somewhere.",
                "[John]: That's the spirit, Assistant. Trust your instincts and leave no stone unturned. I have faith that you'll find the missing book so we can open this locked cabinet."
            ], // Text displayed to the player
                ["locked-cabinet"] // Image displayed of locked cabinet to the player);

            );
            

        }
    }


    /**
     * Handles the talk action on the Book Case
     * @param _choiceId The choice ID representing the player's selection
     * @returns An action result for talking to the Locked Cabinet
     */
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return new TextActionResult(["You can't talk to a locked cabinet "]);
    }


}