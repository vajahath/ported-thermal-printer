import { renderPrintContent } from "./thermal-printer.mjs";

console.log((await renderPrintContent({})).toString());
