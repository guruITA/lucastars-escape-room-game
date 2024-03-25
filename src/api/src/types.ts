export type PlayerSession = {
    currentRoom: string;
    inventory: string[];
    pickedUpBookOne: boolean;
    pickedUpBookTwo: boolean;
    pickedUpBookThree: boolean;
    pickedUpAllBooks: boolean;
    isBookCaseExamined: boolean;
    isLampOn: boolean;
    showPickupAction: boolean;
    pickedUpFlashlight: boolean;
};
