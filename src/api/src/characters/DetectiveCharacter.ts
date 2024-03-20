// This import is for handling different types of action results.
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";

// These imports are for defining interfaces and aliases related to examining and talking actions.
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../base/actions/TalkAction";

// This import is for the base class representing game characters.
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";



/** 
 * Alias for the DetectiveCharacter class
 */
export const DetectiveCharacterAlias: string = "detective-character";

/**
 * Class representing DetectiveCharacter
 */
export class DetectiveCharacter extends Character implements Examine, Talk {

    /**
     * Constructor for the DetectiveCharacter class
     */
    public constructor() {

        // Calling the constructor of the superclass (Character) with the detective character alias, examine and talk action alias
        super(DetectiveCharacterAlias, ExamineActionAlias, TalkActionAlias);

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

        if (!playerSession.isLampOn) {
            return new TextActionResult(["Did you turn the lights on maybe it can help us to investiate in this room"]);
        }
        
        if (!playerSession.isBookCaseExamined) {
            return new TextActionResult(["Have you examined the bookcase?"]);
        }
        
        else if (!playerSession.pickedUpAllBooks) {
            playerSession.showPickupAction = true;
            return new TextActionResult(["You found similar books. Maybe you should pick them up."]);
        } 

         else {
            return new TextActionResult(["You've found the hidden cabinet!"]);
        }
    }
    // public talk(_choiceId?: number): ActionResult | undefined {

    //     const playerSession: PlayerSession = getPlayerSession();

    //     if (!playerSession.isBookCaseExamined) {

    //         // If the player chooses option 1
    //         if (_choiceId === 1) {

    //             playerSession.isBookCaseExamined = true;
    //             // Return text indicating that the player greeted the character
    //             return new TextActionResult(["Have you examined the bookcase"]);

    //         }
    //     }

    //     else if (playerSession.isBookCaseExamined) {

    //         // If the player chooses option 1
    //         if (_choiceId === 1) {

    //             playerSession.isBookCaseExamined = true;
    //             // Return text indicating that the player greeted the character
    //             return new TextActionResult(["Nice you found similar books maybe you can pick them up"]);

    //         }
    //     } 

    //     // If the player chooses option 2
    //     else if (_choiceId === 2) {

    //         // Return text indicating that the player will need the character again
    //         return new TextActionResult(["You will need me again"]);

    //     }

    //     // Presents options to talk with the charachter (Detective)
    //     return new TalkActionResult(
    //         this, // Current character                              
    //         ["Hello!"], // Text displayed to the player
    //         [new TalkChoiceAction(1, "Hello!"), new TalkChoiceAction(2, "Bye!")] // Choices available to the player
    //     );

    // }

}
