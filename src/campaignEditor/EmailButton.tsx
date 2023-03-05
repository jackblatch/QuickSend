import { ButtonProps } from "./utils/blockattributes";

export default function EmailButton({
  text,
  URLAddress,
  buttonBackgroundColor,
  buttonTextColor,
  backgroundColor,
  fontWeight,
  outerPadding,
  buttonPadding,
  borderRadius,
}: ButtonProps) {
  const styles: any = {
    container: {
      backgroundColor: backgroundColor !== "" ? backgroundColor : "#ffffff",
    },
    innerContainer: {
      paddingTop: outerPadding !== "" ? outerPadding : "10px",
      paddingBottom: outerPadding !== "" ? outerPadding : "10px",
    },
    button: {
      textAlign: "center",
      fontWeight: fontWeight === "bold" ? "bold" : "normal",
      color: buttonTextColor !== "" ? buttonTextColor : "#ffffff",
    },
    buttonWrapper: {
      width: "100%",
      backgroundColor:
        buttonBackgroundColor !== "" ? buttonBackgroundColor : "#000000",
      padding: buttonPadding !== "" ? buttonPadding : "10px 20px",
      borderRadius: borderRadius !== "" ? borderRadius : "5px",
    },
  } as const;

  return (
    <table
      align="center"
      cellSpacing="0"
      cellPadding="0"
      width="100%"
      style={styles.container}
    >
      <tbody>
        <tr>
          <td align="center" style={styles.innerContainer}>
            <table border={0} cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td style={styles.buttonWrapper}>
                    <a
                      href={URLAddress}
                      target="_blank"
                      style={styles.linkWrapper}
                    >
                      <span style={styles.button}>{text}</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
