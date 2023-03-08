import FullPageError from "~/components/FullPageError";

export default function FallBackError() {
  return (
    <FullPageError
      heading="Registration unavailable"
      linkText="Try editor without an account →"
      linkAddress="/admin/campaign/edit/example-builder"
    >
      <p className="mt-6 text-base leading-7 text-gray-600">
        Sorry, registration is currently unavailable.
      </p>
    </FullPageError>
  );
}
