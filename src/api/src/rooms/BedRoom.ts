import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { JohnCharacter } from "../characters/JohnCharacter";
import { FlashlightItem } from "../items/Flashlight";

export const BedRoomAlias: string = "bedroom";

export class BedRoom extends Room {
    public constructor() {
        super(BedRoomAlias);
    }

    public name(): string {
        return "Bed";
    }

    public images(): string[] {
        return[
            "bedroom"
        ];
    }

    public objects(): GameObject[] {
        return[this, new FlashlightItem(), new JohnCharacter()];
    }   

    public actions(): Action[] {
        return[new ExamineAction(), new TalkAction(), new PickupAction(), new CustomAction("test-me","Inspect Room", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a bedroom, it looks like it hasn't been used in ages."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "test-me"){
            return new TextActionResult([".. The dust has filled the air and the wood's creaking with every footstep we make..", "Checking out the bed and closet might be a neat idea for starters."]);
        }

        return undefined;
    }

}