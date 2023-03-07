import { CSSProperties } from "react";
import { NavBarProps } from "./utils/blockattributes";

export default function NavBar({
  column1Text,
  column1Link,
  column2Text,
  column2Link,
  column3Text,
  column3Link,
  backgroundColor,
  textColor,
  fontWeight,
  padding,
}: NavBarProps) {
  const styles = {
    container: {
      backgroundColor: backgroundColor !== "" ? backgroundColor : "#ffffff",
      padding: "10px",
    } as CSSProperties,
    text: {
      whiteSpace: "pre-line",
      fontSize: "16px",
      textAlign: "center",
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
              <p style={styles.text}>
                <a
                  href={column1Link === "" ? "#" : column1Link}
                  target="_blank"
                >
                  {column1Text}
                </a>
              </p>
            </td>
            <td style={styles.container}>
              <p style={styles.text}>
                <a
                  href={column2Link === "" ? "#" : column2Link}
                  target="_blank"
                >
                  {column2Text}
                </a>
              </p>
            </td>
            <td style={styles.container}>
              <p style={styles.text}>
                <a
                  href={column3Link === "" ? "#" : column3Link}
                  target="_blank"
                >
                  {column3Text}
                </a>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
