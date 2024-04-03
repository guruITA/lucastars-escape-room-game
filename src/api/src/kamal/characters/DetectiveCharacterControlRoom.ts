import { ActionResult } from "../../base/actionResults/ActionResult"; // Importing necessary action result classes
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction"; // Importing examine action and alias
import { Talk, TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction"; // Importing talk action and related classes
import { Character } from "../../base/gameObjects/Character"; // Importing character class

// Alias for detective character control room
export const DetectiveCharacterControlRoomAlias: string = "detective-character-control-room";

// Class for DetectiveCharacterControlRoom, extending Character and implementing Examine, Talk interfaces
export class DetectiveCharacterControlRoom extends Character implements Examine, Talk {
    public constructor() {
        // Calling super constructor with alias and action aliases
        super(DetectiveCharacterControlRoomAlias, ExamineActionAlias, TalkActionAlias);
    }

    // Method to return character name
    public name(): string {
        return "Detective John🕵️‍♂️";
    }

    // Method to handle examine action
    public examine(): ActionResult | undefined  {
        // Returning text action result with hint for examination
        return new TextActionResult(["Ask Detective William McCarthy for hints!"]);
    }

    // Method to handle talk action
    public talk(_choiceId?: number): ActionResult | undefined {
        // Handling different choices of talk action
        if (_choiceId === 1) {
            // If choice 1, return text action result with first hint
            return new TextActionResult(["[John]:  In the bedroom's hidden realm, a secret lies untold,",
            "Unlock the cabinet's embrace with numbers, bold.",
            "On a note, concealed, a clue to behold,",
            "Crack the code, and mysteries shall unfold."]);
        }
        else if (_choiceId === 2) {
            // If choice 2, return text action result with second hint
            return new TextActionResult(["[John]: The code you seek to free the cabinet's hold,",
            "Rests not within the pages, but on a lamp bold.",
            "In the library's quiet, amidst shadows and light,",
            "There lies the key, hidden in plain sight."]);
        }

        // If no specific choice, return talk action result with conversation and choices
        return new TalkActionResult(
            this,
            ["[Will]: Detective, do you have a moment? I could use a hint.",
            "[John]: Of course, Assistant. How can I help you?"],
            [new TalkChoiceAction(1, "can I have the first hint?"), new TalkChoiceAction(2, "Can I have the seconed hint?")]
        );
    }
}
