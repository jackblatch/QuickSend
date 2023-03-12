import { type ImageProps } from "./utils/blockattributes";

export default function EmailImage({
  src,
  alt,
  padding,
  backgroundColor,
}: ImageProps) {
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
            <img
              src={src === "" ? process.env.NEXT_PUBLIC_NO_IMAGE_URL : src}
              alt={alt}
              width="100%"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
