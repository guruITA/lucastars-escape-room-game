import { ActionResult } from "../actionResults/ActionResult";

export class ImageActionResult extends ActionResult {
    private pictureUrl: string;

    public constructor(pictureUrl: string) {
        super();
        this.pictureUrl = pictureUrl;
    }

    public getResultMessage(): string {
        return "Picture displayed.";
    }

    public getPictureUrl(): string {
        return this.pictureUrl;
    }
}
