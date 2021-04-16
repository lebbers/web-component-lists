import { html } from "lit-element";
import defaultListItem, { RowItem } from "./list-item";
import { getListItem } from "../styles/list";

export default function lazyListItem(item: RowItem, index: number) {
  const isEven = ++index % 2 === 0;
  if (isEven) {
    return html`<li style=${getListItem({ backgroundColor: "lightgray" })}>
      ${[item.firstName, item.lastName].filter(Boolean).join(" ")}
    </li>`;
  }
  return defaultListItem(item);
}

// render web-component items
// <my-list-item></my-list-item>

// html`<ul>
//   ${data.map(item => <my-list-item .item={item}></my-list-item>)}
// </ul>`
