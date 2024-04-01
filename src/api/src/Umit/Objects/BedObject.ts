import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interact, InteractActionAlias } from "../actions/InteractAction";
import { Book4ItemAlias } from "../items/Book4";


export const BedObjectAlias: string = "bed";

export class BedObject extends Item implements Examine, Interact {

    public constructor() {
        super(BedObjectAlias, ExamineActionAlias, InteractActionAlias);
    }
    
    public name(): string {
        return "Bed";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Hmm it's the bed... It's been unused for ages and completely covered by dust. Maybe I can check under it?"]);
  }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpBook4 && playerSession.pickedUpFlashlight && playerSession.pickedUpBattery1 && !playerSession.pickedUpBattery2){
            playerSession.pickedUpBattery1 = true;
            return new TextActionResult(["*Click, click*","No dice.. It's still out of juice, maybe if I got a second battery somewhere around here..!"]);
        }
        if (!playerSession.pickedUpBook4 && playerSession.pickedUpFlashlight && playerSession.pickedUpBattery1 && playerSession.pickedUpBattery2){
            playerSession.inventory.push(Book4ItemAlias);
            playerSession.pickedUpBook4 = true;
            playerSession.pickedUpFlashlight = true;
            playerSession.pickedUpBattery1 = true;
            playerSession.pickedUpBattery2 = true;
            return new TextActionResult(["Now that the flashlight's charged let's see if I can look under here..","*Click*","..!! There is a book..! Inside of it is a code, but what does this mean..?"]);
        }
        else{
            return new TextActionResult(["Hmm.. It's too dark for me to see anything, maybe if I had something to light it up."]);
        }

        return undefined;
    }

}