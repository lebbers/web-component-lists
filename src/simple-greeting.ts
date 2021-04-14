import { LitElement, html, property, customElement } from "lit-element";

@customElement("simple-greeting")
export class SimpleGreeting extends LitElement {
  @property({ attribute: true }) name = "world";

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
