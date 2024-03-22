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
        grid-column-gap: 1px;
        grid-row-gap: 10px;
        position: relative;
    }    
    
    /* CSS styles for the title */
    .title {
        text-align: center;
        margin-top: 10px;
        position: absolute;
        top: 10px;
        left: 70%;
        transform: translateX(-50%);
        z-index: 1;
    }
    
    /* CSS styles for the header */
    .header {
        grid-column: 2;
        grid-row: 1;
        position: relative;
    }
    
    /* CSS styles for the header image */
    .header img {
        width: 100%;
        height: auto;
        image-rendering: pixelated;
        display: block;
        margin: 50px;
    }
    
    /* CSS styles for the content */
    .content {
        grid-column: 2;
        grid-row: 2;
        margin-top: -20px;
        padding: 0 40px;
        position: relative;
        width: 100%;
        max-width: calc(150% - 100px);
    }
    
    /* CSS styles for the aside container */
    .aside {
        grid-column: 1;
        background-image: url('/public/assets/img/rooms/ba.png');
        border: 1px solid #332c57;
        height: 100%;
        position: relative;
        background-size: cover;
        height: 450px;
        width: 100%;
    }
    
    /* CSS styles for the buttons in the aside */
    .aside .buttons .object-button {
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    
    /* CSS styles for the general buttons in the aside */
    .aside .button {
        background-color: #78757d;
        border: 1px solid #332c57;
        padding: 1px 1px;
        margin: 0 0 10px 9px;
        text-transform: uppercase;
        cursor: pointer;
        display: inline-block;
        user-select: none;
        text-align: center;
    }
    
    /* CSS styles for the active or hover state of buttons in the aside */
    .aside .button.active,
    .aside .button:hover {
        background-color: #332c57;
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
        background-color: #545357;
        
    }
    
    /* CSS styles for the footer section */
    .footer-section {
        grid-column: 1;
        background-image: url('/public/assets/img/rooms/note1.png');
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-y: auto;
        max-height: calc(150vh - 100px);
        position: relative;
        background-size: cover;
        color: black;
        height: 255px;
        width: 100%;
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
        margin: 0;
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
        left: 20px;
    }
    
    /* CSS styles for the buttons in the footer */
    .footer-buttons button {
        margin-right: 60px;
    }

    /* CSS styles for the arrow */
    .tasks-heading {
        display: flex;
        align-items: center;
    }

    .arrow {
        position: absolute;
        left: 170px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
    }

    .arrow.up {
        border-bottom: 6px solid #000; /* Change color as per your design */
    }

    .arrow.down {
        border-top: 6px solid #000; /* Change color as per your design */
    }
    .footer-buttons p {
        font-size: 12px;
        color: black;
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

    private handleResetButtonClick(): void {
        if (confirm("Are you sure you want to reset the game?")) {
            void this.resetGame();
        }
    }

    // Method to reset the game
    private async resetGame(): Promise<void> {
        console.log("Resetting game...");
        localStorage.clear();
        const state: GameState | undefined = await performAction("reset");

        console.log("State after reset:", state);

        if (state === undefined) {
            console.log("Reset failed.");
            return;
        }

        console.log("Reset successful.");
        this.updateState(state);
    }


    // Render method to render the component template
    protected render(): TemplateResult {
        return html`
                <div class="game">
                    ${this.renderTitle()} 
                    ${this.renderHeader()} 
                    ${this.renderContent()} 
                    ${this.renderaside()}
                    ${this.renderFooter()}
                </div>
            `;
    }

    // Method to render the title
    private renderTitle(): TemplateResult {
        if (this.roomTitle) {
            return html`<div class="title">${this.roomTitle}</div>`;
        }
        return html`${nothing}`;
    }

    // Method to render the header
    private renderHeader(): TemplateResult {
        if (this.roomImages && this.roomImages.length > 0) {
            if (this.roomImages.length >= 2) {
                const secondImageUrl: string = this.roomImages[1];
                return html`
                        <div class="header">
                            <img src="/assets/img/rooms/${secondImageUrl}.png" />
                        </div>
                    `;
            } else {
                const firstImageUrl: string = this.roomImages[0];
                return html`
                        <div class="header">
                            <img src="/assets/img/rooms/${firstImageUrl}.png" />
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
                ${this.codeAttempted && !this.isCodeCorrect ? html`<p>[Detective]: "Incorrect code entered. Please try again." are you sure you are putting the right code</p>` : nothing}
                ${this.isCodeCorrect ? html`<p>[Detective]: Good job the second number of secret room is ${this.secretCode}</p>` : nothing}
            </div>
        `;
    }

    // Method to render the aside component
    private renderaside(): TemplateResult {
        const isUnlockCodeMiniGameEnabled: boolean = this.unlockCodeMiniGameEnabled;
    
        if (isUnlockCodeMiniGameEnabled) {
            return html`
                <div class="aside">
                    <div class="buttons">
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
                    <div class="pin-container">
                        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => html`
                            <a class="button pin-code" @click=${(): void => this.handleClickCode(num.toString())}>${num}</a>
                        `)}
                        <a class="button pin-code" @click=${(): void => this.handleBackspace()}>Backspace</a>
                        <a class="button pin-code" @click=${(): void => this.handleClickCodeOK()}>OK</a>
                        <a class="button" @click=${(): void => this.handleLeave()}>Leave</a>
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
    private renderFooter(): TemplateResult {
        return html`
            <div class="footer-section">
                <div class="tasks-heading">
                    <h3 @click=${this.toggleTasksVisibility}>Tasks</h3>
                    <span class="arrow ${this.tasksVisible ? "up" : "down"}"></span>
                </div>
                <ul style=${this.tasksVisible ? "" : "display: none;"}>
                    <li><input type="checkbox" id="task1" /><label for="task1">Explore the control room</label></li>
                    <li><input type="checkbox" id="task2" /><label for="task2">Examine Cams</label></li>
                    <li><input type="checkbox" id="task3" /><label for="task3">Examine BluePrint</label></li>
                    <li><input type="checkbox" id="task1" /><label for="task4">Examine Sticky note</label></li>
                    <li><input type="checkbox" id="task2" /><label for="task5">Examine locked cabinet</label></li>
                    <li><input type="checkbox" id="task3" /><label for="task6">Talk to Detective if Hints are needed</label></li>
                </ul>
                </div>
            
            </div>
                <div class="footer-buttons">
                    <p>click on the arrow to display tasks</p>
                    <p>Displaying tasks can make the game easier.</p>
                    <button @click=${this.handleResetButtonClick}>Reset Game</button>
                    <button @click=${this.exitRoom}>Exit Room</button>

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

    private exitRoom: string = "";

    // Variables for handling pin code
    private codeAttempted: boolean = false;
    private codeSoFar: string = "";
    private isCodeCorrect: boolean = false;
    private secretCode: string = "5";


    // Method to reset pin variables
    private resetPinVariables(): void {
        this.codeSoFar = "";
        this.isCodeCorrect = false;
        this.secretCode = "2";
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
        if (this.codeSoFar === "3241") {
            console.log("Send unlock-code action to API with code: " + this.codeSoFar);
            this.isCodeCorrect = true;
        } else {
            console.log("Incorrect code entered try again.");
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
