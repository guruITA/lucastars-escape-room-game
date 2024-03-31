
import { MainRoom } from "../Gurpreet_1/rooms/MainRoom";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";

export const StartupRoomAlias: string = "startup";

export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "City of Shadows: McCarthy's Confrontation";
    }

    public images(): string[] {
        return ["castle"];
    }

    public actions(): Action[] {
        return [new CustomAction("start-game", "Start Game", false)];
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Welcome to 'City of Shadows: McCarthy's Confrontation'!",
            "You, William McCarthy, are the dedicated assistant to Detective John Manny, embarking on a thrilling adventure in the wintry New York of 1932. Your mission? Unravel the mystery of a relentless serial killer terrorizing the city. In each room, you must uncover a digit crucial to accessing the secret chamber where justice awaits. With Detective Manny by your side, can you crack the code and reveal the truth?"
        ]);
    }
    
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "start-game") {
            
            const room: Room = new MainRoom();
            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
