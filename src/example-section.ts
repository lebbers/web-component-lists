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
    console.log(this.$code[0]);
    // const highlight = Prism.highlight(
    //   Array.from(this.$code[0].childNodes).reduce((acc, node) => {
    //     console.log(node.nodeValue);
    //     return (acc += node.nodeValue.replace("  ", ""));
    //   }, ""),
    //   Prism.languages[this.language],
    //   this.language
    // );

    // Set to our styled block
    // this.$output.innerHTML = highlight;
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
  @property({ type: Boolean }) "show-source" = true;

  get renderSource() {
    const snippet = this.renderRoot.host.outerHTML;
    const code = snippet.replaceAll("<!---->", "");
    return html`<code-block language="html">${code}</code-block>`;
  }
  render() {
    return html`<section>
      <page-title>
        <h2>${this.title}</h2>
      </page-title>
      <slot></slot>
      ${this["show-source"] ? this.renderSource : ""}
    </section>`;
  }
}
