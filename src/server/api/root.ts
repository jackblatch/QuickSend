import { campaignsRouter } from "./routers/campaigns";
import { contactsRouter } from "./routers/contacts";
import { listsRouter } from "./routers/lists";
import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { authRouter } from "./routers/auth";
import { emailRouter } from "./routers/email";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  lists: listsRouter,
  contacts: contactsRouter,
  campaigns: campaignsRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
