import { PickUpActionLibrary } from "../actions/PickupActionLibrary";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { CustomAction } from "../../base/actions/CustomAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { Action } from "../../base/actions/Action";
import { Examine, ExamineAction, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { DetectiveCharacterLibrary } from "../characters/DetectiveCharacterLibrary";
import { getPlayerSession } from "../../instances";
import { BookCase } from "../items/BookCase";
import { BookOne, BookOneAlias } from "../items/BookOne";
import { BookTwo, BookTwoAlias } from "../items/BookTwo";
import { BookThree, BookThreeAlias } from "../items/BookThree";
import { Lamp } from "../items/Lamp";
import { LockedCabinetLibrary } from "../items/LockedCabinetLibrary";
import { Book4ItemAlias, Book4Item } from "../../Umit/items/Book4";
import { PlayerSession } from "../../types";
import { MainRoom } from "../../Gurpreet_1/rooms/MainRoom";



/**
 * Exporting the alias for the LibraryRoom class
 */
export const LibraryRoomAlias: string = "library-room";



/** 
 * Class representing the Library room
 */
export class LibraryRoom extends Room implements Examine {

    /**
     * Constructor for LibraryRoom class
     */
    public constructor() {

        // Calling the constructor of the superclass (Room)
        super(LibraryRoomAlias, ExamineActionAlias);

    }


    /**
     * Returns the name of the room
     * @returns The name of the room
     */
    public name(): string {
        return "Library room📚";
    }


    /**
     * Returns an array of image names based on the status of the lamp
     * @returns An array of image names
     */
    public images(): string[] {

        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.isLampOn) {

            // If the lamp is on show the image with illuminated library
            return ["library_room_light"];

        } else {

            // If the lamp is not on show the image with a not illuminated library
            return ["library_room_dark"];

        }

    }


    /**
     * Returns an array of available actions in the room
     * @returns An array of Action objects
     */
    public actions(): Action[] {

        const playerSession: PlayerSession = getPlayerSession();
        const actions: Action[] = [];

        // Allows the player to examine the surroundings and talk to detective
        actions.push(new ExamineAction(), new TalkAction(), new CustomAction("exit-room", "Exit room↜", false));

        if (playerSession.showPickupAction) {
            // Allows the player to pick up items in the room
            actions.push(new PickUpActionLibrary());
        }

        return actions;
    }


    /**
     * Performs a custom action based on the provided alias.
     * 
     * @param alias The alias of the action to perform.
     * @returns An ActionResult if the action was executed successfully, otherwise undefined.
     */
    public custom(alias: string): ActionResult | undefined {

        // Initialize a variable to hold the room associated with the alias
        let room: Room | undefined;

        // Determine the action to perform based on the provided alias
        switch (alias) {

            case "exit-room":

                // If the alias is "exit-room", create a new MainRoom instance
                room = new MainRoom();
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


    /**
     * Checks if all books have been collected by the player
     * @returns A boolean indicating whether all books have been collected
     */
    public allBooksCollected(): boolean {

        // This retrieves the player session
        const playerSession: PlayerSession = getPlayerSession();

        // Check if all three books are present in the player's inventory
        return (
            playerSession.inventory.includes(BookOneAlias) &&
            playerSession.inventory.includes(BookTwoAlias) &&
            playerSession.inventory.includes(BookThreeAlias)
        );
        // playerSession.inventory.includes(Book4ItemAlias)
    }


    /**
     * Returns an array of game objects in the room
     * @returns An array of GameObject objects
     */
    public objects(): GameObject[] {

        const playerSession: PlayerSession = getPlayerSession(); // This retrieves the player session
        const objects: GameObject[] = [this]; // Initializing objects array with the room and inventory items
        const bookCase: BookCase = new BookCase(); // Creating a new BookCase object
        const lamp: Lamp = new Lamp(); // Creating a new Lamp object

        // Checking if the lamp is on
        if (playerSession.isLampOn === true) {

            // Checking if the bookcase has been examined
            if (playerSession.isBookCaseExamined === true) {

                // Checking if BookOne isn't in the player's inventory
                if (!playerSession.inventory.includes(BookOneAlias)) {

                    // Adding BookOne to the objects array if it isn't in the inventory
                    objects.push(new BookOne);

                }

                // Checking if BookTwo isn't in the player's inventory
                if (!playerSession.inventory.includes(BookTwoAlias)) {

                    // Adding BookTwo to the objects array if it isn't in the inventory
                    objects.push(new BookTwo);

                }

                // Checking if BookThree isn't in the player's inventory
                if (!playerSession.inventory.includes(BookThreeAlias)) {

                    // Adding BookThree to the objects array if it isn't in the inventory
                    objects.push(new BookThree);

                }

                // Checking if all books have been collected
                if (this.allBooksCollected()) {

                    // Adding LockedCabinetItem to the objects array
                    objects.push(new LockedCabinetLibrary);

                }


            }

            // Adding the Lamp Item, Detective Character and Bookcase to the object array when the bookcase isn't examined
            objects.push(bookCase, lamp, new DetectiveCharacterLibrary());

        } else {

            // Adding the Lamp Item and Detective Character to the object array when the lamp is off
            objects.push(lamp, new DetectiveCharacterLibrary());

        }

        // Check if the player session inventory includes BookOneAlias
        if (playerSession.inventory.includes(BookOneAlias)) {
            // If BookOneAlias is found, create a new instance of BookOne and push it into the objects array
            objects.push(new BookOne());
        }

        // Check if the player session inventory includes BookTwoAlias
        if (playerSession.inventory.includes(BookTwoAlias)) {
            // If BookTwoAlias is found, create a new instance of BookTwo and push it into the objects array
            objects.push(new BookTwo());
        }

        // Check if the player session inventory includes BookThreeAlias
        if (playerSession.inventory.includes(BookThreeAlias)) {
            // If BookThreeAlias is found, create a new instance of BookThree and push it into the objects array
            objects.push(new BookThree());
        }

        // Check if the player session inventory includes Book4ItemAlias
        if (playerSession.inventory.includes(Book4ItemAlias)) {
            // If Book4ItemAlias is found, create a new instance of Book4Item and push it into the objects array
            objects.push(new Book4Item());
        }

        // Returning the final array of game objects
        return objects;

    }


    /**
     * Provides a description of the current room and initiates dialogue with the assistant.
     * 
     * @returns An `ActionResult` representing the description and dialogue, or `undefined` if the room cannot be examined.
     */
    public examine(): ActionResult | undefined {

        // Retrieve the player session
        const playerSession: PlayerSession = getPlayerSession();

        // Check if the room is dark
        if (!playerSession.isLampOn) {

            // If the room is dark, describe the dark room and initiate dialogue
            return new TextActionResult([
                "[Will]: Owh, this room is dark. It's hard to see anything in here.",
                "[John]: Maybe we should find a lamp to shed some light on the situation.",
                "[Will]: Agreed. Let's search around for any source of light. Perhaps there's a lamp or a switch nearby.",
                "[John]: Keep an eye out for any clues while we're at it. The darkness might be hiding something important.",
                "[Will]: Will do, Detective. I'll be sure to inspect every nook and cranny.",
                "As you search for a light source, you stumble upon the lamp on the desk. Upon closer inspection, you notice something unusual about it. There's an engraved code on it: '1234' with an icon of a camera.",
                "[Will]: Detective, I think I've found something on the lamp. It's a code: '1234' with a camera icon."
            ]);
            
        } else {

            // If the room is not dark, describe the room and initiate dialogue
            return new TextActionResult([
                "[Will]: This library is so big, with rows of towering bookshelves.",
                "[Will]: The air is thick with the smell of old paper, and shadows dance in the corners.",
                "[Will]: There's a desk in the center of the room, there is too much to explore. Where should I begin to search? Hmm, let's begin!",
                "[John]: Start by checking the bookshelves. We often find valuable clues hidden among the books.",
                "[Will]: Understood, Detective. I'll start there and then move on to the desk.",
                "[John]: Remember to be thorough. We can't afford to miss anything."
            ]);

        }
    }


}
