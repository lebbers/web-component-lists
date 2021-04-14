import {
  LitElement,
  html,
  property,
  customElement,
  TemplateResult
} from "lit-element";
import defaultListItem, { RowItem } from "./list-item";
import { listGroup, listItem } from "../styles/list";

@customElement("lazy-list")
export class LazyList extends LitElement {
  @property({ type: "string" }) src = "";
  @property({ type: "array" }) data?: RowItem[];

  private dynamicTemplate?: (item: RowItem, index: number) => TemplateResult;

  async fetchData() {
    try {
      const results = await fetch(this.src).then((resp) => resp.json());
      this.data = results;
      return results;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async connectedCallback() {
    super.connectedCallback();

    const fetchTemplate = await import("./lazy-list-item").then(
      (module: any) => {
        return module.default;
      }
    );
    const fetchData = this.fetchData();
    const [templateFn, data] = await Promise.all([fetchTemplate, fetchData]);
    this.dynamicTemplate = templateFn;
    this.data = data;
  }

  get loader() {
    return html`<ul style=${listGroup}>
      <li style=${listItem}>Loading...</li>
    </ul>`;
  }

  render() {
    console.log("render");
    if (this.data) {
      return html`<ul style=${listGroup}>
        ${this.renderList(this.data)}
      </ul>`;
    }
    return this.loader;
  }
  renderList(data: RowItem[]) {
    return data.map((item, index) =>
      this.dynamicTemplate
        ? this.dynamicTemplate(item, index)
        : defaultListItem(item)
    );
  }
}
