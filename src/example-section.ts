import {
  LitElement,
  html,
  property,
  customElement,
  internalProperty,
  css,
  query,
  queryAssignedNodes
} from "lit-element";
import { styleMap } from "lit-html/directives/style-map.js";
import Prism from "prismjs";

@customElement("code-block")
export class CodeBlock extends LitElement {
  static get styles() {
    return css`
      #hide {
        display: none !important;
      }
    `;
  }

  @property({ type: String }) language: string = "clike";
  @queryAssignedNodes() $code?: NodeListOf<HTMLElement>;
  @query("#output") $output?: HTMLElement;

  private theme = "https://unpkg.com/prismjs@1.23.0/themes/prism.css";
  private lineNumbers = false;

  async firstUpdated() {
    if (!this.$code || !this.$output) {
      throw new Error("Unable to construct source code");
    }
    const highlight = Prism.highlight(
      Array.from(this.$code).reduce((acc, node) => (acc += node.nodeValue), ""),
      Prism.languages[this.language],
      this.language
    );

    // Set to our styled block
    this.$output.innerHTML = highlight;
  }

  render() {
    return html`
      <link rel="stylesheet" href="${this.theme}" />
      <pre class="language-${this.language}"><code id="output"></code></pre>
      <div id="hide">
        <slot id="code"></slot>
      </div>
    `;
  }
}

@customElement("example-section")
export class ExampleSection extends LitElement {
  static get styles() {
    return css`
      :host {
        overflow: hidden;
      }
    `;
  }
  @property({ type: String }) title = "";
  @property({ type: String }) source = "";

  @internalProperty()
  private _showSource: boolean = false;

  toggleSource() {
    this._showSource = !this._showSource;
  }
  get renderSource() {
    const snippet = this.renderRoot.host.outerHTML;
    const code = snippet.replaceAll("<!---->", "");
    return html`<code-block language="html">${code}</code-block>`;
  }
  render() {
    return html`<section>
      <page-title>
        <h2>${this.title}</h2>
        <styled-button
          @click=${this.toggleSource}
          style=${styleMap({ margin: ".5rem" })}
        >
          Source
        </styled-button>
      </page-title>
      <slot></slot>
      ${this._showSource ? this.renderSource : ""}
    </section>`;
  }
}
