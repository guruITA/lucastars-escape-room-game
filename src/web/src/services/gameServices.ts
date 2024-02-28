export type GameServiceEvent<T = never> = {
    name: string;
    data: T;
};
