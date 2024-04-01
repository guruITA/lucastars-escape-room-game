import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { DetectiveCharacterControlRoom, DetectiveCharacterControlRoomAlias } from "./kamal/characters/DetectiveCharacterControlRoom";
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
import { MainRoom, MainRoomAlias } from "./Gurpreet_1/rooms/MainRoom";
import { LockedRoom, LockedRoomAlias } from "./kamal_1/rooms/LockedRoom";
import { LockedRoomItem, LockedRoomItemAlias } from "./kamal_1/rooms/lockedRoom1";
import { JohnCharacter, JohnCharacterAlias } from "./Umit/characters/JohnCharacterBed";
import { FlashLightItemAlias, FlashlightItem } from "./Umit/items/Flashlight";
import { BedRoom, BedRoomAlias } from "./Umit/rooms/BedRoom";
import { Book4Item, Book4ItemAlias } from "./Umit/items/Book4";
import { BedObject, BedObjectAlias } from "./Umit/Objects/BedObject";
import { ChestObject, ChestObjectAlias } from "./Umit/Objects/ChestObject";
import { Battery1Item, Battery1ItemAlias } from "./Umit/items/Battery1";
import { Battery2Item, Battery2ItemAlias } from "./Umit/items/Battery2";
import { ClockObject, ClockObjectAlias } from "./Umit/Objects/ClockObject";
import { PaintingObject, PaintingObjectAlias } from "./Umit/Objects/PaintingObject";
import { JohnMainCharacter, JohnMainCharacterAlias } from "./Umit/characters/JohnCharacterMain";


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
        pickedUpFlashlight: false,
        pickedUpBook4: false,
        pickedUpBattery1: false,
        pickedUpBattery2: false,
        mainroomAdvice: false,
        mainroomDialogue1: false,
        mainroomDialogue2: false,
        mainroomDialogue3: false,
        mainroomDialogue4: false,
        mainroomDialogue5: false,
        exitDialogue: false,
        isControlRoomCabinetExamined: false,
        isLibraryCabinetExamined: false,
        isBedRoomChestExamined: false,
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

        case MainRoomAlias:
            return new MainRoom();

        case LockedRoomAlias:
            return new LockedRoom();

        case BedRoomAlias:
            return new BedRoom();
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

        case Book4ItemAlias:   
            return new Book4Item();

        case BookCaseAlias:
            return new BookCase();

        case LockedCabinetItemAlias:
            return new LockedCabinetItem();

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

        case JohnCharacterAlias:
            return new JohnCharacter();

        case JohnMainCharacterAlias:
            return new JohnMainCharacter();

        case FlashLightItemAlias:
            return new FlashlightItem();

        case LockedRoomItemAlias:
            return new LockedRoomItem();

        case ChestObjectAlias:
            return new ChestObject();
        
        case ClockObjectAlias:
            return new ClockObject();
            
        case Battery1ItemAlias:
            return new Battery1Item();
        
        case Battery2ItemAlias:
            return new Battery2Item();

        case BedObjectAlias:
            return new BedObject();
        
        case PaintingObjectAlias:
            return new PaintingObject();

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
