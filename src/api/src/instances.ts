import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { DetectiveCharacterControlRoom, DetectiveCharacterControlRoomAlias } from "./kamal/characters/DetectiveCharacterControlRoom";
import { BluePrintItem, BluePrintItemAlias } from "./kamal/items/BluePrint";
import { Cam1Item, Cam1ItemAlias } from "./kamal/items/Cam1";
import { Cam2Item, Cam2ItemAlias } from "./kamal/items/Cam2";
import { Cam3Item, Cam3ItemAlias } from "./kamal/items/Cam3";
import { BookCase, BookCaseAlias } from "./Gurpreet/items/BookCase";
import { BookOneAlias, BookOne } from "./Gurpreet/items/BookOne";
import { BookThree, BookThreeAlias } from "./Gurpreet/items/BookThree";
import { BookTwo, BookTwoAlias } from "./Gurpreet/items/BookTwo";
import { Lamp, LampAlias } from "./Gurpreet/items/Lamp";
import { LockedCabinetItemAlias, LockedCabinetItem } from "./kamal/items/Locked_Cabinet";
import { StickyNoteItem, StickyNoteItemAlias } from "./kamal/items/StickyNote";
import { ControlRoom, ControlRoomAlias } from "./kamal/rooms/ControlRoom";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { PlayerSession } from "./types";
import { LibraryRoom, LibraryRoomAlias } from "./Gurpreet/rooms/LibraryRoom";
import { DetectiveCharacterLibrary, DetectiveCharacterLibraryAlias } from "./Gurpreet/characters/DetectiveCharacterLibrary";
import { LockedCabinetLibrary, LockedCabinetLibraryAlias } from "./Gurpreet/items/LockedCabinetLibrary";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "startup",
        inventory: [],
        pickedUpBookOne: false,
        pickedUpBookTwo: false,
        pickedUpBookThree: false,
        pickedUpAllBooks: false,
        isBookCaseExamined: false,
        isLampOn: false,
        showPickupAction: false,
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

        //
        case LibraryRoomAlias:
            return new LibraryRoom();

        case ControlRoomAlias:
            return new ControlRoom();
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

        case StickyNoteItemAlias:
            return new StickyNoteItem();

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

        case LockedCabinetItemAlias:
            return new LockedCabinetItem();

        case BluePrintItemAlias:
            return new BluePrintItem();

        case Cam1ItemAlias:
            return new Cam1Item();

        case Cam2ItemAlias:
            return new Cam2Item();

        case Cam3ItemAlias:
            return new Cam3Item();

        case LockedCabinetItemAlias:
            return new LockedCabinetItem();

        case LockedCabinetLibraryAlias:
            return new LockedCabinetLibrary();

        case DetectiveCharacterLibraryAlias:
            return new DetectiveCharacterLibrary();

        case DetectiveCharacterControlRoomAlias:
            return new DetectiveCharacterControlRoom();

        //NOTE: Fall back to rooms, since tho8se are game objects too.
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
