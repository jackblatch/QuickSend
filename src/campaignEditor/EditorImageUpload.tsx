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
    <div className="rounded-md bg-blue-600 py-2 px-3 text-center text-sm font-semibold text-white  shadow-sm ring-1 ring-inset hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-75">
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onUpload={(res: any, widget: any) => {
          onChangeEvent(res.info.secure_url);
          widget.close();
          toast.success("Image uploaded", {
            position: "bottom-center",
          });
        }}
        onError={() =>
          toast.error("Error uploading image", {
            position: "bottom-center",
          })
        }
      >
        {editorValues.src ? "Replace image" : "Upload image"}
      </CldUploadButton>
    </div>
  );
}
