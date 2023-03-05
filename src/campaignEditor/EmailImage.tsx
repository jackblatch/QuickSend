export default function EmailImage({
  src,
  alt,
  padding,
  backgroundColor,
}: {
  src: string;
  alt: string;
  padding: string;
  backgroundColor: string;
}) {
  const styles = {
    container: {
      backgroundColor: backgroundColor !== "" ? backgroundColor : "#ffffff",
      padding: padding !== "" ? padding : "0px",
    },
  } as const;

  return (
    <table role="presentation" border={0} width="100%" cellSpacing={0}>
      <tbody>
        <tr>
          <td style={styles.container}>
            <img src={src} alt={alt} width="100%" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
