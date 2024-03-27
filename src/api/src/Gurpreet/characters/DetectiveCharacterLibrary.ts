// This import is for handling different types of action results.
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";

// These imports are for defining interfaces and aliases related to examining and talking actions.
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../../base/actions/TalkAction";

// This import is for the base class representing game characters.
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";



/** 
 * Alias for the DetectiveCharacter class
 */
export const DetectiveCharacterLibraryAlias: string = "detective-character-library";

/**
 * Class representing DetectiveCharacter
 */
export class DetectiveCharacterLibrary extends Character implements Examine, Talk {

    /**
     * Constructor for the DetectiveCharacter class
     */
    public constructor() {

        // Calling the constructor of the superclass (Character) with the detective character alias, examine and talk action alias
        super(DetectiveCharacterLibraryAlias, ExamineActionAlias, TalkActionAlias);

    }


    /**
     * Returns the name of the Detective Character
     * @returns The name of the Detective Character
     */
    public name(): string {

        return "Detective William McCarthy";

    }


    /**
     * Handles the examine action on the Detective Character
     * @returns An action result for examining the Detective Character
     */
    public examine(): ActionResult | undefined {

        return new TextActionResult(["This is Detective William McCarthy the right person who helps you in this case to find the killer."]);

    }


    /**
     * Handles the talk action on the Detective Character
     * @param _choiceId The choice ID representing the player's selection
     * @returns An action result for talking to the Detective Character
     */
    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        // Check if the lights are on
        if (!playerSession.isLampOn) {
            return new TextActionResult(["[Detective]: Have you turned on the lights? It might help us with our investigation in this room."]);
        }

        // Check if the bookcase has been examined
        if (!playerSession.isBookCaseExamined) {
            return new TextActionResult(["[Detective]: Have you examined the bookcase?"]);
        }

        // Check if all books have been picked up
        if (!playerSession.pickedUpAllBooks) {
            playerSession.showPickupAction = true;
            return new TextActionResult(["[Detective]: You found similar books. Maybe you should pick them up."]);
        }

        // If the player has found the hidden cabinet
        return new TextActionResult(["[Detective]: You've found the locked cabinet! The rest, you'll have to figure out on your own."]);
    }

}
