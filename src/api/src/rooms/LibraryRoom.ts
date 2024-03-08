import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { DetectiveCharacter } from "../characters/DetectiveCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { BookCase, examined } from "../items/BookCase";
import { BookOne, BookOneAlias } from "../items/BookOne";
import { BookThree, BookThreeAlias } from "../items/BookThree";
import { BookTwo, BookTwoAlias } from "../items/BookTwo";
import { Lamp, lampOn } from "../items/Lamp";
import { PlayerSession } from "../types";


export const LibraryRoomAlias: string = "library-room";


export class LibraryRoom extends Room {

    public constructor() {

        super(LibraryRoomAlias);

    }


    public name(): string {

        return "Library room";

    }


    public images(): string[] {

        if (lampOn) {

            return ["library_room"];

        } else {

            return ["library_room_dark"];

        }

    }


    public actions(): Action[] {

        return [
            new ExamineAction(),
            new TalkAction(),
            new PickupAction()
        ];

    }


    public objects(): GameObject[] {

        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];
        const bookCase: BookCase = new BookCase();
        const lamp: Lamp = new Lamp();


        if (lampOn === true) {

            if (examined === true) {

                if (!playerSession.inventory.includes(BookOneAlias)) {

                    objects.push(new BookOne);

                }

                if (!playerSession.inventory.includes(BookTwoAlias)) {

                    objects.push(new BookTwo);

                }

                if (!playerSession.inventory.includes(BookThreeAlias)) {

                    objects.push(new BookThree);

                }

            }

            objects.push(bookCase, lamp, new DetectiveCharacter());

        } else {
            
            objects.push(lamp, new DetectiveCharacter());

        }

        return objects;

    }


    public examine(): ActionResult | undefined {

        return new TextActionResult([
            "Owh! This library is so big and dark, with rows of towering bookshelves. The air is thick with the smell of old paper, and shadows dance in the corners. There's a desk in the center of the room, there is too much to explore. Where should I begin to search? hmmmmm lets begin!"
        ]);
        
    }
    

}
