// This section imports necessary classes for handling different types of action results.
import { ActionResult } from "../../base/actionResults/ActionResult";
import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";

// These imports are for defining interfaces and aliases related to examining and talking actions.
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction";

// This import is for the base class representing game items.
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";



/** 
 * Exporting the alias of the Lamp class
 */
export const LampAlias: string = "Lamp-item";

/** 
 * Class representing the Lamp
*/
export class Lamp extends Item implements Examine, Talk {

    /**
     * Constructor for the Lamp item
     */
    public constructor() {

        // Calling the constructor of the superclass (Item) with the lamp alias, examine action alias and talk action alias
        super(LampAlias, ExamineActionAlias, TalkActionAlias);

    }


    /**
     * Returns the name of the Lamp
     * @returns The name of the Lamp
     */
    public name(): string {

        return "Lamp";

    }


    /**
     * Handles the examine action on the Lamp
     * @returns An action result for examining the Lamp
     */
    public examine(): ActionResult | undefined {

        // Presents options for interacting with the lamp through talking
        return new TalkActionResult(
            this, // Current item
            ["What do you want to do with the lamp?"], // Text displayed to the player
            [new TalkChoiceAction(1, "Turn it on"), new TalkChoiceAction(2, "Turn it off")] // Choices available to the player
        );

    }


    /**
     * Handles the talk action on the Lamp
     * @param _choiceId The choice ID representing the player's selection
     * @returns An action result based on the player's choice
     */
    public talk(_choiceId?: number | undefined): ActionResult | undefined {

        const playerSession: PlayerSession = getPlayerSession();

        // If the player chooses to turn the lamp on
        if (_choiceId === 1) {

            // Update lamp status to true
            playerSession.isLampOn = true;

            // Return an action result indicating the room is illuminated
            return new ExamineActionResult(
                [
                    "[Assistant]: This library is so big, with rows of towering bookshelves.",
                    "[Assistant]: The air is thick with the smell of old paper, and shadows dance in the corners.",
                    "[Assistant]: There's a desk in the center of the room, there is too much to explore. Where should I begin to search? Hmm, let's begin!",
                    "[Detective]: Start by checking the bookshelves. We often find valuable clues hidden among the books.",
                    "[Assistant]: Understood, Detective. I'll start there and then move on to the desk.",
                    "[Detective]: Remember to be thorough. We can't afford to miss anything."
                ], // Text displayed to the player
                ["library_room"] // Image displayed of illuminated libray to the player
            );

        }

        // If the player chooses to turn the lamp off
        else if (_choiceId === 2) {

            // Update lamp status to true
            playerSession.isLampOn = false;

            // Return an action result indicating the room is dark but the player found a code that is needed to open de locked cabine in control room
            return new ExamineActionResult(
                [
                    "[Assistant]: Owh, this room is dark. It's hard to see anything in here.",
                    "[Detective]: Maybe we should find a lamp to shed some light on the situation.",
                    "[Assistant]: Agreed. Let's search around for any source of light. Perhaps there's a lamp or a switch nearby.",
                    "[Detective]: Keep an eye out for any clues while we're at it. The darkness might be hiding something important.",
                    "[Assistant]: Will do, Detective. I'll be sure to inspect every nook and cranny.",
                    "As you search for a light source, you stumble upon the lamp on the desk. Upon closer inspection, you notice something unusual about it. There's an engraved code on it: '1234' with an icon of a camera.",
                    "[Assistant]: Detective, I think I've found something on the lamp. It's a code: '1234' with a camera icon."
                ],
                ["library_room_dark"] // Image displayed of dark libray to the player
            );

        }

        // If the player tries to talk to lamp return an action result indicating they can't talk to a lamp. Beacause lamp is an item
        return new TextActionResult(
            ["You can't talk to a lamp"],
        );

    }

}
