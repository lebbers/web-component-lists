import { LitElement, html, property, customElement } from "lit-element";
import listItem from "./list-item";
import { listGroup } from "../styles/list";

@customElement("simple-list")
export class SimpleList extends LitElement {
  @property({ type: "string", attribute: true })
  src = "";

  @property({ type: "array" }) data = [];

  async fetchData() {
    try {
      const results = await fetch(this.src).then((resp) => resp.json());
      console.log("Loaded data", results);
      return results;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    this.data = await this.fetchData();
  }

  render() {
    return html`<ul style=${listGroup}>
      ${this.data.map((item) => listItem(item))}
    </ul>`;
  }
}
