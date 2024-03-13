import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { DetectiveCharacter } from "../characters/DetectiveCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { BookCase, examined } from "../items/BookCase";
import { BookOne, BookOneAlias } from "../items/BookOne";
import { BookThree, BookThreeAlias } from "../items/BookThree";
import { BookTwo, BookTwoAlias } from "../items/BookTwo";
import { Lamp, lampOn } from "../items/Lamp";
import { LockedCabinetItem } from "../items/LockedCabinet";
import { PlayerSession } from "../types";

// Exporting the alias for the LibraryRoom class
export const LibraryRoomAlias: string = "library-room";

// Defining the LibraryRoom class, extending from the Room class
export class LibraryRoom extends Room {

    /**
     * Constructor for LibraryRoom class
     */
    public constructor() {

        // Calling the constructor of the superclass (Room)
        super(LibraryRoomAlias);

    }


    /**
     * Returns the name of the room
     * @returns The name of the room
     */
    public name(): string {
        return "Library room";
    }


    /**
     * Returns an array of image names based on the status of the lamp
     * @returns An array of image names
     */
    public images(): string[] {

        if (lampOn) {

            // If the lamp is on show the image with illuminated library
            return ["library_room"];

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

        return [

            // Allows the player to examine the surroundings
            new ExamineAction(),

            // Allows the player to engage in conversation
            new TalkAction(),

            // Allows the player to pick up items in the room
            new PickupAction()

        ];

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

    }


    /**
     * Returns an array of game objects in the room
     * @returns An array of GameObject objects
     */
    public objects(): GameObject[] {

        const playerSession: PlayerSession = getPlayerSession(); // This retrieves the player session
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()]; // Initializing objects array with the room and inventory items
        const bookCase: BookCase = new BookCase(); // Creating a new BookCase object
        const lamp: Lamp = new Lamp(); // Creating a new Lamp object

        // Checking if the lamp is on
        if (lampOn === true) {

            // Checking if the bookcase has been examined
            if (examined === true) {

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
                    objects.push(new LockedCabinetItem);

                }

            }

            // Adding the Lamp Item, Detective Character and Bookcase to the object array when the bookcase isn't examined
            objects.push(bookCase, lamp, new DetectiveCharacter());

        } else {

            // Adding the Lamp Item and Detective Character to the object array when the lamp is off
            objects.push(lamp, new DetectiveCharacter());

        }

        // Returning the final array of game objects
        return objects;

    }


    /**
     * Examines the room and returns an ActionResult
     * @returns An ActionResult representing the examination result
     */
    public examine(): ActionResult | undefined {

        // If all books are collected a text shows up that tells you you have found the hidden cabinet.
        if (this.allBooksCollected()) {

            return new TextActionResult(["Owh there is a hidden cabinet"]);

        } else {

            // If all books are not collected it describes the room's atmosphere and suggest exploration.
            return new TextActionResult([
                "Owh! This library is so big, with rows of towering bookshelves. The air is thick with the smell of old paper, and shadows dance in the corners. There's a desk in the center of the room, there is too much to explore. Where should I begin to search? hmmmmm lets begin!"
            ]);

        }

    }
}
