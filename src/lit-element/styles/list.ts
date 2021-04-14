import { styleMap } from "lit-html/directives/style-map.js";

export const listGroup = styleMap({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "0",
  marginBottom: "0",
  borderRadius: ".25rem"
});
export const listItem = styleMap({
  position: "relative",
  display: "block",
  padding: ".5rem 1rem",
  color: "#212529",
  textDecoration: "none",
  backgroundColor: "#fff",
  border: "1px solid rgba(0,0,0,.125)"
});
