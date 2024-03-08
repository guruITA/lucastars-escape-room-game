import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
// import { resetPlayerSession } from "../instances";

export const BookCaseAlias: string = "book-case";

export let examined: boolean = false;

export class BookCase extends Item implements Examine {
    public constructor() {
        super(BookCaseAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Book case";
    }

    public examine(): ActionResult | undefined  {
        if (examined) {
            return new TextActionResult(["You already found the books on the shelf."]);
        } else {
            examined = true;
            return new TextActionResult(["You examine the bookcase and notice several books on the shelves."]);
        }
    }
}
