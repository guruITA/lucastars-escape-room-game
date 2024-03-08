import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";

export const PickUpActionAlias: string = "PickUp";

export interface PickUp {
    PickUp(): ActionResult | undefined;
}

export class PickUpAction extends Action {
    public constructor() {
        super(PickUpActionAlias, "PickUp", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, PickUpActionAlias)) {
            return castTo<PickUp>(gameObject).PickUp();
        }

        return undefined;
    }
}
