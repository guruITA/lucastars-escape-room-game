// This import is for handling different types of action results.
import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";

// These imports are for defining interfaces and aliases related to examining and talking actions.
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Talk, TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";

// This import is for the base class representing game characters.
import { Character } from "../base/gameObjects/Character";



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
    public examine(): ActionResult | undefined  {

        return new TextActionResult(["This is Detective William McCarthy the right person who helps you in this case to find the killer."]);
        
    }


    /**
     * Handles the talk action on the Detective Character
     * @param _choiceId The choice ID representing the player's selection
     * @returns An action result for talking to the Detective Character
     */
    public talk(_choiceId?: number): ActionResult | undefined {

        // If the player chooses option 1
        if (_choiceId === 1) {

            // Return text indicating that the player greeted the character
            return new TextActionResult(["You greet the example character."]);

        }

        // If the player chooses option 2
        else if (_choiceId === 2) {

            // Return text indicating that the player will need the character again
            return new TextActionResult(["You will need me again"]);

        }

        // Presents options to talk with the charachter (Detective)
        return new TalkActionResult(
            this, // Current character
            ["Hello!"], // Text displayed to the player
            [new TalkChoiceAction(1, "Hello!"), new TalkChoiceAction(2, "Bye!")] // Choices available to the player
        );

    }

}
