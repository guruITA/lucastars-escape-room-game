import { html, LitElement, TemplateResult } from "lit";
import { customElement} from "lit/decorators.js";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {

    public render(): TemplateResult<1> {
        return html`
             <h2>Game Object Form</h2>
        <form>
            <div>
                <label for="alias">Alias:</label>
                <input type="text" id="alias" name="alias">
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name">
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" name="description" rows="4"></textarea>
            </div>
            <div>
                <label for="type">Type:</label>
                <select id="type" name="type">
                    <option value="Item">Item</option>
                    <option value="Room">Room</option>
                    <option value="Character">Character</option>
                </select>
            </div>
            <div id="priceField" style="display: none;">
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" min="0" step="0.01">
            </div>
            <div id="hpField" style="display: none;">
                <label for="hp">HP:</label>
                <input type="number" id="hp" name="hp" min="0" step="1">
            </div>
            <button type="button" id="submitButton">Add</button>
        </form>
        `;
    }
}