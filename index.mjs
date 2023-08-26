import { renderPrintContent } from "./printer-web-component.mjs";

console.log(
  (
    await renderPrintContent(
      `<Printer type="epson"><Text>Hello World</Text></Printer>`
    )
  ).toString()
);
