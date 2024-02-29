import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("custom-input-element")
export class CustomInputElement extends LitElement {

    // Dit zijn de attributen voor de input
    @property() private label: string = "";
    @property() private type: string = "";
    @property() private Id: string = "";
    @state() public value: string = "";


    /**
     * Rendert voor het weergeven van de input.
     * @returns TemplateResult
     */
    public render(): TemplateResult<1> {
        
        return html`
                <div>
                    <label for="${this.label}">${this.label}</label>
                    <input type="${this.type}" id="${this.Id}" @input="${this.getInputValue}" value="${this.value}">
                </div>
        `;

    }

    /**
     * Functie om de waarde van de input te krijgen.
     * @param event de input
     */
    private getInputValue(event: Event): void {

        this.requestUpdate();

        this.value = (event.target as HTMLInputElement).value;

    }


}
