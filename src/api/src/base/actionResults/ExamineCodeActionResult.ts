import { TextActionResult } from "./TextActionResult";
 
/**
 * Class used to represent the result of an Examine action
 */
export class ExamineCodeActionResult extends TextActionResult {
 
    /**
     * Create a new instance of this action result
     *
     * @param text Text to show
     */
    public constructor(text: string[]) {
        super(text);
 
    }
}