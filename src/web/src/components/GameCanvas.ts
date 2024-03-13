import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { getState, performAction } from "../services/routeService";
import { ActionReference, GameObjectReference, GameState } from "@shared/types";

@customElement("game-canvas")
export class GameCanvas extends LitElement {
    public static styles = css`
    .game {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr auto;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

    .title {
        text-align: center;
        margin-top: 10px;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
        position: relative;
        margin-top: 10px;
    }

    .header img {
        width: 50%;
        height: auto;
        image-rendering: pixelated;
    }

    .header img:nth-child(n + 2) {
        position: absolute;
    }

    .content {
        flex-grow: 1;
        overflow: auto;
        margin-top: 10px;
        padding: 0 10px;
    }

    .content p {
        margin: 0 0 10px 0;
    }

    .content p:last-of-type {
        margin: 0;
    }

    .footer {
        border-radius: 10px 10px 0 0;
        background-color: #52478b;
        border: 1px solid #332c57;
        margin-top: 10px;
        display: flex;
        height: 105px;
    }

    .footer .buttons {
        display: flex;
        flex-direction: column;
        overflow: auto;
        padding: 10px 10px 0 10px;
    }

    .footer .button {
        background-color: #7f6ed7;
        border: 1px solid #332c57;
        padding: 5px 10px;
        margin: 0 0 10px 10px;
        text-transform: uppercase;
        cursor: pointer;
        display: inline-block;
        user-select: none;
    }

    .footer .button.active,
    .footer .button:hover {
        background-color: #332c57;
    }
    `;

    private roomTitle?: string;
    private roomImages?: string[];
    private contentText?: string[];
    private actionButtons?: ActionReference[];
    private gameObjectButtons?: GameObjectReference[];
    private selectedActionButton?: ActionReference;
    private selectedGameObjectButtons: Set<GameObjectReference> = new Set<GameObjectReference>();

    private miniGame?: string;

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();

