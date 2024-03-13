import { ActionResult } from "../actionResults/ActionResult";
import { Talk, TalkActionAlias } from "../actions/TalkAction";
import { GameObject } from "./GameObject";

/**
 * Base class used to represent an item
 */
export abstract class Item extends GameObject implements Talk {

    /**
     * Create a new instance of this character
     *
     * @param alias Alias of this character
     * @param interfaces List of interfaces this character implements
     */
    protected constructor(alias: string, ...interfaces: string[]) {
        super(alias, ...interfaces, TalkActionAlias);
    }


    /**
     * Handles the talk action on the item
     * @param _choiceId The choice ID representing the player's selection
     * @returns An action result for talking to the item
     */
    public talk(_choiceId?: number): ActionResult | undefined {

        // By default items do not respond to talk actions so return undefined
        return undefined;

    }
}