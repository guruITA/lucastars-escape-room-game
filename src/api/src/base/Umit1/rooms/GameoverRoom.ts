import { getPlayerSession } from "../../../instances";
import { StartupRoom } from "../../../rooms/StartupRoom";
import { ActionResult } from "../../actionResults/ActionResult";
import { TextActionResult } from "../../actionResults/TextActionResult";
import { Action } from "../../actions/Action";
import { CustomAction, CustomActionAlias } from "../../actions/CustomAction";
import { ExamineActionAlias } from "../../actions/ExamineAction";
import { Room } from "../../gameObjects/Room";



export const GameoverRoomAlias: string = "gameover";

export class GameoverRoom extends Room {

    public constructor() {
        super(GameoverRoomAlias, ExamineActionAlias, CustomActionAlias, );
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Game Over, you've lost the game. Do you wish to retry?"
        ]);
    }
    public name(): string {
        return "Game Over";
    }

    public images(): string[] {
        return[
            "gameover"
        ];
    }

    public actions(): Action[] {
        return [new CustomAction("start-game", "Retry", false)]; 
    }

    public custom(alias: string): ActionResult | undefined {
        let room: Room | undefined;

        switch (alias) {
            case "start-game":
                room = new StartupRoom();
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