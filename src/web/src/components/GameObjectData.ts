import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("game-object-data")
export class GameObjectData extends LitElement {


    public render(): TemplateResult<1> {

        return html`
            <h2>Database item overview</h2>
            <table style="width:100%">
                <tr>
                    <th>Id</th>
                    <th>Alias</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th id="itemPrice">Price</th>
                    <th id="characterHp">HP</th>
                </tr>
                <tr>
                    <td>lorem ipsum</td> 
                    <td>lorem ipsum</td> 
                    <td>lorem ipsum</td> 
                    <td>lorem ipsum</td> 
                    <td>9.99</td> 
                    <td>100</td> 
                </tr>
                
            </table>
    `;
    }

}
