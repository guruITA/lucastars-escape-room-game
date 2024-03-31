import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { LibraryRoom } from "../../Gurpreet/rooms/LibraryRoom";
import { CustomAction } from "../../base/actions/CustomAction";
import { ControlRoom } from "../../kamal/rooms/ControlRoom";
import { LockedRoom } from "../../kamal_1/rooms/LockedRoom";
import { BedRoom } from "../../Umit/rooms/BedRoom";
import { TalkAction } from "../../base/actions/TalkAction";
import { JohnMainCharacter } from "../../Umit/characters/JohnCharacterMain";

export const MainRoomAlias: string = "main-room";

export class MainRoom extends Room {
    public constructor() {
        super(MainRoomAlias);
    }

    public name(): string {
        return "Main room🏛️";
    }

    public images(): string[] {
        return ["MainHall_Room"];
    }

    public actions(): Action[] {
        return [
            new CustomAction("library-room", "Library↜", false),
            new CustomAction("control-room", "Control Room↜", false),
            new CustomAction("LockedRoom", "LockedRoom↜", false),
            new CustomAction("Bedroom", "Bedroom↜", false),
            new TalkAction()
        ];

    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new JohnMainCharacter()];
    }


    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "[John]: Seems we've entered the main hall, Will. Our investigation begins here.",
            "[Will]: About time, let's hope that anonymous tip didn't lead us to another red herring... It's chilling to think what secrets these walls might hold.",
            "[John]: Indeed. We must be thorough in our search. Let us begin.",
            "[Will]: Sounds good, I'll try my best, where do I even begin?",
            "[John]: Before you start have you already mastered the basics?",
            "[Will]: I believe I have..?",
            "[John]: Mmm, I'll take your word for it, but if you're confused with certain actions feel free to use [ TALK ] for a refresh course.",
            "[Will]: Thanks John, appreciate it."
        ]);
    }

    public custom(alias: string): ActionResult | undefined {
        let room: Room | undefined;

        switch (alias) {
            case "library-room":
                room = new LibraryRoom();
                break;
            case "control-room":
                room = new ControlRoom();
                break;
            case "LockedRoom":
                room = new LockedRoom();
                break;
            case "Bedroom":
                room = new BedRoom();
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
