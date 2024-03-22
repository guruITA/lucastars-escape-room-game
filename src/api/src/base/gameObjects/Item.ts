import { ActionResult } from "../actionResults/ActionResult";
import { Talk, TalkActionAlias } from "../actions/TalkAction";
import { GameObject } from "./GameObject";

/**
 * Base class used to represent an item
 */
export abstract class Item extends GameObject implements Talk {
    /**
     * Create a new instance of this item
     * @param alias Alias of this item
     * @param interfaces List of interfaces this item implements
     */
    protected constructor(alias: string, ...interfaces: string[]) {
        super(alias, ...interfaces, TalkActionAlias);
    }

    // Implement the talk method from the Talk interface
    public talk(choiceId?: number): ActionResult | undefined {
        // Use choiceId if necessary
        console.log(choiceId);
        return undefined;
    }
}
