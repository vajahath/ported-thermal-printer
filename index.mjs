import { renderPrintContent } from "./dist/thermal-printer.js";

const data = await renderPrintContent({
  type: "printer",
  properties: { type: "epson" },
  children: [
    {
      type: "text",
      content: "Ghala",
      properties: { align: "center" },
    },
    {
      type: "image",
      properties: {
        src: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*sYvKNGLDUzxI11zfpeRJDA.jpeg",
      },
    },
  ],
});

console.log({ data });
