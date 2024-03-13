// This section imports necessary classes for handling different types of action results.
import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineActionResult } from "../base/actionResults/ExamineActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";

// These imports are for defining interfaces and aliases related to examining and talking actions.
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Talk, TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";

// This import is for the base class representing game items.
import { Item } from "../base/gameObjects/Item";



// Exporting the alias of the Lamp class
export const LampAlias: string = "Lamp-item";

// Variable to track if the lamp is on or off
export let lampOn: boolean = false;

// Class representing the Lamp
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
            this,
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

        // If the player chooses to turn the lamp on
        if (_choiceId === 1) {

            // Update lamp status to true
            lampOn = true;

            // Return an action result indicating the room is illuminated
            return new ExamineActionResult(
                ["The room is illuminated by the lamp. You can now search more easily."], // Text displayed to the player
                ["library_room"] // Image displayed of illuminated libray to the player
            );

        }
        
        // If the player chooses to turn the lamp off
        else if (_choiceId === 2) { 

            // Update lamp status to true
            lampOn = false;

            // Return an action result indicating the room is dark but the player found a code that is needed to open de locked cabine in control room
            return new ExamineActionResult(
                ["The room plunges into darkness as the lamp goes off.", // Text displayed to the player
                    "But you have found a code, it says 1234 with a camera icon. Well done!"],
                ["library_room_dark"] // Image displayed of dark libray to the player
            );

        }

        // If the player tries to talk to lamp return an action result indicating they can't talk to a lamp. Beacause lamp is an item
        return new TextActionResult(
            ["You can't talk to a lamp"],
        );

    }

}
