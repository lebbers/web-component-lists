import { html } from "lit-element";
import { listItem } from "../styles/list";
import { RowItem } from "./default";
import { row, column } from "../styles/grid";

export default function twoColumn(item: RowItem) {
  return html`<li style=${listItem}>
    <div style=${row}>
      <div style=${column}>${item.firstName}</div>
      <div style=${column}>${item.lastName}</div>
    </div>
  </li>`;
}
