import { CSSProperties } from "react";
import { ParagraphTextProps } from "./utils/blockattributes";

export default function ParagraphText({
  paragraphText,
  backgroundColor,
  textColor,
  justifyContent,
  fontWeight,
  padding,
}: ParagraphTextProps) {
  const styles = {
    container: {
      backgroundColor: backgroundColor !== "" ? backgroundColor : "#ffffff",
      padding: "10px",
    } as CSSProperties,
    text: {
      whiteSpace: "pre-line",
      fontSize: "16px",
      textAlign: justifyContent !== "" ? justifyContent : "left",
      fontWeight: fontWeight === "bold" ? "bold" : "normal",
      color: textColor !== "" ? textColor : "#000000",
      padding: padding !== "" ? padding : "10px",
    } as CSSProperties,
  } as const;

  return (
    <>
      <table role="presentation" border={0} width="100%" cellSpacing={0}>
        <tbody>
          <tr>
            <td style={styles.container}>
              {/* <p style={styles.text}>{column1Text}</p>
              <p style={styles.text}>{column2Text}</p>
              <p style={styles.text}>{column3Text}</p> */}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
