import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { getState, performAction } from "../services/routeService";
import { ActionReference, GameObjectReference, GameState } from "@shared/types";

@customElement("game-canvas")
export class GameCanvas extends LitElement {
    // Styles for the component
    public static styles = css`
    /* CSS styles for the game container */
    .game {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: auto auto auto auto;
        position: relative;
        grid-gap: 50px;
    }    
    
    /* CSS styles for the title */
    .title {
        text-align: center;
        display: flex; /* Use flexbox */
        justify-content: center;
        position: absolute;
        top: 1px;
        z-index: 1;
        white-space: nowrap; 
    }
    
    
    /* CSS styles for the header */
    .header {
        grid-column: 2;
        grid-row: 1;
        position: relative;
        max-width: 100%;
        height: auto;
        max-height: calc(100vh - 20px);
    }
    
    /* CSS styles for the header image */
    .header-image {
        display: flex; /* Use flexbox */
        justify-content: center; /* Center content horizontally */
        align-items: center; /* Center content vertically */
        height: 100%; /* Fill the entire height of the parent */
        margin-top: 20px;
    }
    
    .header img {
        max-width: 100%;
        height: auto;
        image-rendering: pixelated;
        /* Remove margin here, you can adjust margin in the parent container if needed */
    }
    
    /* CSS styles for the content */
    .content {
        grid-column: 2;
        grid-row: 2;
        position: relative;
        width: 100%;
        max-width: calc(150% - 100px);
        overflow-y: auto; 
    }
    .content p {
        margin-bottom: 25px;
        margin-top: 2px;
    }
    
    /* CSS styles for the aside container */
    .aside {
        grid-column: 1;
        background-image: url('/assets/img/rooms/ba.png');
        border: 1px solid #332c57;
        height: auto;
        position: relative;
        background-size: cover;
        max-height: calc(370px - 20px); 
    }
    
    /* CSS styles for the buttons in the aside */
    .aside .buttons .object-button {
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    
    /* CSS styles for the general buttons in the aside */
    .aside .button {
        background-color: #C89567;
        border: 1px solid #332c57;
        padding: 1px 1px;
        margin: 7px 9px 5px 9px;
        text-transform: uppercase;
        cursor: pointer;
        display: inline-block;
        user-select: none;
        text-align: center;
        font-size: 17px;
    }
    
    /* CSS styles for the active or hover state of buttons in the aside */
    .aside .button.active,
    .aside .buttons .object-button:hover {
        background-color: #573A20;
    }
    
    /* CSS styles for the pin container in the aside */
    .aside .pin-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 5px;
        font-size: 17px;
        padding: 10px;
        margin: 0 2px;
    }
    
    /* CSS styles for the pin code button */
    .aside .buttons .pin-container .pin-code {
        border: 1px solid #332c57;
        padding: 5px 10px;
        margin: 0;
        text-align: center;
        cursor: pointer;
        user-select: none;
        background-color: #78757d;
    }
    .aside .buttons .action-button {
        background-color:#A76C38;
        
    }
    .aside .button.active,
    .aside .buttons .action-button:hover {
        background-color: #573A20;
    }
    
    /* CSS styles for the footer section */
    .footer-section {
        grid-column: 1;
        background-image: url('/assets/img/rooms/note1.png');
        display: flex;
        flex-direction: column;
        position: fixed;
        background-size: cover;
        color: black;
        max-height: calc(300px - 20px); 
        height: 300px;
        max-width: calc(330px);
        margin-left: 0px;
        margin-top: 360px; 
    }
    
    /* CSS styles for the footer section heading */
    .footer-section h3 {
        margin-bottom: 4px;
        font-size: 22px;
        margin-inline: 130px;
        cursor: pointer;
    }
    
    /* CSS styles for the footer section list */
    .footer-section ul {
        list-style-type: none;
        padding: 1;
        margin-top: 15px;
        font-size: 14px;
    }
 
    
    /* CSS styles for the footer section list items */
    .footer-section li {
        margin-bottom: 5px;
    }
    
    /* CSS styles for the checkbox input */
    .footer-section input[type="checkbox"] {
        margin-right: 5px;
        opacity: 0;
        position: absolute;
    }

    /* CSS styles for the checkbox input label before */
    .footer-section input[type="checkbox"] + label:before {
        content: '';
        display: inline-block;
        width: 13px;
        height: 13px;
        background-color: #fff;
        border: 1px solid #2980b9;
        border-radius: 2px;
        margin-right: 5px;
        vertical-align: middle;
    }

    /* CSS styles for the checked state of the checkbox input */
    .footer-section input[type="checkbox"]:checked + label:before {
        background-color: #4CAF50;
        content: '✔️';

    }
    
    /* CSS styles for the unchecked state of the checkbox input */
    .footer-section input[type="checkbox"]:not(:checked) + label:before {
        background-color: #E57373;
        border: 1px solid #E57373;
    }
    
    /* CSS styles for the footer buttons */
    .footer-buttons {
        position: absolute;
        bottom: 10px;
        left: 100px;
        display: flex;
        justify-content: center;
    }

    .footer-text {
        position: absolute;
        bottom: 30px;
        left: 40px;
        display: flex;
        justify-content: center;
    }
    
    /* CSS styles for the buttons in the footer */
    .footer-buttons button {
        background-color: #A76C38;
        color: white;
    }

    /* CSS styles for the arrow */
    .tasks-heading {
        display: flex;
        align-items: center;
    }

    .arrow {
        position: absolute;
        left: 160px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
    }

    .arrow.up {
        border-bottom: 6px solid #000;
    }

    .arrow.down {
        border-top: 6px solid #000; 
    }
    .footer-text {
        font-size: 15px;
        color: #AF2A28;
    }
    .footer-section textarea {
        width: 75%;
        height: 100px;
        margin-top: -10px;
        resize: none;
        font-size: 12px;
        padding: 10px;
        margin-right: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: transparent;

    
    }
    
    /* CSS styles for the footer section list */
    .footer-section .Tasks {
        list-style-type: none;
        padding: 0;
        margin: 0;
        overflow-y: auto; /* Add overflow-y property to enable vertical scrollbar */
        max-height: 150px; /* Adjust the max-height as needed */
        padding-right: -1px; /* Add padding to accommodate scrollbar on the right */
    }

    /* CSS styles for the scrollbar */
    .footer-section .Tasks::-webkit-scrollbar {
        width: 10px; /* Set the width of the scrollbar */
        height: 30px; /* Set the height of the scrollbar */
    }

    

    /* CSS styles for the scrollbar thumb */
    .footer-section .Tasks::-webkit-scrollbar-thumb {
        background-color: #AF2A28; /* Set color of the scrollbar thumb */
        border-radius: 10px; /* Set border radius of the scrollbar thumb */
    }
        
  
    
    
   
    
    `;

