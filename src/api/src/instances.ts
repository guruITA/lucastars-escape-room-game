import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
<<<<<<< HEAD
import { DetectiveCharacter, DetectiveCharacterAlias } from "./characters/DetectiveCharacter";
import { BookCase, BookCaseAlias } from "./items/BookCase";
import { BookOneAlias, BookOne } from "./items/BookOne";
import { BookThree, BookThreeAlias } from "./items/BookThree";
import { BookTwo, BookTwoAlias } from "./items/BookTwo";
import { Lamp, LampAlias } from "./items/Lamp";
import { LockedCabinetItem, LockedCabinetItemAlias } from "./items/LockedCabinet";
import { LibraryRoom, LibraryRoomAlias } from "./rooms/LibraryRoom";
=======
import { ExampleCharacter, ExampleCharacterAlias } from "./characters/ExampleCharacter";
import { ExampleItem, ExampleItemAlias } from "./items/ExampleItem";
import { FlashLightItemAlias, FlashlightItem } from "./items/Items/Flashlight";
import { BedRoom, BedRoomAlias } from "./rooms/BedRoom";
import { ExampleRoom, ExampleRoomAlias } from "./rooms/ExampleRoom";
>>>>>>> Umit/Bedroom
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { PlayerSession } from "./types";
import { JohnCharacter, JohnCharacterAlias } from "./characters/JohnCharacter";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "startup",
        inventory: [],
<<<<<<< HEAD
        pickedUpBookOne: false,
        pickedUpBookTwo: false,
        pickedUpBookThree: false,
        pickedUpAllBooks: false,
        isBookCaseExamined: false,
        isLampOn: false,
        showPickupAction: false,
=======
        pickedUpFlashlight: false, 
>>>>>>> Umit/Bedroom
    };
}

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionFromContext<PlayerSession>();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    resetPlayerSessionInContext(createNewPlayerSession);
}

/**
 * Get the instance of a room by its alias
 *
 * @param alias Alias of the room
 *
 * @returns Instance of the room
 */
export function getRoomByAlias(alias: string): Room | undefined {

    // Check the provided alias and return the corresponding room object
    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

<<<<<<< HEAD
        //
        case LibraryRoomAlias:
            return new LibraryRoom();
=======
        case ExampleRoomAlias:
            return new ExampleRoom();

        case BedRoomAlias:
            return new BedRoom();
>>>>>>> Umit/Bedroom
    }

    // If no matching room is found, return undefined
    return undefined;
}

/**
 * Get the instance of a game object by its alias
 *
 * @param alias Alias of the game object
 *
 * @returns Instance of the game object
 */
export function getGameObjectByAlias(alias: string): GameObject | undefined {

    // Check the provided alias and return the corresponding game object
    switch (alias) {

        case LampAlias:
            return new Lamp();

        case BookOneAlias:
            return new BookOne();

        case BookTwoAlias:
            return new BookTwo();

        case BookThreeAlias:
            return new BookThree();

        case BookCaseAlias:
            return new BookCase();

        case DetectiveCharacterAlias:
            return new DetectiveCharacter();

        case LockedCabinetItemAlias:
            return new LockedCabinetItem();

        case FlashLightItemAlias:
            return new FlashlightItem();

        case JohnCharacterAlias:
            return new JohnCharacter();

        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}

/**
 * Get a list of game objects instances by their alias
 *
 * @param alias List of game object aliases
 *
 * @returns List of game object instances
 */
export function getGameObjectsByAliases(objectAliases?: string[]): GameObject[] {
    return objectAliases?.map((e) => getGameObjectByAlias(e)!).filter((e) => e) || [];
}

/**
 * Get a list of game object instances based on the inventory of the current player session
 *
 * @returns List of game object instances
 */
export function getGameObjectsFromInventory(): GameObject[] {
    return getGameObjectsByAliases(getPlayerSession().inventory);
}
