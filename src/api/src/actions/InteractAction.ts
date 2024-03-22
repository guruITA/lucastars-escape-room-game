import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";

export const InteractActionAlias:string = "interact";

export interface Interact {
    interact(): ActionResult | undefined;
}

export class InteractAction extends Action {
    public constructor(){
        super(InteractActionAlias, "Interact", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, InteractActionAlias)) {
            return castTo<Interact>(gameObject).interact();
        }

        return undefined;
    }
}