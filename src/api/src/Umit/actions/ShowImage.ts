import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../../base/helpers";


export const ShowImageActionAlias: string = "ShowImage";

export interface ShowImage {
    ShowImage(): ActionResult | undefined;
}

export class ShowImageAction extends Action {
    public constructor() {
        super(ShowImageActionAlias, "ShowImage", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, ShowImageActionAlias)) {
            return castTo<ShowImage>(gameObject).ShowImage();
        }

        return undefined;
    }
}