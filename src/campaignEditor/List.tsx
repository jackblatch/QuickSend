import { type CSSProperties } from "react";
import { type ListProps } from "./utils/blockattributes";

export default function List({
  paragraphText,
  backgroundColor,
  textColor,
  justifyContent,
  fontWeight,
  padding,
  listType,
}: ListProps) {
  const styles = {
    container: {
      backgroundColor: backgroundColor !== "" ? backgroundColor : "#ffffff",
      padding: "15px",
      textAlign: justifyContent !== "" ? justifyContent : "left",
    } as CSSProperties,
    listWrapper: {
      listStyleType: listType === "unordered" ? "disc" : "decimal",
      lineHeight: "0.5",
    } as CSSProperties,
    text: {
      marginLeft: "20px",
      whiteSpace: "pre-line",
      fontSize: "16px",
      fontWeight: fontWeight === "bold" ? "bold" : "normal",
      color: textColor !== "" ? textColor : "#000000",
      padding: padding !== "" ? padding : "10px",
    } as CSSProperties,
  } as const;

  const Tag = listType === "unordered" ? "ul" : "ol";

  return (
    <>
      <table role="presentation" border={0} width="100%" cellSpacing={0}>
        <tbody>
          <tr>
            <td style={styles.container}>
              <Tag style={styles.listWrapper}>
                {paragraphText?.split("\n").map((item, i) => (
                  <li style={styles.text} key={i}>
                    {item}
                  </li>
                ))}
              </Tag>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
