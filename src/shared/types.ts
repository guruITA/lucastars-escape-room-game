export type GameState = {
    roomAlias: string; // Alias of the current room
    roomTitle: string; // Title or name of the current room
    roomImages: string[]; // Images associated with the current room
    text: string[]; // Text to be displayed in the game interface
    actions: ActionReference[]; // Actions available to the player in the current room
    objects: GameObjectReference[]; // Objects present in the current room
    miniGame?: string; // Optional field indicating the type of mini-game currently active, if any
};

export type GameObjectReference = {
    alias: string; // Alias of the game object
    name: string; // Name or title of the game object
};

export type ActionReference = {
    alias: string; // Alias of the action
    label: string; // Label or description of the action
    needsObject: boolean; // Indicates whether the action requires an object to be performed
};

export type PerformActionRequest = {
    action: string; // Alias of the action to be performed
    objects?: string[]; // Optional list of object aliases associated with the action
};
