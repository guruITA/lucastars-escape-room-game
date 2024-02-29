import { html, LitElement, TemplateResult, css } from "lit"; //import nothing
import { customElement, property } from "lit/decorators.js"; //import property
import { GameObjectFormResult } from "/shared/GameObjectFormResult";
import { addGameObject } from "../services/routeService";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    //Properties
    @property()
    private _alias: string;

    @property()
    private _name: string;

    @property()
    private _description: string;

    @property()
    private _type: string;

    @property()
    private _price?: number;

    @property()
    private _hp?: number;

    public constructor() {
        super();
    }

    //Styles
    private static styles = css`
        h1.success {
            color: green;
        }

        h1.failed {
            color: red;
        }
    `;

    public render(): TemplateResult {
        return html`
            <form>
                <div>
                    <label for="alias">Alias</label>
                    <input name="alias" type="text" placeholder="Alias" @input=${this._changeAlias} />
                </div>

                <div>
                    <label for="name">Naam</label>
                    <input name="name" type="text" placeholder="Naam" @input=${this._changeName} />
                </div>

                <div>
                    <label for="description">Beschrijving</label>
                    <textarea
                        name="description"
                        placeholder="Beschrijving"
                        @input=${this._changeDescription}
                    ></textarea>
                </div>

                <div>
                    <label for="type">Type</label>
                    <select name="type" @input=${this._changeType}>
                        <option value="" disabled selected>Selecteer type</option>
                        <option value="item">Item</option>
                        <option value="room">Room</option>
                        <option value="character">Character</option>
                    </select>
                </div>

                <!-- If selected value = 1 then display price input -->
                ${this._type === "item"
                    ? html`<div>
                          <label for="price">Prijs</label>
                          <input
                              name="price"
                              type="number"
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              @input=${this._changePrice}
                          />
                      </div>`
                    : ""}

                <!-- If selected value = 2 then display hp input -->
                ${this._type === "character"
                    ? html`<div>
                          <label for="hp">HP</label
                          ><input
                              name="hp"
                              type="number"
                              min="0"
                              step="1"
                              placeholder="1"
                              @input=${this._changeHp}
                          />
                      </div>`
                    : ""}

                <button @click="${this._handleSubmit}">Add ${this._type}</button>
            </form>
        `;
    }

    //Methods
    private _changeAlias(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this._alias = input.value;
    }

    private _changeName(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this._name = input.value;
    }

    private _changeDescription(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this._description = input.value;
    }

    private _changeType(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this._type = input.value;
    }

    private _changePrice(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this._price = input.value;
    }

    private _changeHp(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this._hp = input.value;
    }

    private _handleSubmit(event: Event): void {
        event.preventDefault();
        const formData: GameObjectFormResult = {
            alias: this._alias,
            name: this._name,
            description: this._description,
            type: this._type,
            price: this._price,
            hp: this._hp,
        };

        const result: boolean = addGameObject(formData);

        result.then((result) => {
            const node: HTMLElement = document.createElement("h1");
            if (result) {
                node.classList.add("success");
                node.innerHTML = "Gelukt";
            } else {
                node.classList.add("failed");
                node.innerHTML = "Mislukt";
            }
            this.renderRoot.querySelector("form").prepend(node);
        });
    }

    private _prepend(message): void {
        document.querySelector("form").prepend(`<p>${message}</p>`);
    }
}
