import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import { toast, Toaster } from "react-hot-toast";
import { api } from "~/utils/api";

export default function FileUpload({ listId }: { listId: string }) {
  const addMultipleContactsToList =
    api.contacts.addMultipleContactsToList.useMutation();
  const [formValues, setFormValues] = useState<any>({
    file: "",
    ignoreFirstRow: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsError({ status: false, message: "" });
    if (!formValues.file) {
      setIsError({ status: true, message: "Please ensure a file is selected" });
      return;
    }

    if (formValues.file.type !== "text/csv") {
      setIsError({ status: true, message: "Please ensure the file is a CSV" });
      return;
    }
    setIsLoading(true);
    Papa.parse(formValues.file, {
      header: formValues.ignoreFirstRow, // needs to be ignored so it can then return an array of objects
      delimiter: ",",
      skipEmptyLines: true,
      complete: function (results: any) {
        // consider contact may already be in there, then just add contact to list
        toast.promise(
          addMultipleContactsToList.mutateAsync({
            emails: results.data.map(
              (contact: any) => Object.values(contact)[0]
            ),
            listId: listId,
          }),
          {
            loading: "Uploading contacts...",
            success: (res) => {
              setFormValues({ ...formValues, file: "" });
              setIsLoading(false);
              return `Uploaded ${res.length} contact${
                res.length === 1 ? "" : "s"
              }`;
            },
            error: () => {
              //   setIsError({ status: true, message: "An error has occurred" });
              setIsLoading(false);
              return "Failed to upload contacts";
            },
          },
          {
            position: "bottom-center",
          }
        );
      },
    });
  };

  useEffect(() => {
    if (isError.status) {
      const msg = isError.message;
      toast.error(msg, {
        position: "bottom-center",
      });
    }
  }, [isError]);

  return (
    <>
      <h2 className="flex flex-col items-center pt-8 text-2xl font-semibold text-gray-800">
        File uploader
      </h2>
      <div className="flex max-w-md items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex min-w-full flex-col items-center justify-center gap-8"
        >
          {formValues.file ? (
            <div className="min-w-full">
              <p className="mb-2 mt-6 font-semibold">Added file:</p>
              <div className="flex items-center justify-between border-y-2 border-gray-200 py-3">
                <p>{formValues.file.name}</p>
                <button
                  className="rounded-md bg-gray-100 py-1 px-4 text-sm"
                  onClick={() => setFormValues({ ...formValues, file: "" })}
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="relative mt-8 flex max-w-sm flex-col items-center rounded-md">
              <div className="border-2 border-dashed border-gray-300">
                <div
                  className="absolute top-0 z-10 items-center text-white"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%) translateY(40%)",
                  }}
                >
                  <div className="gap flex flex-col items-center justify-center">
                    <DocumentPlusIcon className="h-12 w-12 text-gray-500" />
                    <label
                      htmlFor="file"
                      className="mt-2 text-center text-sm font-semibold text-blue-600"
                    >
                      Upload a file{" "}
                      <span className="font-normal text-gray-800">
                        or drag and drop
                      </span>
                    </label>
                    <p className="mt-1 text-xs text-gray-500">CSV up to 10MB</p>
                  </div>
                </div>
                <input
                  className="relative z-10 h-[200px] border-2 bg-yellow-200 opacity-0"
                  id="file"
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    e.target.files &&
                      setFormValues({
                        ...formValues,
                        file: e.target.files[0],
                      });
                  }}
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="rounded-md bg-blue-600 py-2 px-4 text-white"
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </form>
      </div>
    </>
  );
}
