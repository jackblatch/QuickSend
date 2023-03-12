import { type SpacerProps } from "./utils/blockattributes";

export default function Spacer({ backgroundColor, spacing }: SpacerProps) {
  const styles = {
    container: {
      backgroundColor: backgroundColor !== "" ? backgroundColor : "#ffffff",
      padding: spacing !== "" ? spacing : "10px",
    },
  } as const;

  return (
    <table role="presentation" border={0} width="100%" cellSpacing={0}>
      <tbody>
        <tr>
          <td style={styles.container}></td>
        </tr>
      </tbody>
    </table>
  );
}
