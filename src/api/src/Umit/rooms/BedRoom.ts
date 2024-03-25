import { InteractAction } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { JohnCharacter } from "../characters/JohnCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { FlashLightItemAlias, FlashlightItem } from "../items/Flashlight";
import { PlayerSession } from "../../types";

export const BedRoomAlias: string = "bedroom";

export class BedRoom extends Room {
    public constructor() {
        super(BedRoomAlias);
    }

    public name(): string {
        return "Bedroom";
    }

    public images(): string[] {
        return[
            "bedroom"
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if(!playerSession.inventory.includes(FlashLightItemAlias)){
            objects.push(new FlashlightItem());
        }
        
        objects.push(new JohnCharacter());
        // return[this, new FlashlightItem(), new JohnCharacter()];

        return objects;
    }   

    public actions(): Action[] {
        return[new ExamineAction(), new TalkAction(), new InteractAction(), new CustomAction("test-me","Inspect Room", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The bedroom, it looks like it hasn't been used in ages. There should still be important clues in here to help me reach my answer."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "test-me"){
            return new TextActionResult([".. The dust has filled the air and the wood's creaking with every footstep we make..", "Checking out the bed and closet might be a neat idea for starters."]);
        }

        return undefined;
    }

}