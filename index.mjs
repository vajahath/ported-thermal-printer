import { renderPrintContent } from "./dist/thermal-printer.js";

let device;

document.getElementById("test-print").addEventListener("click", async () => {
  await connectPrinter();
  console.log("Clicked, preparing data...");
  const printData = await renderPrintContent({
    type: "printer",
    properties: { type: "epson", width: 32 },
    children: [
      {
        type: "text",
        content: "Storebase",
        properties: { align: "left", bold: true, underline: "2dot-thick" },
      },
      {
        type: "image",
        properties: {
          src: "https://cdn-icons-png.flaticon.com/256/87/87390.png",
        },
      },
      { type: "row", properties: { left: "test-left", right: "32" } },
      { type: "line" },
      {
        type: "br",
      },
    ],
  });
  console.log("Prepared print data. Starting to print", printData);
  await device.transferOut(3, printData);
  console.log("Print completed");
});

async function connectPrinter() {
  if (device) {
    console.log("already connected to device");
    return;
  }

  device = await navigator.usb.requestDevice({
    filters: [],
  });

  console.log(device.productName); // "Arduino Micro"
  console.log(device.manufacturerName); // "Arduino LLC"
  console.log(device); // "Arduino LLC"

  await device.open();
  await device.selectConfiguration(1);
  await device.claimInterface(0);
}
