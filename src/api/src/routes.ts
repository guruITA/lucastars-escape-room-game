import { GameState, PerformActionRequest, ActionReference } from "@shared/types";
import { Router } from "express";
import { ActionResult } from "./base/actionResults/ActionResult";
import { TalkActionResult } from "./base/actionResults/TalkActionResult";
import { TextActionResult } from "./base/actionResults/TextActionResult";
import { CustomAction } from "./base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "./base/actions/ExamineAction";
import { TalkActionAlias, TalkAction } from "./base/actions/TalkAction";
import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { playerSessionMiddleware } from "./base/playerSessionMiddleware";
import {
    createNewPlayerSession,
    getPlayerSession,
    getRoomByAlias,
    getGameObjectByAlias,
    getGameObjectsByAliases,
} from "./instances";
import { PlayerSession } from "./types";
import { PickupAction, PickupActionAlias } from "./Gurpreet/actions/PickupAction";
import { ExamineActionResult } from "./base/actionResults/ExamineActionResult";
import { ExamineCodeActionResult } from "./base/actionResults/ExamineCodeActionResult";

export const router: Router = Router();

router.get("/", (_, res) => {
    res.send("Game");
});

router.use(playerSessionMiddleware("game", createNewPlayerSession));

router.get("/state", (_, res) => {
    const playerSession: PlayerSession = getPlayerSession();

    const room: Room | undefined = getRoomByAlias(playerSession.currentRoom);

    if (room === undefined) {
        res.status(500).end();

        return;
    }

    //NOTE: Rooms always implement Examine
    const examineActionResult: ActionResult = ExamineAction.handle(room)!;

    const gameState: GameState | undefined = convertActionResultToGameState(examineActionResult);

    if (gameState === undefined) {
        res.status(500).end();

        return;
    }

    res.json(gameState);
});

router.post("/action", (req, res) => {
    const actionRequest: PerformActionRequest = req.body as PerformActionRequest;

    const playerSession: PlayerSession = getPlayerSession();

    const room: Room | undefined = getRoomByAlias(playerSession.currentRoom);

    if (room === undefined) {
        res.status(500).end();

        return;
    }

    const actionResult: ActionResult | undefined = handleActionInRoom(
        room,
        actionRequest.action,
        actionRequest.objects
    );

    const gameState: GameState | undefined = convertActionResultToGameState(actionResult);

    if (gameState === undefined) {
        res.status(500).end();

        return;
    }

    res.json(gameState);
});

function handleActionInRoom(room: Room, alias: string, objectAliases?: string[]): ActionResult | undefined {
    const gameObjects: GameObject[] = getGameObjectsByAliases(objectAliases);

    //If there are no GameObjects, execute the action on the room instead.
    if (gameObjects.length < 1) {
        gameObjects[0] = room;
    }

    if (alias.startsWith(TalkActionAlias)) {
        const splitAlias: string[] = alias.split(":");

        if (splitAlias.length < 3) {
            if (!gameObjects || gameObjects.length < 1) {
                return undefined;
            }

            return TalkAction.handle(gameObjects[0]);
        }

        const character: GameObject | undefined = getGameObjectByAlias(splitAlias[1]);

        if (!character) {
            return undefined;
        }

        const choiceId: number = parseInt(splitAlias[2]);

        return TalkAction.handle(character, choiceId);
    }

    switch (alias) {
        case ExamineActionAlias:
            return ExamineAction.handle(gameObjects[0]);

        case PickupActionAlias:
            return PickupAction.handle(gameObjects[0]);  
    }

    return CustomAction.handle(alias, gameObjects);
}

function convertActionResultToGameState(actionResult?: ActionResult): GameState | undefined {
    //NOTE: Seems like repeated code, but the room can have changed after performing an action!

    // Retrieve the current player session
    const playerSession: PlayerSession = getPlayerSession();

    // Find the room based on the player's current room alias
    const room: Room | undefined = getRoomByAlias(playerSession.currentRoom);

    // If no room is found, return undefined
    if (!room) {
        return undefined;
    }

    // Get the actions of the room and convert them to references
    let actions: ActionReference[] = room.actions().map((e) => e.toReference());

    // Get the default images of the room
    let images: string[] = room.images();

    // Initialize the mini-game as undefined
    let miniGame: string | undefined;

    // If the action is a TalkActionResult
    if (actionResult instanceof TalkActionResult) {

        // Replace the default actions with the choices from the TalkActionResult
        actions = actionResult.choices.map((e) => e.toReference(actionResult.character));

    }

    // If the action is an ExamineActionResult
    else if(actionResult instanceof ExamineActionResult) {

        // Add the additional images from the ExamineActionResult to the default images
        images = [...room.images(), ...actionResult.images];

    }

    // If the action is an ExamineCodeActionResult
    else if (actionResult instanceof ExamineCodeActionResult) {
        
        // Add the additional images from the ExamineCodeActionResult to the default images
        images = [...room.images(), ...actionResult.images];

        // Set the mini-game to "unlock-code"
        miniGame = "unlock-code";

    }

    return {
        roomAlias: room.alias, // Alias of the room
        roomTitle: room.name(), // Name of the room
        roomImages: images, // Images of the room
        text: (actionResult as TextActionResult)?.text || ["That doesn't make any sense."], // Text of the action, if no text provided, return default text
        actions: actions, // Actions in the room
        objects: room.objects().map((e) => e.toReference()), // Objects in the room
        miniGame: miniGame // Mini-game (if present)
    };
}
