import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../../base/helpers";

export const InspectActionAlias:string = "inspect";

export interface Interact {
    interact(): ActionResult | undefined;
}

export class InteractAction extends Action {
    public constructor(){
        super(InspectActionAlias, "Inspect", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, InspectActionAlias)) {
            return castTo<Interact>(gameObject).interact();
        }

        return undefined;
    }
}