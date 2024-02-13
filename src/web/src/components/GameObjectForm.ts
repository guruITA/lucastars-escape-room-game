import { html, LitElement, TemplateResult } from "lit"; //import nothing
import { customElement } from "lit/decorators.js"; //import property
//import { GameObjectFormResult } from "@shared/GameObjectFormResult";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    public constructor() {
        super();
    }

    public render(): TemplateResult<1> {
        return html`
            <form>
                <input name="alias" type="text" placeholder="Alias" />
                <input name="name" type="text" placeholder="Naam" />
                <textarea name="description" placeholder="Beschrijving"></textarea>
                <select>
                    <option value="item">Item</option>
                    <option value="room">Room</option>
                    <option value="character">Character</option>
                </select>

                <input name="price" type="number" placeholder="test" min="0" step="0.01" value="0.00" />

                <input name="hp" type="number" min="0" step="1" />

                <button @click="${this._handleSubmit}">Toevoegen</button>
            </form>
        `;
    }

    private _handleSubmit(): void {
        console.log("test");
    }
}
