import { html } from "lit-element";
import { listItem } from "../styles/list";
import { RowItem } from "./default";
import { row, column } from "../styles/grid";

export default function oneColumn(item: RowItem) {
  return html`<li style=${listItem}>
    <div style=${row}>
      <div style=${column}>${item.firstName} ${item.lastName}</div>
    </div>
  </li>`;
}
