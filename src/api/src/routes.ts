// Import necessary modules and types
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
import { PickUpAction, PickUpActionAlias } from "./actions/PickUpAction";
import { ExamineImageResult } from "./base/actionResults/ExamineImageResult";
import { ExamineCodeActionResult } from "./base/actionResults/ExamineCodeActionResult";

// Create Express router
export const router: Router = Router();

// Define route for the root endpoint
router.get("/", (_, res) => {
    res.send("Game");
});

// Use player session middleware
router.use(playerSessionMiddleware("game", createNewPlayerSession));

// Define route for retrieving game state
router.get("/state", (_, res) => {
    const playerSession: PlayerSession = getPlayerSession();

    // Get the current room
    const room: Room | undefined = getRoomByAlias(playerSession.currentRoom);

    // If room is not found, send internal server error
    if (room === undefined) {
        res.status(500).end();
        return;
    }

    // Perform examine action on the room to get initial game state
    const examineActionResult: ActionResult = ExamineAction.handle(room)!;

    // Convert action result to game state
    const gameState: GameState | undefined = convertActionResultToGameState(examineActionResult);

    // If game state is not valid, send internal server error
    if (gameState === undefined) {
        res.status(500).end();
        return;
    }

    // Send game state as JSON response
    res.json(gameState);
});

// Define route for performing actions
router.post("/action", (req, res) => {
    const actionRequest: PerformActionRequest = req.body as PerformActionRequest;

    const playerSession: PlayerSession = getPlayerSession();

    // Get the current room
    const room: Room | undefined = getRoomByAlias(playerSession.currentRoom);

    // If room is not found, send internal server error
    if (room === undefined) {
        res.status(500).end();
        return;
    }

    // Handle the action in the room
    const actionResult: ActionResult | undefined = handleActionInRoom(
        room,
        actionRequest.action,
        actionRequest.objects
    );

    // Convert action result to game state
    const gameState: GameState | undefined = convertActionResultToGameState(actionResult);

    // If game state is not valid, send internal server error
    if (gameState === undefined) {
        res.status(500).end();
        return;
    }

    // Send game state as JSON response
    res.json(gameState);
});

// Function to handle actions in the room
function handleActionInRoom(room: Room, alias: string, objectAliases?: string[]): ActionResult | undefined {
    const gameObjects: GameObject[] = getGameObjectsByAliases(objectAliases);

    // If there are no GameObjects, execute the action on the room instead.
    if (gameObjects.length < 1) {
        gameObjects[0] = room;
    }

    // Handle talk action
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

    // Handle other actions
    switch (alias) {
        case ExamineActionAlias:
            return ExamineAction.handle(gameObjects[0]);

        case PickUpActionAlias:
            return PickUpAction.handle(gameObjects[0]);
    }

    // Handle custom actions
    return CustomAction.handle(alias, gameObjects);
}

// Function to convert action result to game state
function convertActionResultToGameState(actionResult?: ActionResult): GameState | undefined {
    // Get the current player session
    const playerSession: PlayerSession = getPlayerSession();

    // Get the current room
    const room: Room | undefined = getRoomByAlias(playerSession.currentRoom);

    // If room is not found, return undefined
    if (!room) {
        return undefined;
    }

    let actions: ActionReference[] = room.actions().map((e) => e.toReference());
    let images: string[] = room.images();
    let miniGame: string | undefined;

    // Handle different types of action results
    if (actionResult instanceof TalkActionResult) {
        actions = actionResult.choices.map((e) => e.toReference(actionResult.character));
    } else if (actionResult instanceof ExamineImageResult) {
        images = [...room.images(), ...actionResult.images];
    } else if (actionResult instanceof ExamineCodeActionResult) {
        miniGame = "unlock-code";
    }

    // Construct game state object
    return {
        roomAlias: room.alias,
        roomTitle: room.name(),
        roomImages: images,
        text: (actionResult as TextActionResult)?.text || ["That doesn't make any sense."],
        actions: actions,
        objects: room.objects().map((e) => e.toReference()),
        miniGame: miniGame,
    };
}
