import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./CustomInputElement";

@customElement("custom-input-element")
export class CustomInputElement extends LitElement {

    @property() private label: string = "";
    @property() private type: string = "";
    @property() private Id: string = "";
    @state() public value: string = "";

    

    public render(): TemplateResult<1> {
        
        return html`
                <div>
                    <label for="${this.label}">${this.label}</label>
                    <input type="${this.type}" id="${this.Id}" @input="${this.getInputValue}">
                </div>
        `;

    }

    private getInputValue(event: Event): void {

        this.requestUpdate();

        this.value = (event.target as HTMLInputElement).value;

    }


}
