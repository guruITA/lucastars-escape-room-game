// This import is for the PickupAction class.
import { PickUpActionLibrary } from "../actions/PickupActionLibrary";

// This section imports necessary classes for handling different types of action results.
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";

// This import is for the base class representing actions.
import { Action } from "../../base/actions/Action";

// These imports are for defining interfaces and aliases related to examining actions.
import { Examine, ExamineAction, ExamineActionAlias } from "../../base/actions/ExamineAction";

// This import is for the TalkAction class.
import { TalkAction } from "../../base/actions/TalkAction";

// This import is for the base class representing game objects.
import { GameObject } from "../../base/gameObjects/GameObject";

// This import is for the base class representing rooms.
import { Room } from "../../base/gameObjects/Room";

// This import is for the DetectiveCharacter class.
import { DetectiveCharacterLibrary } from "../characters/DetectiveCharacterLibrary";

// These imports are for getting player session data and game objects from inventory.
import { getPlayerSession } from "../../instances";

// This import is for the BookCase class.
import { BookCase } from "../items/BookCase";

// These imports are for specific book items.
import { BookOne, BookOneAlias } from "../items/BookOne";
import { BookTwo, BookTwoAlias } from "../items/BookTwo";
import { BookThree, BookThreeAlias } from "../items/BookThree";
import { Lamp } from "../items/Lamp";
import { LockedCabinetLibrary } from "../items/LockedCabinetLibrary";

// This import is for the PlayerSession type.
import { PlayerSession } from "../../types";
import { CustomAction } from "../../base/actions/CustomAction";
import { MainRoom } from "../../Gurpreet_1/rooms/MainRoom";
import { Book4ItemAlias, Book4Item } from "../../Umit/items/Book4";



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

    public custom(alias: string): ActionResult | undefined {
        let room: Room | undefined;

        switch (alias) {
            case "exit-room":
                room = new MainRoom();
                break;

            default:
                return undefined;
        }

        if (room) {
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }

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
        
        if (playerSession.inventory.includes(BookOneAlias)){
            objects.push(new BookOne());
        }
        if (playerSession.inventory.includes(BookTwoAlias)){
            objects.push(new BookTwo());
        }
        if (playerSession.inventory.includes(BookThreeAlias)){
            objects.push(new BookThree());
        }
        if (playerSession.inventory.includes(Book4ItemAlias)){
            objects.push(new Book4Item());
        }
        
        

        // Returning the final array of game objects
        return objects;

    }


    public examine(): ActionResult | undefined {

        const playerSession: PlayerSession = getPlayerSession();

        // Controleer of de kamer donker is
        if (!playerSession.isLampOn) {

            // Geef een beschrijving van de donkere kamer en laat de assistent spreken
            return new TextActionResult([
                "[Assistant]: Owh, this room is dark. It's hard to see anything in here.",
                "[Detective]: Maybe we should find a lamp to shed some light on the situation.",
                "[Assistant]: Agreed. Let's search around for any source of light. Perhaps there's a lamp or a switch nearby.",
                "[Detective]: Keep an eye out for any clues while we're at it. The darkness might be hiding something important.",
                "[Assistant]: Will do, Detective. I'll be sure to inspect every nook and cranny.",
                "As you search for a light source, you stumble upon the lamp on the desk. Upon closer inspection, you notice something unusual about it. There's an engraved code on it: '1234' with an icon of a camera.",
                "[Assistant]: Detective, I think I've found something on the lamp. It's a code: '1234' with a camera icon."
            ]);
            
        } else {

            // Geef een beschrijving van de kamer als het niet donker is en laat de assistent spreken
            return new TextActionResult([
                "[Assistant]: This library is so big, with rows of towering bookshelves.",
                "[Assistant]: The air is thick with the smell of old paper, and shadows dance in the corners.",
                "[Assistant]: There's a desk in the center of the room, there is too much to explore. Where should I begin to search? Hmm, let's begin!",
                "[Detective]: Start by checking the bookshelves. We often find valuable clues hidden among the books.",
                "[Assistant]: Understood, Detective. I'll start there and then move on to the desk.",
                "[Detective]: Remember to be thorough. We can't afford to miss anything."
            ]);

        }

    }
    
}
