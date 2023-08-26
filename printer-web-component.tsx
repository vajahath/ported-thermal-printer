import * as React from "react";
import parse from "html-react-parser";

import {
  Br,
  Cut,
  Line,
  Printer,
  Text,
  Row,
  render,
} from "react-thermal-printer";

export async function renderPrintContent(jsxTemplate: string) {
  const parsedTemplate = parse(jsxTemplate, {
    trim: true,
    replace: (domNode) => {
      if (!("name" in domNode) || domNode.name !== "printer") {
        throw new Error("Root element is not Printer");
      }

      if (!("attribs" in domNode)) throw new Error("No printer type found");

      const printerType = domNode.attribs.type;

      if (printerType !== "epson" && printerType !== "star")
        throw new Error("");

      return (
        <Printer type={printerType}>
          {domNode.children.map((child) => {
            console.log("child", child);
            if (!("name" in child)) {
              console.log("no name for child", child);
              return;
            }

            switch (child.name) {
              case "text": {
                const textData = (child as any).children[0].data;
                return <Text>{textData}</Text>;
              }
            }
            console.log("empty return");
            return <div></div>;
          })}
        </Printer>
      );
    },
  });

  if (typeof parsedTemplate === "string" || Array.isArray(parsedTemplate)) {
    throw new Error("Could not understand the print template");
  }
  console.log((await render(parsedTemplate)).toString());

  const data = await render(
    <Printer type="epson">
      <Text>Hello World</Text>
    </Printer>
  );
  return data;
}
