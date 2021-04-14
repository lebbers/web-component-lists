import { LitElement, html, property, css } from "lit-element";

export class PageTitle extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `;
  }
  @property({ attribute: true }) title = "";

  render() {
    return html`<slot></slot>`;
  }
}
