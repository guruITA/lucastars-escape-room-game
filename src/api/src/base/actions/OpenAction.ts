import { castTo, implementsInterface } from "../helpers";
import { ActionResult } from "../actionResults/ActionResult";
import { GameObject } from "../gameObjects/GameObject";
import { Action } from "./Action";

/** Alias used to identity the Examine action and interface */
export const OpenActionAlias: string = "open";

/**
 * Interface for GamefObjects that need to support the Examine action
 */
export interface Open {
    /**
     * Execute the Examine action
     *
     * @returns Result of the Examine action
     */
    open(): ActionResult | undefined;
}

/**
 * Class used to represent the Examine action
 */
export class OpenAction extends Action {
    /**
     * Create a new instance of the Examine action
     */
    public constructor() {
        super(OpenActionAlias, "Open", true);
    }

    /**
     * Handle the Examine action
     *
     * @param gameObject Reference to the GameObject on which the Examine action should be executed
     *
     * @returns Result of the action
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, OpenActionAlias)) {
            return castTo<Open>(gameObject).open();
        }

        return undefined;
    }
}
