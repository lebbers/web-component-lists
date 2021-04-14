import {
  LitElement,
  html,
  property,
  customElement,
  TemplateResult
} from "lit-element";
import defaultListItem, { RowItem } from "./list-item";
import { listGroup, listItem } from "../styles/list";
import { row, column } from "../styles/grid";

const templates: { [k: string]: (item: RowItem) => TemplateResult } = {
  "one-column": (item: RowItem) => {
    return html`<li style=${listItem}>
      <div style=${row}>
        <div style=${column}>${item.firstName} ${item.lastName}</div>
      </div>
    </li>`;
  },
  "two-columns": (item: RowItem) => {
    return html`<li style=${listItem}>
      <div style=${row}>
        <div style=${column}>${item.firstName}</div>
        <div style=${column}>${item.lastName}</div>
      </div>
    </li>`;
  }
};

@customElement("configurable-list")
export class ConfigurableList extends LitElement {
  @property({ type: String })
  src = "";

  @property({ type: String })
  templateName = "";

  @property({ type: "array" })
  data = [];

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
    const templateFn = templates[this.templateName];
    return html`<ul style=${listGroup}>
      ${this.data.map((item) =>
        templateFn ? templateFn(item) : defaultListItem(item)
      )}
    </ul>`;
  }
}
