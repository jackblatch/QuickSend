import { HeadingTextProps } from "./utils/blockattributes";

export default function HeadingText({
  text,
  backgroundColor,
  textColor,
  justifyContent,
  headingSize,
  fontWeight,
  outerPadding,
}: HeadingTextProps) {
  const styles = {
    container: {
      backgroundColor: backgroundColor !== "" ? backgroundColor : "#ffffff",
      padding: outerPadding !== "" ? outerPadding : "10px",
    },
    heading: {
      fontSize:
        headingSize === "h1"
          ? "32px"
          : headingSize === "h2"
          ? "24px"
          : headingSize === "h3"
          ? "20.8px"
          : headingSize === "h4"
          ? "16px"
          : "16px",
      textAlign: justifyContent !== "" ? justifyContent : "left",
      fontWeight: fontWeight === "bold" ? "bold" : "normal",
      color: textColor !== "" ? textColor : "#000000",
    },
  } as const;

  const Tag: any = headingSize;

  return (
    <>
      <table role="presentation" border={0} width="100%" cellSpacing={0}>
        <tbody>
          <tr>
            <td style={styles.container}>
              <Tag is={headingSize} style={styles.heading}>
                {text}
              </Tag>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
