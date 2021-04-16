import {
  LitElement,
  html,
  internalProperty,
  property,
  customElement,
  queryAssignedNodes
} from "lit-element";
import defaultListItem, { RowItem } from "./list-item";
import { listGroup, getListItem } from "../styles/list";

@customElement("my-list-item")
export class ListItem extends LitElement {
  @property({ type: Object, attribute: false }) item?: ListItemModel;
  @property({ type: Boolean }) selected = false;

  onSelect() {
    this.item?.select();
  }

  render() {
    return html`<li
      style=${getListItem({
        backgroundColor: "white"
      })}
    >
      <slot></slot>
    </li>`;
  }
}

@customElement("web-component-list")
export class WebComponentList extends LitElement {
  // @property({ type: String }) src = "";
  @property({ type: Array }) data = [];

  @queryAssignedNodes("", true)
  private defaultSlotNodes?: Node[];

  @internalProperty()
  private childElements: Element[] = [];
  // async fetchData() {
  //   try {
  //     const results = await fetch(this.src).then((resp) => resp.json());
  //     console.log("Loaded data", results);
  //     return results;
  //   } catch (err) {
  //     console.error(err);
  //     return [];
  //   }
  // }

  get defaultAssignedElements() {
    return (
      this.defaultSlotNodes?.filter((node) => node instanceof Element) || []
    );
  }
  handleSlotchange(event: Event) {
    const childNodes = (event.target as HTMLSlotElement)?.assignedElements({
      flatten: false
    });
    this.childElements = childNodes;
  }

  async connectedCallback() {
    super.connectedCallback();

    // this.data = await this.fetchData();
  }

  render() {
    return html`<ul style=${listGroup}>
      <slot @slotchange=${this.handleSlotchange}></slot>
      <p>
        Number of slot elements assigned to the default slot:
        ${this.defaultAssignedElements.length} | ${this.childElements.length}
      </p>
    </ul>`;
  }
}
