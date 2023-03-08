# QuickSend

QuickSend is a visual drag and drop email builder that allows user's to design, develop and send emails fast.

**Key features:**

- User authentication
- Email list management
- Ability to upload CSV files to bulk import contacts
- Drag and drop email builder
- Edit emails using the command palette for keyboard shortcuts
- Send campaigns instantly, as well as schedule for a certain day and time

## Tech Stack

- Next.js
- Typescript
- Tailwind
- PostgreSQL
- Prisma
- Authjs
- tRPC (fully typesafe api requests)
- Cloudinary
- Headless UI (headless accessible components)
- Zod (input validation)
- dnd-kit
- Nodemailer
- React Hot Toast

## Documentation

### Converting React components to email freindly HTML and CSS

The `renderToHtml.ts` utils function is responsible for converting React components to email freindly HTML and CSS. It does this by using using `ReactDOMServer.renderToStaticMarkup()` to render the React component to a string. This also handles converting CSS-in-JS to regular CSS.

### Storing and retreiving React components from the database

The rendered html is never stored in the database and is ran adhoc when the user chooses to render their email to HTML or send a campaign. Instead, an array of objects containing the blocks of the email body as well as any global styles are stored as a stringified JSON object in the database. They are stored as objects containg a unique id, the name of the component and the props the component receives. The React component itself is never stored in the database.

Then, to retrieve the data, the data is parsed from the database using the `parseAndGenerateBlocks` function as well as the `generateElement` function is used to convert the data into React components (both found in `src -> campaignEditor -> utils -> campaignEditorUtils`) on the fly.

### Adding New Blocks to the Editor

1. Create a new object in the `blockattributes.ts` file which defines the properties a component has.
2. Create any new properties below in the blockInfo object, with the appropriate inputType, name and values (if applicable).
3. Create a new component in the `campaignEditor` folder, using email supported HTML and CSS which receives the props defined in the `blockattributes.ts` file. Use conditional rendering to render the appropriate HTML and CSS based on the props.
4. Add the component name and reference to the `generateElement` function in the campaignEditorUtils.ts file.
5. Update the components state array in the `[campaignId].tsx` file found in `src -> pages -> campaign -> edit` to include the new component.

Note: Ensure componentNames and ids are consistent acrosss all files.

### Using QuickSend without an account

The example builder blocks editor is facilitated through the 'example-builder' campaignId dynamic route with state and serverside props. Provided the campaignId is 'example-builder' the editor will render the editor, otherwise, the editor will only be able to

Certain features are restricted without an account, such as the ability to save and send campaigns, upload an image. Instead, user's are able to render their email to HTML to then use elsewhere.

### Campaign Scheduling

Email scheduling is facilitated through a cron job that checks the database for any campaigns that have a scheduled date at/before the current time and have not yet been sent. If a campaign is found, the cron job will send the email and update the campaign's sent status to true.

The cron job file that is responsible for this can be found at `src -> api -> scheduled-email-sender-cron.ts`.
