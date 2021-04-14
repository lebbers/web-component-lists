import { html } from "lit-element";
import { getListItem } from "../styles/list";

export interface RowItem {
  id: string;
  firstName: string;
  lastName: string;
  selected: boolean;
}

export default function defaultListItem(
  item: RowItem,
  onSelect?: (item: RowItem) => void
) {
  const onClickHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    if (onSelect) {
      onSelect(item);
    }
  };
  return html`<li
    style=${getListItem({
      backgroundColor: item.selected ? "lightblue" : "white"
    })}
    @click=${onClickHandler}
    aria-selected=${item.selected}
  >
    ${[item.firstName, item.lastName].filter(Boolean).join(" ")}
  </li>`;
}
