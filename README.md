This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# NEXT-16-STARTER-TEMPLATE

## Schema-Driven Admin Panel (CMS)

A reusable, schema-driven CMS engine mounted under `/admin` built on Next.js 16 (App Router), Tailwind 4, react-hook-form, Yup, and shadcn/ui.

Per project, **only one file changes**: `src/config/admin.config.js`.

---

### 1. How to Add a Section or Nav Item

#### Adding to the Nav Tree
In `src/config/admin.config.js`, update the `nav` tree:
```js
{
  label: "About Us",
  icon: "Info",
  key: "about-us",
  type: "singleton", // or "collection"
}
```
Or as a collapsible group:
```js
{
  label: "Company",
  icon: "Building",
  children: [
    { label: "About Us", key: "about-us", type: "singleton" },
    { label: "Our Team", key: "team", type: "collection" },
  ],
}
```

#### Adding the Singleton Definition
Add the corresponding definition in `singletons` in `src/config/admin.config.js`:
```js
{
  key: "about-us",
  label: "About Us",
  fields: [
    {
      name: "sectionHeader",
      type: "group",
      title: "Section Header",
      fields: [
        { name: "title", type: "text", label: "Title", required: true },
        { name: "highlightText", type: "text", label: "Highlight Text" },
        { name: "description", type: "textarea", label: "Description" },
      ],
    },
    {
      name: "banner",
      type: "image",
      label: "Banner Image",
      colSpan: 2,
    },
    {
      name: "content",
      type: "richtext",
      label: "Story & Mission",
      colSpan: 2,
    },
  ],
}
```
The sidebar navigation, routing (`/admin/about-us`), form validation, and sticky save bar are automatically wired up.

#### Adding the Collection Definition
Add the corresponding definition in `collections` in `src/config/admin.config.js`:
```js
{
  key: "testimonials",
  label: "Testimonials",
  group: "Marketing",
  icon: "Sparkles",
  description: "Student reviews and success stories.",
  listColumns: [
    { key: "studentName", label: "Student" },
    { key: "university", label: "University" },
    { key: "isFeatured", label: "Featured" },
  ],
  fields: [
    {
      name: "studentName",
      type: "text",
      label: "Student Name",
      required: true,
      colSpan: 1,
    },
    {
      name: "university",
      type: "text",
      label: "Accepted University",
      required: true,
      colSpan: 1,
    },
    {
      name: "review",
      type: "textarea",
      label: "Review Quote",
      colSpan: 2,
    },
    {
      name: "isFeatured",
      type: "toggle",
      label: "Feature on Home",
      colSpan: 1,
    },
  ],
}
```
The list table (`/admin/c/testimonials`), search, pagination, create (`/admin/c/testimonials/new`), edit (`/admin/c/testimonials/[id]`), and delete dialogs are generated automatically.

---

### 2. How to Add a Field Type

Adding a new field type across the entire CMS requires only **one entry** in `src/components/admin/fieldRegistry.js`:

1. Create or wrap your component following the standard props contract:
   `({ form, name, label, description, required, placeholder, className, ...field })`
2. Register the component in `src/components/admin/fieldRegistry.js`:
   ```js
   import MyCustomField from "./fields/MyCustomField";

   export const fieldRegistry = {
     // ...existing types
     colorPicker: MyCustomField,
   };
   ```
3. (Optional) If custom Yup validation is required, add a case in `src/components/admin/buildYupSchema.js`:
   ```js
   case "colorPicker":
     validator = yup.string().matches(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Invalid hex color");
     break;
   ```
Now any field in `admin.config.js` can use `type: "colorPicker"`.

---

### 3. How to Connect a Real Backend

By default, the CMS uses an in-memory mock backend located at `src/app/api/mock/*` (pre-seeded with Hero, Why Choose Us, Settings, Blogs, and Events).

To connect a live backend (Node.js, Express, Fastify, Django, Supabase, Laravel, etc.):

1. In `.env.local` (or production env), set:
   ```env
   NEXT_PUBLIC_USE_MOCK=false
   NEXT_PUBLIC_API_BASE_URL_DEV=http://localhost:8000/api
   NEXT_PUBLIC_API_BASE_URL_PROD=https://api.yourdomain.com/api
   ```
2. Ensure your backend implements the REST contract in `src/lib/admin-api.js`:
   - `POST /auth/login` → sets `auth_token` and `isSignedIn` cookies or returns token.
   - `GET /auth/me` → returns `{ user: { role: "admin", ... } }`.
   - `POST /auth/logout` → clears auth cookies.
   - `GET /sections/:key` → returns `{ key, data, updatedAt }`.
   - `PUT /sections/:key` → accepts `{ data }`, returns updated section.
   - `GET /collections/:name?page=1&limit=10&search=` → returns `{ items: [...], total: 100 }`.
     *(Note: `admin-api.js` automatically maps `_id` → `id` and shapes pagination for the table kit).*
   - `GET /collections/:name/:id` → returns `{ data: item }`.
   - `POST /collections/:name` → accepts `{ data }`, returns created item.
   - `PUT /collections/:name/:id` → accepts `{ data }`, returns updated item.
   - `DELETE /collections/:name/:id` → deletes item.

---

### 4. Public Site Helper (`getSection`)

To consume CMS section data in public server components with automatic Next.js cache revalidation:

```jsx
import { getSection } from "@/lib/get-section";

export default async function HomePage() {
  const heroData = await getSection("home-hero");

  return (
    <section>
      <h1>{heroData?.title}</h1>
      <p>{heroData?.subtitle}</p>
    </section>
  );
}
```
Whenever a section is saved in `/admin`, the panel calls `POST /api/revalidate` with `tag: "section:<key>"`, instantly purging the Next.js cache using Next 16's cache tag invalidation.

