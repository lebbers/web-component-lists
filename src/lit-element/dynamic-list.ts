import { LitElement, html, property, customElement } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import defaultListItem from "./row/default";
import { listGroup, listItem } from "./styles/list";

const fillTemplate = function (
  templateString: string,
  templateVars: { [k: string]: string }
) {
  console.log("TemplateVars", templateVars);
  return new Function("return `" + templateString + "`;").call(templateVars);
};

function renderListItem(
  item: {
    id: string;
    firstName: string;
    lastName: string;
  },
  template?: string
) {
  if (template) {
    return html`<li style=${listItem}>
      ${unsafeHTML(fillTemplate(template, item))}
    </li>`;
  }
  return defaultListItem(item);
}

@customElement("dynamic-list")
export class DynamicList extends LitElement {
  @property({ type: "string", attribute: true })
  src = "";

  @property({ type: "array" }) data = [];

  userTemplate: string | undefined;

  async fetchData() {
    try {
      const results = await fetch(this.src).then((resp) => resp.json());
      console.log("Loaded data", results);
      return results;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async connectedCallback() {
    super.connectedCallback();

    this.userTemplate = this.querySelector("template")?.innerHTML;
    this.data = await this.fetchData();
  }

  render() {
    return html`<ul style=${listGroup}>
      ${this.data.map((item) => renderListItem(item, this.userTemplate))}
    </ul>`;
  }
}
