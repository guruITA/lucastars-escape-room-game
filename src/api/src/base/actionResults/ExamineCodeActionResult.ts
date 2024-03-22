import { TextActionResult } from "./TextActionResult";

/**
 * Class used to represent the result of an Examine action
 */
export class ExamineCodeActionResult extends TextActionResult {

    private _images: string[];

    /**
     * Create a new instance of this action result
     *
     * @param text Text to show
     */
    public constructor(text: string[], images: string[]) {
        super(text);

        this._images = images;

    }


    /**
    * Paths to images to display
    */
    public get images(): string[] {
        return this._images;
    }
}