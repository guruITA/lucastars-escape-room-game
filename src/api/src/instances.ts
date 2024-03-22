import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { DetectiveCharacter, DetectiveCharacterAlias } from "./characters/Detective";
import { BluePrintItem, BluePrintItemAlias } from "./items/BluePrint";
import { Cam1Item, Cam1ItemAlias } from "./items/Cam1";
import { Cam2Item, Cam2ItemAlias } from "./items/Cam2";
import { Cam3Item, Cam3ItemAlias } from "./items/Cam3";
import { LockedCabinetItemAlias, LockedCabinetItem } from "./items/Locked_Cabinet";
import { StickyNoteItem, StickyNoteItemAlias } from "./items/StickyNote";
import { ControlRoom, ControlRoomAlias } from "./rooms/ControlRoom";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { PlayerSession } from "./types";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "startup",
        inventory: [],
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
    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

        case ControlRoomAlias:
            return new ControlRoom();
    }

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
    switch (alias) {

        case StickyNoteItemAlias:
            return new StickyNoteItem();

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

        case DetectiveCharacterAlias:
            return new DetectiveCharacter();

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
