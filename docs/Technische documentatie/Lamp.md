# Technical Documentation: Lamp Class

> ## Overview
> The Lamp class represents an item in the game, specifically a lamp. This class extends the Item base class and implements the Examine and Talk interfaces. It encapsulates the functionality for examining and interacting with the lamp.

> ## Imports
> The class imports various modules and classes required for its functionality. These include action results, actions, game objects, and utility functions.
> ```ts
> import { ActionResult } from "../../base/actionResults/ActionResult";
> import { ExamineActionResult } from "../../base/actionResults/ExamineActionResult";
> import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
> import { TextActionResult } from "../../base/actionResults/TextActionResult";
> import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
> import { Talk, TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction";
> import { Item } from "../../base/gameObjects/Item";
> import { getPlayerSession } from "../../instances";
> import { PlayerSession } from "../../types";
> ```
>
> ## Lamp Alias
> The alias for the Lamp class is exported as LampAlias.
> ```ts
> export const LampAlias: string = "Lamp-item";
> ```
>
> ## Class Declaration
> The class Lamp is declared, extending the Item class and implementing the Examine and Talk interfaces.
> ```typescript 
> export class Lamp extends Item implements Examine, Talk {
>     ...
> }
>```
>
> ## Constructor
> The constructor initializes the Lamp instance by calling the superclass constructor with the lamp alias, examine action alias, and talk action alias.
> ```ts
> public constructor() {
>     super(LampAlias, ExamineActionAlias, TalkActionAlias);
> }
> ```
>
> ## Methods
> ### name()
> This method returns the name of the lamp.
> ```ts
> public name(): string {
>     ...
> }
> ```
> ### examine()
> Handles the examine action on the lamp, presenting options for interacting with it through talking.
> ```ts
> public examine(): ActionResult | undefined {
>     ...
> }
> ```
> ### talk(_choiceId?: number | undefined)
> Handles the talk action on the lamp based on the player's choice.
> ```ts
> public talk(_choiceId?: number | undefined): ActionResult | undefined {
>     ...
> }
> ```

> ## Conclusion
> The Lamp class encapsulates the logic and functionality of the lamp item in the game. It provides methods for examining the lamp and interacting with it through talking. This documentation serves as a guide for developers to understand and extend the functionality of the Lamp class.