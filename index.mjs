import { PrinterElement } from "./printer-web-component.mjs";

window.customElements.define("printer-element", PrinterElement);

document.getElementById("test-button").addEventListener("click", () => {
  console.log("clicked");
  document
    .getElementById("printer-element")
    .dispatchEvent(
      new CustomEvent("print", { detail: { stuff: "other stuff" } })
    );
});
