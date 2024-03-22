import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";

/**
 * Alias for the PickupAction class
 */
export const PickupActionAlias: string = "pickup-action";

/**
 * Interface indicating that an object can be picked up 
 */
export interface Pickup {
    pickup(): ActionResult | undefined; // Method to handle the pickup action
}

/**
 * Class representing the Pickup action 
*/
export class PickupAction extends Action {
    public constructor() {
        super(PickupActionAlias, "Pickup", true); // Calling the constructor of the superclass
    }

    /**
     * Method that handles the Pickup action for a game object
     * @param gameObject The game object on which the action is performed
     * @returns An ActionResult for performing the Pickup action on the given game object
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        // Checking if the game object implements the Pickup interface
        if (implementsInterface(gameObject, PickupActionAlias)) {
            // Casting the game object to Pickup interface and calling the pickup method
            return castTo<Pickup>(gameObject).pickup();
        }

        // Returning undefined if the game object does not implement the Pickup interface
        return undefined;
    }
}