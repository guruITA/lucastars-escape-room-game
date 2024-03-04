import { html, LitElement, TemplateResult, css } from "lit"; //import nothing
import { customElement, property } from "lit/decorators.js"; //import property
import { getGameObjects } from "../services/routeService";

@customElement("gameobject-table")
export class GameObjectTable extends LitElement {
    public static styles = css`
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
    `;

    @property()
    public data: any;

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        this.data = await getGameObjects();
    }

    public render(): TemplateResult {
        return html`
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Alias</th>
                        <th>Naam</th>
                        <th>Beschrijving</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.data.map((item: any) => {
                        return html`
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.alias}</td>
                                <td>${item.name}</td>
                                <td>${item.description}</td>
                                <td>
                                    <button @click=${(): void => this._editObject(item.id)}>Bewerken</button>
                                    <button @click=${(): void => this._deleteObject(item.id)}>
                                        Verwijderen
                                    </button>
                                </td>
                            </tr>
                        `;
                    })}
                </tbody>
            </table>
        `;
    }

    private _editObject(id: number): void {
        console.log(`Edit ${id}`);
    }

    private _deleteObject(id: number): void {
        if (confirm(`Weet je zeker dat je het object met id ${id} wilt verwijderen?`)) {
            alert("Item verwijderd");
        } else {
            alert("Verwijderen geannuleerd");
        }
    }
}