        await this.refreshState();
    }

    private async refreshState(): Promise<void> {
        const state: GameState = await getState();

        this.updateState(state);
    }

    private updateState(state: GameState): void {
        this.roomTitle = state.roomTitle;
        this.roomImages = state.roomImages;
        this.contentText = state.text;
        this.actionButtons = state.actions;
        this.gameObjectButtons = state.objects;
        this.selectedActionButton = undefined;
        this.selectedGameObjectButtons.clear();

        this.miniGame = state.miniGame;

        this.requestUpdate();
    }

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

    protected render(): TemplateResult {
        return html`
            <div class="game">
                ${this.renderTitle()} ${this.renderHeader()} ${this.renderContent()} ${this.renderFooter()}
            </div>
        `;
    }

    private renderTitle(): TemplateResult {
        if (this.roomTitle) {
            return html`<div class="title">${this.roomTitle}</div>`;
        }
        return html`${nothing}`;
    }

    private renderHeader(): TemplateResult {
        if (this.roomImages && this.roomImages.length > 0) {
            return html`
                <div class="header">
                    ${this.roomImages?.map((url) => html`<img src="/assets/img/rooms/${url}.png" />`)}
                </div>
            `;
        }
        return html`${nothing}`;
    }


    // This function renders the content area of the game canvas
    private renderContent(): TemplateResult {
        // Render the content area using HTML template literals
        return html`
        <div class="content">
            <!-- Render each text in the contentText array as paragraphs -->
            ${this.contentText?.map((text) => html`<p>${text}</p>`)}
            <!-- Conditional rendering: show code input if codeSoFar is not empty -->
            ${this.codeSoFar ? html`<p>Enter the code: ${this.codeSoFar}</p>` : nothing}
            <!-- Conditional rendering: show message if code is correct -->
            ${this.isCodeCorrect ? html`<p>Good job the second number of secret room is ${this.secretCode}</p>` : nothing}
        </div>
    `;
    }


    // This function renders the footer of the game canvas, including buttons for actions and objects
    private renderFooter(): TemplateResult {
        // Check if the unlock code mini-game is enabled
        const isUnlockCodeMiniGameEnabled: boolean = this.unlockCodeMiniGameEnabled;

        // If the unlock code mini-game is enabled
        if (isUnlockCodeMiniGameEnabled) {
            // Render the footer with buttons for the unlock code mini-game
            return html`
            <div class="footer">
                <div class="buttons">
                    <div>
                        <!-- Render action buttons -->
                        ${this.actionButtons?.map(
                (button) => html`<a
                                class="button ${this.selectedActionButton === button ? "active" : ""}"
                                @click=${(): void => void this.handleClickAction(button)}
                                >${button.label}</a>`
            )}
                    </div>
                    <div>
                        <!-- Render object buttons -->
                        ${this.selectedActionButton
                    ? this.gameObjectButtons?.map(
                        (button) => html`<a
                                    class="button ${this.selectedGameObjectButtons.has(button) ? "active" : ""}"
                                    @click=${(): void => void this.handleClickObject(button)}
                                    >${button.name}</a>`
                    )
                    : nothing}
                    </div>
                    <div class="pin-container">
                        <!-- Render number buttons for entering the unlock code -->
                        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => html`
                            <a class="button" @click=${(): void => this.handleClickCode(num.toString())}>${num}</a>
                        `)}
                        <!-- Render backspace button for removing the last digit entered -->
                        <a class="button" @click=${(): void => this.handleBackspace()}>Backspace</a>
                        <!-- Render OK button for confirming the entered code -->
                        <a class="button" @click=${(): void => this.handleClickCodeOK()}>OK</a>
                    </div>
                </div>
            </div>
        `;
        }

        // If the unlock code mini-game is not enabled, render the footer without mini-game buttons
        return html`
        <div class="footer">
            <div class="buttons">
                <div>
                    <!-- Render action buttons -->
                    ${this.actionButtons?.map(
            (button) => html`<a
                            class="button ${this.selectedActionButton === button ? "active" : ""}"
                            @click=${(): void => void this.handleClickAction(button)}
                            >${button.label}</a>`
        )}
                </div>
                <div>
                    <!-- Render object buttons -->
                    ${this.selectedActionButton
                ? this.gameObjectButtons?.map(
                    (button) => html`<a
                                class="button ${this.selectedGameObjectButtons.has(button) ? "active" : ""}"
                                @click=${(): void => void this.handleClickObject(button)}
                                >${button.name}</a>`
                )
                : nothing}
                </div>
            </div>
        </div>
    `;
    }



    private codeSoFar: string = ""; // The numbers entered by the player
    private isCodeCorrect: boolean = false; // if the entered code is correct or not
    private secretCode: string = "5"; // The correct code to unlock second number of the secret room

    /** 
     * When a number button is clicked, add that number to the entered code
     */
    private handleClickCode(code: string): void {
        this.codeSoFar += code;
        this.requestUpdate(); // Update the screen to show the new code
    }

    /**
     * Handles a click event on the "OK" button for the mini-game
     */
    private handleClickCodeOK(): void {

        // Checks if the entered code matches the secret code
        if (this.codeSoFar === "4422") {

            console.log("Send unlock-code action to API with code: " + this.codeSoFar);

            // Sets isCodeCorrect to true if the code is correct
            this.isCodeCorrect = true;

        } else {

            console.log("Incorrect code entered try again.");

            // Sets isCodeCorrect to false if the code is incorrect
            this.isCodeCorrect = false;

        }

        // Resets the entered code
        this.codeSoFar = "";

        // Triggers a re-render to update the UI
        this.requestUpdate();

    }


    /**
     * Checks if the unlock code mini-game is enabled
     */
    private get unlockCodeMiniGameEnabled(): boolean {

        // Returns true if the mini-game is "unlock-code"
        return this.miniGame === "unlock-code";

    }

    /**
     * Handles the backspace button for the mini-game
     */
    private handleBackspace(): void {

        // Removes the last character from the entered code
        this.codeSoFar = this.codeSoFar.slice(0, -1);

        // Triggers a re-render to update the displayed code
        this.requestUpdate();
    }
}