import { LitElement, html, property, customElement } from "lit-element";
import defaultListItem, { RowItem } from "./row/default";
import { listGroup, listItem } from "./styles/list";

/**
 * Inspiration from: https://rfcs.lwc.dev/rfcs/lwc/0110-dynamic-components
 */

function renderListItem(item: RowItem) {
  return html`<list-item .template=${template} data-id=${item.id}>
    ${Object.entries(item).map(
      ([key, value]) => html`<span slot=${key}>${value}</span>`
    )}
  </list-item>`;
}

@customElement("lazy-list")
export class LazyList extends LitElement {
  @property({ type: "string", attribute: true })
  src = "";

  @property({ type: "array" }) data?: RowItem[];

  private dynamicCtor?: Function;

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
    const fetchCtor = (await import("./lazy-list-item").then((module) => {
      console.log("MODULE", module);
      return module;
    })) as Function;
    const fetchData = this.fetchData();
    const [ctor, data] = await Promise.all([fetchCtor, fetchData]);
    this.dynamicCtor = ctor;
    this.data = data;
  }

  get loader() {
    return html`<ul style=${listGroup}>
      <li style=${listItem}>Loading...</li>
    </ul>`;
  }

  render() {
    if (this.data) {
      return html`<ul style=${listGroup}>
        ${this.renderList(this.data)}
      </ul>`;
    }
    return this.loader;
  }
  renderList(data: RowItem[]) {
    return data.map((item) => renderListItem(item));
  }
}
