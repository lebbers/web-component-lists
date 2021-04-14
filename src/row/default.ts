import { html } from "lit-element";
import { listItem } from "../styles/list";

export interface RowItem {
  id: string;
  firstName: string;
  lastName: string;
}

export default function defaultListItem(item: RowItem) {
  return html`<li style=${listItem}>
    ${[item.firstName, item.lastName].filter(Boolean).join(" ")}
  </li>`;
}
