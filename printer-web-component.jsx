import * as React from "react";
import {
  Br,
  Cut,
  Line,
  Printer,
  Text,
  Row,
  render,
} from "react-thermal-printer";

async function renderPrintContent() {
  const data = await render(
    <Printer type="epson">
      <Text>Hello World</Text>
    </Printer>
  );
  return data;
}

export class PrinterElement extends HTMLElement {
  constructor() {
    super();
  }

  handler(event) {
    console.log("From Handler. Event:", event);
    renderPrintContent().then(console.log).catch(console.error);
  }

  connectedCallback() {
    console.log("connectedCallback");
    this.addEventListener("print", this.handler.bind(this));
  }

  disconnectedCallback() {
    console.log("disconnectedCallback");
    this.removeEventListener("print", this.handler.bind(this));
  }
}
