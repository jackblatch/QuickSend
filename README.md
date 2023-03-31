![QuickSend Logo](https://github.com/jackb14/QuickSend/blob/main/public/logo.png?raw=0)

# QuickSend

QuickSend is a visual drag and drop email builder that allows users to design, develop and send emails fast.

**Key features:**

- User authentication
- Email list management
- Ability to upload CSV files to bulk import contacts
- Drag and drop email builder
- Edit emails using the command palette for keyboard shortcuts
- Send campaigns instantly, as well as schedule for a certain day and time

## Demo Video

[![Watch demo video](https://github.com/jackb14/QuickSend/blob/main/public/demo-video-screenshot.png?raw=0)](https://youtu.be/CpvBhDoYAxg)

## Tech Stack

This project's tech stack has been built around the T3 Stack, as well as other libraries and tools for implementing app specific features.

- Next.js (React)
- Typescript
- Tailwind CSS
- PostgreSQL
- Prisma
- Auth.js
- tRPC (fully typesafe api requests)
- Cloudinary
- Headless UI (headless accessible components)
- Zod (input validation)
- dnd-kit
- Nodemailer
- React Hot Toast

## Running locally

Next.js App: `npm run dev`

Prisma Studio: `npx prisma studio`

## Documentation

### Converting React components to email friendly HTML and CSS

The `renderToHtml.ts` utils function is responsible for converting React components to email friendly HTML and CSS. It does this by using using `ReactDOMServer.renderToStaticMarkup()` to render the React component to a string. This also handles converting CSS-in-JS to regular CSS.

### Storing and retrieving React components from the database

The rendered html is never stored in the database and is ran adhoc when the user chooses to render their email to HTML or send a campaign. Instead, an array of objects containing the blocks of the email body as well as any global styles are stored as a stringified JSON object in the database. They are stored as objects containg a unique id, the name of the component and the props the component receives. The React component itself is never stored in the database.

Then, to retrieve the data, the data is parsed from the database using the `parseAndGenerateBlocks` function as well as the `generateElement` function which is used to convert the data into React components on the fly. Both functions can be found in `src -> campaignEditor -> utils -> campaignEditorUtils`.

### Adding New Blocks to the Editor

1. Create a new object in the `blockattributes.ts` file which defines the properties a component has.
2. Create any new properties below in the blockInfo object, with the appropriate inputType, name and values (if applicable).
3. Create a new component in the `campaignEditor` folder, using email supported HTML and CSS which receives the props defined in the `blockattributes.ts` file. Use conditional rendering to render the appropriate HTML and CSS based on the props.
4. Add the component name and reference to the `generateElement` function in the campaignEditorUtils.ts file.
5. Update the components state array in the `[campaignId].tsx` file found in `src -> pages -> campaign -> edit` to include the new component.

Note: Ensure componentNames and ids are consistent across all files.

### Using QuickSend without an account

The example builder blocks editor is facilitated through the 'example-builder' campaignId dynamic route with state and serverside rendering. Provided the campaignId is 'example-builder' (e.g. `/admin/campaign/edit/example-builder`), all users (regardless of their authentication state) will be able to access the editor. For all other routes, users will need to be authenticated in order to view their campaigns and experience the full editor.

Certain features are restricted without an account, such as the ability to save and send campaigns, upload an image. Instead, users are able to render their email to HTML which can then be used to send email elsewhere.

### Campaign Scheduling

Email scheduling is facilitated through a cron job that checks the database for any campaigns that have a scheduled date at/before the current time and have not yet been sent. If a campaign is found, the cron job will send the email and update the campaign's sent status to true.

The cron job file that is responsible for this can be found at `src -> api -> scheduled-email-sender-cron.ts`.
