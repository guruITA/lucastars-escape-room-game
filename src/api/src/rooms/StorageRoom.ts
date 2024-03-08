import { Action } from "../base/actions/Action";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
//import { ExampleRoom } from "./ExampleRoom";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";

export const StorageRoomAlias: string = "storage-room";

export class StorageRoom extends Room {
    public constructor() {
        super(StorageRoomAlias);
    }

    public name(): string {
        return "Storage Room";
    }

    public images(): string[] {
        return ["bg_storage_room"];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Dit is de opslagkamer"]);
    }
}
