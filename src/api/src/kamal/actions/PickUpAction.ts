// Import necessary modules and types
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

// Define alias for PickUp action
export const PickUpActionAlias: string = "PickUp";

// Interface for PickUp action
export interface PickUp {
    PickUp(): ActionResult | undefined;
}

// Class representing PickUp action
export class PickUpAction extends Action {
    public constructor() {
        super(PickUpActionAlias, "PickUp", true);
    }

    // Static method to handle PickUp action on a GameObject
    public static handle(gameObject: GameObject): ActionResult | undefined {
        // Check if the GameObject implements PickUp interface
        if (implementsInterface(gameObject, PickUpActionAlias)) {
            // If it does, call the PickUp method
            return castTo<PickUp>(gameObject).PickUp();
        }

        return undefined;
    }
}
