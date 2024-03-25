// This import is for handling different types of action results.
import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineCodeActionResult } from "../../base/actionResults/ExamineCodeActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";

// These imports are for defining interfaces and aliases related to examining and talking actions.
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../../base/actions/TalkAction";

// This import is for the base class representing game items.
import { Item } from "../../base/gameObjects/Item";



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
        return new ExamineCodeActionResult(
            [
                "[Assistant]: Detective, remember those numbers we found in the books earlier? Maybe they're the code for this locked cabinet.",
                "[Detective]: Hmm, it's worth a shot. Go ahead and try it, Assistant. You might be onto something."
            ], // Text displayed to the player
            ["locked-cabinet"] // Image displayed of locked cabinet to the player
        );
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