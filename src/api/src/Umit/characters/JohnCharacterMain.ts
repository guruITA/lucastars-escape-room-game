import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Talk, TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
// import { Action } from "../../base/actions/Action";

export const JohnMainCharacterAlias: string = "johnmain";

export class JohnMainCharacter extends Character implements Talk {
    public constructor() {
        super(JohnMainCharacterAlias, ExamineActionAlias, TalkActionAlias);
    } 


    public name(): string {
        return "John";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's John."]);
    }

    public resetChoices(): void{
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.mainroomDialogue1 = false;
        playerSession.mainroomDialogue2 = false;
        playerSession.mainroomDialogue3 = false;
        playerSession.mainroomDialogue4 = false;
        playerSession.mainroomDialogue5 = false;
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const askAdvice: string = `
        [John]: "Very well then, what do you wish to revisit?"
        `;
        const askExamine: string[] =  [
        "[Will]: Hey John? So what's this [ EXAMINE ] thing about??",
        "[John]: I'm starting to doubt you're ready for this case if you're unaware how [ EXAMINE ] works in all honesty.",
        "[Will]: I'm asking kindly.",
        "[John]: True enough, to examine is to be a detective, while investigating it is important that you checked every nick of every single corner before making your next move, that is what the [ EXAMINE ] action is for, you could use it on rooms and items in order to hopefully find out what your next step needs to be.",
        "[Will]: I think I get it..",
        "[John]: Great, how about this? Try to use [ EXAMINE ] in this room to see how it works.",
        "[Will]: Gotcha, will do! Thanks John."
];
        const askTalk: string[] =  [ 
        "[Will]: Could you explain me how the [ TALK ] ability works??",    
        "[John]: Sounds good Will. See whenever you're investigating, you'll naturally have some questions in your head, sometimes the best course of actions is to TALK to a person.",    
        "[Will]: Would there really be a benefit?",    
        "[John]: Well that honestly depends on wether or not you can really progress. It's not smart to ignore a helping hand after all.",    
        "[Will]: Is there another point to using [ TALK ]?",    
        "[John]: As a detective one of the most important abilities to have is to 'question' an individual, whilst confronting them with evidence. Who knows perhaps this'll be a useful ability in the future.",    
        "[Will]: Got it John, thanks I think I got the gist of [ TALK ]."
];
        const askPickUp: string[] = [
        "[Will]: ohn I kind of forgot how this [ PICK UP ] thing works like.",
        "[John]: Alright let's cover [ PICK UP ] then. See whereas [ EXAMINE ] exists in order to check your surroundings, [ PICK UP ] exists so you can physically pick up and place items inside your inventory.",
        "[Will]: But why would I do that?",
        "[John]: Not a question fitting for a detective chum, but I digress, you'd typically do that to solve a puzzle or progress with your investigations of some sort.",
        "[Will]: ..! Ah, wait I got it now. Yeah makes sense if I had the items necessary to unlock something new for my investigation.",
        "[John]: Attaboy, you're beginning to catch on."        
];
        const askInteract: string[] = [
        "[Will]: Say John?",
        "[John]: Yes son?",
        "[Will]: I noticed something weird, see when I entered the bedroom my 'Pick Up' action had changed to 'Interact', any idea why?",
        "[John]: Ahh I completely forgot about that, yeah there's a reason for that actually. See pick up and interact are basically the same but then not really.",
        "[Will]: That makes no sense, you're kind of bad at this explaining thi--",
        "[John]: I wasn't finished. See the difference that [ PICK UP ] allows you to interact with items directly, whereas [ INTERACT ] in turn allows you to interact with 'objects' instead.",
        "[Will]: Objects?",
        "[John]: Basically things such as closets, sofas, you name it. The difference in them is also that you typically find items inside those objects you wouldn't expect them to be in. Not only that, sometimes your interaction with these objects change depending on your progression.",
        "[Will]: Change how?",
        "[John]: To put it simply, at first a closet may be locked however after finding a key, the closet may be interacted with again, being able to get opened and having an item inside.",
        "[Will]: So in a laymans terms, interacting with the same object changes whenever I meet a certain condition, like having that key item.",
        "[John]: Bingo.",
        "[Will]: Got it, thanks again John."
];
        const askInspect: string[] = [
        "[Will]: John, what's this [ INSPECT ] thing about?",
        "[John]: Ah, that one. Right so basically what it does is that some items have certain hidden secrets to them. Just using [ EXAMINE ] ain't enough, thats why you use [ INSPECT ] instead to closely interact with those items in hopes to finding them.",
        "[Will]: Say like, opening a book and checking it's contents?",
        "[John]: Exactly kid, that's right.",
        "[Will]: I understand now! Thanks John."
        ];

        const leaveDialogue: string[] =[
        "[Wil]: Nevermind.",
        "[John]: Suit yourself."
];


         function getChoices(): TalkChoiceAction[] {
            const options: TalkChoiceAction[] = [];
            //  if (!playerSession.mainroomAdvice) {
            //     options.push(new TalkChoiceAction(0, "Ask for Advice"));
            // }
            if (!playerSession.mainroomDialogue1 ) {
                options.push(new TalkChoiceAction(1, "Explain [ EXAMINE ]"));
            }
            if (!playerSession.mainroomDialogue2) {
                options.push(new TalkChoiceAction(2, "Explain [ TALK ]"));
            }
            if (!playerSession.mainroomDialogue3) {
                options.push(new TalkChoiceAction(3, "Explain [ PICK UP ]"));
            }
            if (!playerSession.mainroomDialogue4) {
                options.push(new TalkChoiceAction(4, "Explain [ INTERACT ]"));
            }
            if (!playerSession.mainroomDialogue5) {
                options.push(new TalkChoiceAction(5, "Explain [ INSPECT ]"));
            }
            if (!playerSession.exitDialogue) {
                options.push(new TalkChoiceAction(6, "Nevermind."));
            }
            return options;
        }
        getChoices();
    
        if (_choiceId === 1) {
            playerSession.mainroomDialogue1 = true;
            return new TalkActionResult(this, [...askExamine], [...getChoices()]);
        } else if (_choiceId === 2) {
            playerSession.mainroomDialogue2 = true;
            return new TalkActionResult(this, [...askTalk], [...getChoices()]);
        } else if (_choiceId === 3) {
            playerSession.mainroomDialogue3 = true;
            return new TalkActionResult(this, [...askPickUp], [...getChoices()]);
        } else if (_choiceId === 4) {
            playerSession.mainroomDialogue4 = true;
            return new TalkActionResult(this, [...askInteract], [...getChoices()]);
        } else if (_choiceId === 5) {
            playerSession.mainroomDialogue5 = true;
            return new TalkActionResult(this, [...askInspect], [...getChoices()]);
        } else if (_choiceId === 6) {
            // playerSession.exitDialogue = true;
            this.resetChoices();
            return new TextActionResult([...leaveDialogue]);
        }
        if (!getChoices){
            return new TextActionResult([]);
        }
        
        return new TalkActionResult(this, [askAdvice], [...getChoices()]);

    }
}