import { ExampleAction } from "../actions/ExampleAction";
import { PickUpAction } from "../actions/PickUp";
import { ShowImageAction } from "../actions/ShowImage";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { ImageActionResult } from "../base/actionResults/ImageActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { DetectiveCharacter } from "../characters/Detective";
import { getGameObjectsFromInventory } from "../instances";
import { ExampleItem } from "../items/ExampleItem";
import { StickyNoteItem } from "../items/StickyNote";

export const ControlRoomAlias: string = "Control-room";

export class ControlRoom extends Room {
    public constructor() {
        super(ControlRoomAlias);
    }

    public name(): string {
        return "Control Room";
    }

    public images(): string[] {
        return ["Control_Room"];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new ExampleAction(), new PickUpAction(), new ShowImageAction];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new ExampleItem(), new DetectiveCharacter(), new StickyNoteItem()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Welcome to the Control Room, the heart of the castle."]);
    }

    public example(): ActionResult | undefined {
        return new TextActionResult(["This is an example action executed on a room."]);
    }
    public PickUp(): ActionResult | undefined {
        return new TextActionResult(["This is an example action executed on a room."]);
    }
    public Showimage(): ActionResult | undefined {
        return new ImageActionResult("Control_Room.png");
    }
}
