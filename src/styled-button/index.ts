import { css } from "@lion/core";
import { LionButton } from "@lion/button";

export class StyledButton extends LionButton {
  static get styles() {
    return [
      ...super.styles,
      css`
        /* your styles here */
      `
    ];
  }
}