    // Component properties
    private roomTitle?: string;
    private roomImages?: string[];
    private contentText?: string[];
    private actionButtons?: ActionReference[];
    private gameObjectButtons?: GameObjectReference[];
    private selectedActionButton?: ActionReference;
    private selectedGameObjectButtons: Set<GameObjectReference> = new Set<GameObjectReference>();

    private miniGame?: string;
    private codeToCheck?: string;

    // Lifecycle method to fetch initial state
    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        await this.refreshState();
    }

    // Method to refresh the game state
    private async refreshState(): Promise<void> {
        const state: GameState = await getState();
        this.updateState(state);
    }

    // Method to update the game state
    private updateState(state: GameState): void {
        // Update component properties with new state
        this.roomTitle = state.roomTitle;
        this.roomImages = state.roomImages;
        this.contentText = state.text;
        this.actionButtons = state.actions;
        this.gameObjectButtons = state.objects;
        this.selectedActionButton = undefined;
        this.selectedGameObjectButtons.clear();

        this.miniGame = state.miniGame;
        this.codeToCheck = state.codeToCheck;


        // Reset pin variables if unlock code mini game is not enabled
        if (!this.unlockCodeMiniGameEnabled) {
            this.resetPinVariables();
        }
        // Request update to reflect state changes in the UI
        this.requestUpdate();
    }

    // Method to handle click on action button
    private async handleClickAction(button: ActionReference): Promise<void> {
        if (button.needsObject) {
            this.selectedActionButton = button;
            this.selectedGameObjectButtons.clear();
            this.requestUpdate();
        } else {
            const state: any = await performAction(button.alias);
            if (state === undefined) {
                return;
            }
            this.updateState(state);
        }
    }

    // Method to handle click on game object button
    private async handleClickObject(button: GameObjectReference): Promise<void> {
        if (!this.selectedActionButton) {
            return;
        }
        this.selectedGameObjectButtons.add(button);
        const state: GameState | undefined = await performAction(
            this.selectedActionButton.alias,
            [...this.selectedGameObjectButtons].map((e) => e.alias)
        );
        if (this.selectedGameObjectButtons.size >= 2) {
            this.selectedActionButton = undefined;
            this.selectedGameObjectButtons.clear();
        }
        this.requestUpdate();
        if (state === undefined) {
            return;
        }
        this.updateState(state);
    }

    private async handleResetButtonClick(): Promise<void> {
        if (confirm("Are you sure you want to reset the game?")) {
            await this.resetGame();
        }
    }

    private resetFooter(): void {
        // Reset tasks visibility
        this.tasksVisible = false;

        localStorage.removeItem("notes");


        // Uncheck all checkboxes
        const checkboxes: NodeListOf<Element> | undefined = this.shadowRoot?.querySelectorAll(".footer-section input[type=\"checkbox\"]");
        if (checkboxes) {
            checkboxes.forEach((checkbox) => {
                (checkbox as HTMLInputElement).checked = false;
            });
        }

        // Other footer variables if any
        this.requestUpdate();
    }



    private async resetGame(): Promise<void> {
        console.log("Resetting game...");
        localStorage.clear(); // Clear local storage

        const state: GameState | undefined = await performAction("reset");

        if (state !== undefined) {
            console.log("State after reset:", state);
            this.resetFooter();
            this.updateState(state);
            this.contentText = ["Welcome to 'City of Shadows: McCarthy's Confrontation'!",
                " You, William McCarthy, are the dedicated assistant to Detective John Manny, embarking on a thrilling adventure in the wintry New York of 1932. Your mission? Unravel the mystery of a relentless serial killer terrorizing the city. In each room, you must uncover a digit crucial to accessing the secret chamber where justice awaits. With Detective Manny by your side, can you crack the code and reveal the truth?"];

            console.log("Reset successful.");
        } else {
            console.log("Reset failed.");
        }
    }
    private handleNoteInputChange(event: Event): void {
        const textarea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        const inputValue: string = textarea.value;

        // Save the input value to localStorage
        localStorage.setItem("notes", inputValue);
    }


    // Render method to render the component template
    protected render(): TemplateResult {
        return html`
            <div class="game">
                ${this.renderHeader()} 
                ${this.renderContent()} 
                ${this.renderaside()}
                ${this.renderFooter()} <!-- Pass notes to the renderFooter method -->
            </div>
        `;
    }

    // Method to render the header
    private renderHeader(): TemplateResult {
        if (this.roomImages && this.roomImages.length > 0) {
            if (this.roomImages.length >= 2) {
                const secondImageUrl: string = this.roomImages[1];
                return html`
                <div class="header">
                    <div class="header-image">
                    <div class="title">${this.roomTitle}</div>
                        <img src="/assets/img/rooms/${secondImageUrl}.png" />
                    </div>
                </div>
            `;
            } else {
                const firstImageUrl: string = this.roomImages[0];
                return html`
                <div class="header">
                    <div class="header-image">
                    <div class="title">${this.roomTitle}</div>
                        <img src="/assets/img/rooms/${firstImageUrl}.png" />
                    </div>
                </div>
            `;
            }
        }
        return html`${nothing}`;
    }


    // Method to render the content
    private renderContent(): TemplateResult {
        return html`
            <div class="content">
                ${this.contentText?.map((text) => html`<p>${text}</p>`)}
                ${this.codeSoFar ? html`<p>Enter the code: ${this.codeSoFar}</p>` : nothing}
                ${this.codeAttempted && !this.isCodeCorrect ? html`<p>Incorrect code entered. Please try again.</p>` : nothing}
                ${this.isCodeCorrect && this.roomTitle === "Library room📚" ? html`<p>Good job the second number of secret room is 2</p>` : nothing}
                ${this.isCodeCorrect && this.roomTitle === "Control Room⚙️" ? html`<p>Good job the first number of secret room is 5</p>` : nothing}
                ${this.isCodeCorrect && this.roomTitle === "LockedRoom" ? html`<p>Good job</p>` : nothing}
                ${this.isCodeCorrect && this.roomTitle === "Bedroom" ? html`<p>Good job, the last number of the secret room is 7</p>` : nothing}

            </div>
        `;
    }

    // Method to render the aside component
    private renderaside(): TemplateResult {
        const isUnlockCodeMiniGameEnabled: boolean = this.unlockCodeMiniGameEnabled;

        if (isUnlockCodeMiniGameEnabled) {
            return html`
                <div class="aside">
                    <div class="pin-container">
                        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => html`
                            <a class="button pin-code" @click=${(): void => this.handleClickCode(num.toString())}>${num}</a>
                        `)}
                        <a class="button pin-code" @click=${(): void => this.handleBackspace()}>⌫</a>
                        <a class="button pin-code" @click=${(): void => this.handleClickCodeOK()}>✔</a>
                        <a class="button" @click=${(): void => this.handleLeave()}>🔙</a>
                    </div>
                </div>
            `;
        } else {
            this.resetPinVariables();

            return html`
                <div class="aside">
                    <div class="buttons">
                        <div>
                            ${this.actionButtons?.map(
                (button) => html`<a
                                    class="button action-button ${this.selectedActionButton === button ? "active" : ""}"
                                    @click=${(): void => void this.handleClickAction(button)}
                                >${button.label}</a>`
            )}
                        </div>
                        <div>
                            ${this.selectedActionButton
                    ? this.gameObjectButtons?.map(
                        (button) => html`<a
                                        class="button object-button ${this.selectedGameObjectButtons.has(button) ? "active" : ""}"
                                        @click=${(): void => void this.handleClickObject(button)}
                                    >${button.name}</a>`
                    )
                    : nothing}
                        </div>
                    </div>
                </div>
            `;
        }
    }

    private handleLeave(): void {
        // Hide the pin buttons by resetting relevant variables or setting a flag
        // For example:
        window.location.reload();
        this.requestUpdate();
    }

    // Method to render the footer
    // Method to render the footer
    private renderFooter(): TemplateResult {
        const storedNotes: string | null = localStorage.getItem("notes");
        const notes: string = storedNotes ? storedNotes : "";
        return html`
        <div class="footer-section">
            <div class="tasks-heading">
                <h3 @click=${this.toggleTasksVisibility}>Tasks</h3>
                <span class="arrow ${this.tasksVisible ? "up" : "down"}" @click=${this.toggleTasksVisibility}></span>
            </div>
            <li class="Tasks">
            <ul style=${this.tasksVisible ? "" : "display: none;"}>
                <h4> _ _ _ _ _ _ _Main Room🏛️_ _ _ _ _ _ _</h4>
                <li><input type="checkbox" id="task1" /><label for="task1">Explore the control room</label></li>
                <li><input type="checkbox" id="task2" /><label for="task2">Explore the Bedroom</label></li>
                <li><input type="checkbox" id="task3" /><label for="task3">Explore the Library</label></li>
                <li><input type="checkbox" id="task4" /><label for="task4">Explore the Locked Room</label></li>
                <li><input type="checkbox" id="task5" /><label for="task5">Look for scattered pin-code</label></li>
                <h4> _ _ _ _ _ Control Room⚙️ _ _ _ _ _ </h4>
                <li><input type="checkbox" id="task6" /><label for="task6">Explore the control room</label></li>
                <li><input type="checkbox" id="task7" /><label for="task7">Examine Cams</label></li>
                <li><input type="checkbox" id="task8" /><label for="task8">Ask Detective for help</label></li>
                <li><input type="checkbox" id="task9" /><label for="task9">Examine Sticky note</label></li>
                <li><input type="checkbox" id="task10" /><label for="task10">Examine locked cabinet</label></li>
                <h4> _ _ _ _ _ _ _Library📚_ _ _ _ _ _ _</h4>
                <li><input type="checkbox" id="task11" /><label for="task11">Examine Lamp</label></li>
                <li><input type="checkbox" id="task12" /><label for="task12">Examine BookCase</label></li>
                <li><input type="checkbox" id="task13" /><label for="task13">Talk to Detective</label></li>
                <li><input type="checkbox" id="task14" /><label for="task14">Pickup Books</label></li>
                <li><input type="checkbox" id="task15" /><label for="task15">Examine Locked cabinet</label></li>
                <h4>_ _ _ _ _ _ _  Bedroom _ _ _ _ _ _ _ </h4>
                <li><input type="checkbox" id="task16" /><label for="task16">Explore the control room</label></li>
                <li><input type="checkbox" id="task17" /><label for="task17">Examine Cams</label></li>
                <li><input type="checkbox" id="task18" /><label for="task18">Examine BluePrint</label></li>
                <li><input type="checkbox" id="task19" /><label for="task19">Examine Sticky note</label></li>
                <li><input type="checkbox" id="task20" /><label for="task20">Examine locked cabinet</label></li>
            </ul>
            ${!this.tasksVisible ? html`
                    <textarea 
                        placeholder="Write your notes here if needed..."
                        .value=${notes}  
                        @input=${this.handleNoteInputChange}
                        ></textarea><!-- Initialize textarea with notes value -->
                ` : nothing}
                    <div class="footer-text">                    
                        ${this.tasksVisible ? html`
                            <p>Hide tasks by clicking  &#9651; <br>To continue writing notes</p>
                        ` : html`
                            <p>Display tasks by clicking &#9661;</p>
                            <!-- Text input field for notes -->
                            
                        `}
                    </div>
                <div class="footer-buttons">
                    <button @click=${this.handleResetButtonClick}>Reset Game🔄</button>
                </div>
            </div>
        
        </div>
    `;
    }




    // Variable to track visibility of tasks
    private tasksVisible: boolean = false;

    // Method to toggle visibility of tasks
    private toggleTasksVisibility(): void {
        this.tasksVisible = !this.tasksVisible;
        this.requestUpdate();
    }

    // Methods for footer buttons


    // Variables for handling pin code
    private codeAttempted: boolean = false;
    private codeSoFar: string = "";
    private isCodeCorrect: boolean = false;


    // Method to reset pin variables
    private resetPinVariables(): void {
        this.codeSoFar = "";
        this.isCodeCorrect = false;
        this.codeAttempted = false;

    }


    // Method to handle click on pin code
    private handleClickCode(code: string): void {
        if (this.codeSoFar.length < 4) {
            this.codeSoFar += code;
            this.codeAttempted = false;
            this.requestUpdate();
        }
    }


    private handleClickCodeOK(): void {
        if (this.codeSoFar === this.codeToCheck) {
            console.log("Correct code entered.");
            this.isCodeCorrect = true;
        } else {
            console.log("Incorrect code entered. Please try again.");
            this.isCodeCorrect = false;
        }
        this.codeAttempted = true;
        this.requestUpdate();
    }

    // Getter method to check if unlock code mini game is enabled
    private get unlockCodeMiniGameEnabled(): boolean {
        return this.miniGame === "unlock-code";
    }

    // Method to handle backspace in pin code
    private handleBackspace(): void {
        this.codeSoFar = this.codeSoFar.slice(0, -1);
        this.requestUpdate();
    }
}
