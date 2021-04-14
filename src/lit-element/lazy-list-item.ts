import { LitElement, html, property, customElement } from "lit-element";
import defaultListItem, { RowItem } from "./row/default";
import { listGroup, listItem } from "./styles/list";

@customElement("lazy-list-item")
export default class LazyListItem extends LitElement {
  @property({ type: Object })
  data: RowItem | null = null;

  render() {
    if (this.data) {
      return defaultListItem(this.data);
    }
    throw new Error("No data for lazy-list-item");
  }
}
