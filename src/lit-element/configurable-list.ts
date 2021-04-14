import {
  LitElement,
  html,
  property,
  customElement,
  TemplateResult
} from "lit-element";
import defaultListItem, { RowItem } from "./row/default";
import oneColumn from "./row/one-column";
import twoColumn from "./row/two-columns";
import { listGroup } from "./styles/list";

const templates: { [k: string]: (item: RowItem) => TemplateResult } = {
  "one-column": oneColumn,
  "two-columns": twoColumn
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
