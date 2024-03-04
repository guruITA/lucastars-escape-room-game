import { GameServiceEvent } from "../services/gameService";

export type MyInputEventData = {
    text: string;
};

export type MyInputEvent = GameServiceEvent<MyInputEventData>;
