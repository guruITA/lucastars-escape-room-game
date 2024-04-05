import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession } from "../../instances";
import { LibraryRoom } from "../../Gurpreet/rooms/LibraryRoom";
import { CustomAction } from "../../base/actions/CustomAction";
import { ControlRoom } from "../../kamal/rooms/ControlRoom";
import { LockedRoom } from "../../kamal_1/rooms/LockedRoom";
import { BedRoom } from "../../Umit/rooms/BedRoom";
import { TalkAction } from "../../base/actions/TalkAction";
import { JohnMainCharacter } from "../../Umit/characters/JohnCharacterMain";



/**
 * Exporting the alias for the MainRoom class
 */
export const MainRoomAlias: string = "main-room";



/** 
 * Class representing the MainRoom
 */
export class MainRoom extends Room {

    /**
    * Constructor for MainRoom class
    */
    public constructor() {

        // Calling the constructor of the superclass (Room)
        super(MainRoomAlias);
    }


    /**
    * Returns the name of the room
    * @returns The name of the room
    */
    public name(): string {

        return "Main room🏛️";

    }


    /**
     * Returns an array of image name of the room
     * @returns An array of image names
     */
    public images(): string[] {

        return ["MainHall_Room"];

    }


    /**
     * Returns an array of available actions in the room.
     * 
     * @returns An array of `Action` objects representing available actions.
     */
    public actions(): Action[] {

        return [
            // Define a custom action for moving to the library room
            new CustomAction("library-room", "Library↜", false),

            // Define a custom action for moving to the control room
            new CustomAction("control-room", "Control Room↜", false),

            // Define a custom action for moving to the locked room
            new CustomAction("LockedRoom", "LockedRoom↜", false),

            // Define a custom action for moving to the bedroom
            new CustomAction("Bedroom", "Bedroom↜", false),

            // Define a talk action for initiating dialogue
            new TalkAction()
        ];
    }



    /**
     * Returns an array of game objects in the room
     * @returns An array of GameObject objects
     */
    public objects(): GameObject[] {

        // Returning the array with the character
        return [new JohnMainCharacter()];
    }


    /**
     * Provides a description of the current room and initiates dialogue with the assistant.
     * 
     * @returns An `ActionResult` representing the description and dialogue, or `undefined` if the room cannot be examined.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "[John]: Seems we've entered the main hall, Will. Our investigation begins here.",
            "[Will]: About time, let's hope that anonymous tip didn't lead us to another red herring... It's chilling to think what secrets these walls might hold.",
            "[John]: Indeed. We must be thorough in our search. Let us begin.",
            "[Will]: Sounds good, I'll try my best, where do I even begin?",
            "[John]: Before you start have you already mastered the basics?",
            "[Will]: I believe I have..?",
            "[John]: Mmm, I'll take your word for it, but if you're confused with certain actions feel free to use [ TALK ] for a refresh course.",
            "[Will]: Thanks John, appreciate it."
        ]);
    }


    /**
     * Performs a custom action based on the provided alias.
     * 
     * @param alias The alias of the action to perform.
     * @returns An `ActionResult` if the action was executed successfully, otherwise undefined.
     */
    public custom(alias: string): ActionResult | undefined {
        let room: Room | undefined;

        // Determine the action to perform based on the provided alias
        switch (alias) {

            case "library-room":

                // If the alias is "library-room", create a new LibraryRoom instance
                room = new LibraryRoom();
                break;

            case "control-room":

                // If the alias is "control-room", create a new ControlRoom instance
                room = new ControlRoom();
                break;

            case "LockedRoom":

                // If the alias is "LockedRoom", create a new LockedRoom instance
                room = new LockedRoom();
                break;

            case "Bedroom":

                // If the alias is "Bedroom", create a new BedRoom instance
                room = new BedRoom();
                break;

            default:

                // If the alias does not match any known action, return undefined
                return undefined;
        }

        // If a valid room instance was created
        if (room) {

            // Update the current room of the player session to the alias of the new room
            getPlayerSession().currentRoom = room.alias;

            // Execute the examine method of the new room and return the result
            return room.examine();

        }

        // Return undefined if no valid action was performed
        return undefined;
        
    }


}
