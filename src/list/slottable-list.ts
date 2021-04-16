import { LitElement, html, property, customElement } from "lit-element";
import { templateContent } from "lit-html/directives/template-content";
import defaultListItem, { RowItem } from "./list-item";
import { listGroup, listItem } from "../styles/list";
import { until } from "lit-html/directives/until.js";
import { timeout } from "../utils/timeout";

function renderListItem(template: HTMLTemplateElement, item: RowItem) {
  return html`<list-item-template .template=${template} data-id=${item.id}>
    ${Object.entries(item).map(
      ([key, value]) =>
        html`<span slot=${key} class="list-item-text">${value}</span>`
    )}
  </list-item-template>`;
}

@customElement("list-item-template")
export class ListItem extends LitElement {
  @property({ type: String })
  "data-id": string | null = null;

  @property({ type: Object })
  template: HTMLTemplateElement | null = null;

  get dataId() {
    return this["data-id"];
  }

  render() {
    if (this.template) {
      return html`<li style=${listItem}>
        ${templateContent(this.template)}
      </li>`;
    }
    throw new Error(
      'Property "template" is required in list-item ' + this.dataId
    );
  }
}

@customElement("slottable-list")
export class SlottableList extends LitElement {
  @property({ type: "string", attribute: true })
  src = "";

  @property({ type: "array" }) data?: RowItem[];

  template: HTMLTemplateElement | null = null;

  private _fetchData?: Promise<any>;
  async fetchData() {
    console.log("Before fetching data");
    try {
      await timeout(2500);
      const results = await fetch(this.src).then((resp) => resp.json());
      this.data = results;
      console.log("After fetching data", results);
      return results;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  get loader() {
    return html`<li style=${listItem}><span>Loading...</span></li>`;
  }

  connectedCallback() {
    super.connectedCallback();

    this.template = this.querySelector("template");
    this._fetchData = this.fetchData();
  }

  render() {
    console.log("render", this.data);
    return html`<ul style=${listGroup}>
      ${until(
        this.data ? this.renderList(this.data) : this._fetchData,
        this.loader
      )}
    </ul>`;
  }
  renderList(data: RowItem[]) {
    console.log("render list", data);
    return data.map((item) =>
      this.template
        ? renderListItem(this.template, item)
        : defaultListItem(item)
    );
  }

  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like
     * encapsulated CSS and slots are unavailable.
     */
    return this;
  }
}
