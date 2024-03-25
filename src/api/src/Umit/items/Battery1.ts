// import { Pickup, PickupActionAlias } from "../../actions/InteractAction";
// import { ActionResult } from "../../base/actionResults/ActionResult";
// import { TextActionResult } from "../../base/actionResults/TextActionResult";
// import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
// import { Item } from "../../base/gameObjects/Item";
// import { getPlayerSession } from "../../instances";
// import { PlayerSession } from "../../types";

// export const Battery1ItemAlias: string = "battery1";

// export class Battery1Item extends Item implements Examine, Pickup {

//     public constructor() {
//         super(Battery1ItemAlias, ExamineActionAlias, PickupActionAlias);
//     }

//     public name(): string {
//         return "battery1";
//     }

//     public examine(): ActionResult | undefined {
//         return new TextActionResult([".. A battery? This might just be what I need."])
//     }

//     public pickup(): ActionResult | undefined {
//         const playerSession: PlayerSession = getPlayerSession();

//         if(!playerSession.pickedUpBattery1){
//             playerSession.pickedupBattery1 = true;
//             playerSession.inventory.push(Battery1ItemAlias);

//             return new TextActionResult(["*I grabbed the battery, it might be of us to me later."]);
//         }

//         return undefined;
//     }
// }