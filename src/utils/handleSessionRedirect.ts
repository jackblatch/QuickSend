import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
export default async function getServerSideProps(
  context: GetServerSidePropsContext
) {
  const session = await getSession(context);

  if (!session && context.req.url !== "/admin/campaign/edit/example-builder") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
