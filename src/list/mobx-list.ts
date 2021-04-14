import { LitElement, html, property, customElement } from "lit-element";
import { RowItem } from "./list-item";
import { listGroup } from "../styles/list";
import { makeAutoObservable } from "mobx";
import { MobxReactionUpdate } from "@adobe/lit-mobx";
import defaultListItem from "./list-item";

class ListItemModel implements RowItem {
  public id = "";
  public firstName = "";
  public lastName = "";
  public selected = false;

  constructor(item: string | RowItem) {
    makeAutoObservable(this);
    if (typeof item === "string") {
      this.name = item;
    } else {
      this.id = item.id;
      this.firstName = item.firstName;
      this.lastName = item.lastName;
    }
  }

  public get name() {
    return [this.firstName, this.lastName].filter(Boolean).join(" ");
  }

  public set name(name: string) {
    const [first, last] = name.split(" ");
    this.firstName = first;
    this.lastName = last;
  }

  select() {
    this.selected = !this.selected;
  }
}

class ListStore {
  items: ListItemModel[] = [];
  state: string = "initial";

  constructor(items: ListItemModel[]) {
    makeAutoObservable(this);
    this.items.push(...items);
  }

  *fetchItems(url: string) {
    try {
      this.state = "loading";
      const results = yield fetch(url).then((resp) => resp.json());
      this.items.push(
        ...results.map((item: ListItemModel) => new ListItemModel(item))
      );
      this.state = "done";
      console.log("Loaded data", results);
    } catch (error) {
      this.state = "error";
      console.error(error);
    }
  }

  get count() {
    return this.items.length;
  }
}

const store = new ListStore([]);

@customElement("mobx-list")
export class MobxList extends MobxReactionUpdate(LitElement) {
  private store: ListStore = store;

  @property({ type: String })
  src = "";

  async connectedCallback() {
    super.connectedCallback();

    await this.store.fetchItems(this.src);
  }

  render() {
    return html`<ul style=${listGroup}>
      ${this.store.items.map(
        (item) => html`<list-item .item=${item}></list-item>`
      )}
    </ul>`;
  }
}

@customElement("list-item")
export class ListItem extends MobxReactionUpdate(LitElement) {
  @property({ type: Object, attribute: false }) item?: ListItemModel;

  onSelect() {
    this.item?.select();
  }

  render() {
    if (this.item) {
      return defaultListItem(this.item, () => this.onSelect());
    }
  }
}
