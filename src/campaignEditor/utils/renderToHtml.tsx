import * as ReactDOMServer from "react-dom/server";
import { Block } from "./blockattributes";

export default function renderToHtml(
  blocks: Block[],
  globalStyles: Record<string, any>
) {
  const arrOfEls = blocks.map((item: any) =>
    ReactDOMServer.renderToStaticMarkup(item.element)
  );

  const getHtmlStyles = (stylesObj: Record<string, any>) => {
    const styles = ReactDOMServer.renderToStaticMarkup(
      <body style={stylesObj}></body>
    );
    return styles.substring(13, styles.length - 9);
  };

  const htmlContent = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head><table role="presentation" border="0" width="100%" cellspacing="0" style="max-width: 660px; margin: 0 auto; ${getHtmlStyles(
    globalStyles
  )}">
  <tr><td>${arrOfEls.join("")}</td></tr>
  </table></html>`;

  return htmlContent;
}
