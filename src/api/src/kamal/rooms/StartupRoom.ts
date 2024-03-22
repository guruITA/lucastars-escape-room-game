import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession } from "../../instances";
<<<<<<<< HEAD:src/api/src/kamal/rooms/StartupRoom.ts
import { ControlRoom } from "./ControlRoom";
========
import { LibraryRoom } from "./LibraryRoom";
>>>>>>>> Gurpreet/Library:src/api/src/Gurpreet/rooms/StartupRoom.ts

export const StartupRoomAlias: string = "startup";

export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "Example game";
    }

    public images(): string[] {
        return ["startup"];
    }

    public actions(): Action[] {
        return [new CustomAction("start-game", "Start Game", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "start-game") {
<<<<<<<< HEAD:src/api/src/kamal/rooms/StartupRoom.ts
            const room: ControlRoom = new ControlRoom();
========
            const room: LibraryRoom = new LibraryRoom();
>>>>>>>> Gurpreet/Library:src/api/src/Gurpreet/rooms/StartupRoom.ts

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
