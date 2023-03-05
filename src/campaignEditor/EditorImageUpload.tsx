import { CldUploadButton } from "next-cloudinary";
import { toast } from "react-hot-toast";
import Button from "~/components/Button";

export default function EditorImageUpload({
  editorValues,
  onChangeEvent,
}: {
  editorValues: any;
  onChangeEvent: any;
}) {
  return (
    <CldUploadButton
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onUpload={(res: any, widget: any) => {
        onChangeEvent(res.info.secure_url);
        widget.close();
        toast.success("Image uploaded");
      }}
      onError={() => toast.error("Error uploading image")}
    >
      <Button appearance="primary" size="md" type="submit">
        {editorValues.src ? "Replace image" : "Upload image"}
      </Button>
    </CldUploadButton>
  );
}
