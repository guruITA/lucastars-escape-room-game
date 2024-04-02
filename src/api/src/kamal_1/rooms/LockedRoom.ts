import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession } from "../../instances";
import { CustomAction } from "../../base/actions/CustomAction";
import { LockedRoomItem } from "../rooms/lockedRoom1";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { MainRoom } from "../../Gurpreet_1/rooms/MainRoom";
import { PlayerSession } from "../../types";
// import { LockedRoomCode } from "../../routes";

export const LockedRoomAlias: string = "LockedRoom";

export class LockedRoom extends Room {
    public constructor() {
        super(LockedRoomAlias);
    }

    public name(): string {
        return "LockedRoom";
    }

    public images(): string[] {
        return ["LockedRoom"];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession(); // This retrieves the player session
        const actions: Action[] = [];
        
            if (playerSession.isControlRoomCabinetExamined === true && playerSession.isLibraryCabinetExamined === true && playerSession.isBedRoomChestExamined === true) {
                actions.push(new ExamineAction());
            }
            // if (playerSession.LockedRoomCode === true){

            // }
            actions.push(new CustomAction("exit-room", "Exit room↜", false));
            return actions;
    }

    public objects(): GameObject[] {

        const playerSession: PlayerSession = getPlayerSession(); // This retrieves the player session
        const objects: GameObject[] = []; // Initializing objects array with the room and inventory items

        if (playerSession.isControlRoomCabinetExamined === true && playerSession.isLibraryCabinetExamined === true && playerSession.isBedRoomChestExamined === true){

            // Adding BookOne to the objects array if it isn't in the inventory
            objects.push(new LockedRoomItem);

        }
        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["As you stand before the locked room, you realize that gaining access requires a combination of codes collected from various locked cabinets scattered throughout the castle.",
            " Each cabinet holds a piece of the puzzle, represented by a unique four-digit code.",
            " To unlock the door and reveal the secrets hidden within the room, you must gather all the codes.",
            " Once you've gathered all the necessary codes, you can input them in sequence to unlock the door"]);
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

}
