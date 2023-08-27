import * as React from "react";

import {
  Br,
  Cut,
  Line,
  Printer,
  Text,
  Row,
  render,
  Barcode,
  BarcodeType,
  Align,
  PrinterType,
  TextUnderline,
  TextSize,
  QRCode,
  Image,
} from "react-thermal-printer";

export async function renderPrintContent(printData: IPrintData) {
  const data = await render(transformPrintDataToReactNodes(printData));
  return data;
}

function transformPrintDataToReactNodes(printData: IPrintData) {
  return (
    <Printer
      type={printData.properties.type}
      width={printData.properties.width}
    >
      {printData.children.map((child) => {
        switch (child.type) {
          case "text": {
            return getTextFromNode(child);
          }

          case "br": {
            return <Br />;
          }

          case "line": {
            const properties = child.properties;
            return <Line character={properties?.character}></Line>;
          }

          case "cut": {
            const properties = child.properties;
            return <Cut lineFeeds={properties?.lineFeeds} />;
          }

          case "bar-code": {
            const properties = child.properties;
            return (
              <Barcode
                type={properties?.type}
                content={properties.content}
                align={properties.align}
              />
            );
          }

          case "qr-code": {
            const properties = child.properties;
            return (
              <QRCode content={properties.content} align={properties.align} />
            );
          }

          case "image": {
            const properties = child.properties;
            return <Image src={properties.src} align={properties.align} />;
          }
          case "row": {
            const properties = child.properties;
            return (
              <Row
                left={
                  properties.left && typeof properties.left !== "string"
                    ? getTextFromNode(properties.left)
                    : properties.left ?? ""
                }
                right={
                  properties.right && typeof properties.right !== "string"
                    ? getTextFromNode(properties.right)
                    : properties.right ?? ""
                }
              />
            );
          }
        }
        throw new Error("Unknown type");
      })}
    </Printer>
  );
}

function getTextFromNode(node: IText) {
  const properties = node.properties;
  return (
    <Text
      align={properties?.align}
      bold={properties?.bold}
      underline={properties?.underline}
      invert={properties?.invert}
      size={{
        width: properties?.size?.width ?? 1,
        height: properties?.size?.height || 1,
      }}
    >
      {node.content}
    </Text>
  );
}

interface IPrintData {
  type: "printer";
  properties: {
    type: PrinterType;
    width?: number;
  };
  children: IPrintItem[];
}

type IPrintItem =
  | IText
  | IBr
  | ILine
  | ICut
  | IImage
  | IBarcode
  | IQRCode
  | IRow;

interface IText {
  type: "text";
  content: string;
  properties?: {
    align?: Align;
    bold?: boolean;
    underline?: TextUnderline;
    invert?: boolean;
    size?: {
      width?: TextSize;
      height?: TextSize;
    };
  };
}

interface IBr {
  type: "br";
}

interface ILine {
  type: "line";
  properties?: {
    character?: string;
  };
}

interface ICut {
  type: "cut";
  properties?: {
    lineFeeds?: number;
  };
}

interface IImage {
  type: "image";
  properties: {
    src: string;
    align?: Align;
  };
}

interface IQRCode {
  type: "qr-code";
  properties: {
    content: string;
    align?: Align;
  };
}

interface IBarcode {
  type: "bar-code";
  properties: {
    type: BarcodeType;
    content: string;
    align?: Align;
  };
}

interface IRow {
  type: "row";
  properties: {
    left?: IText | string;
    right?: IText | string;
  };
}
