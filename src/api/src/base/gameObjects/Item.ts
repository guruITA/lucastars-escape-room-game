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

    public talk(_choiceId?: number): ActionResult | undefined {
        return undefined;
    }
}