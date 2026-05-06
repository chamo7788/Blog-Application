# Full-Stack Blog App

A polished Next.js blog experience with authentication, rich-text publishing, search, categories, comments, and a responsive editorial-style UI.

## Setup Instructions

### Prerequisites

- Node.js 18 or newer
- npm
- A running backend API that serves the blog endpoints used by the frontend

### Local Setup

1. Install dependencies.

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root and set the API base URL.

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

   Point this at the backend that exposes the posts, categories, auth, and comments routes.

3. Start the development server.

   ```bash
   npm run dev
   ```

4. Optional checks.

   ```bash
   npm run build
   npm run lint
   ```

## Features Implemented

- Home feed with post cards, author info, category badges, and empty states.
- Search bar that filters stories by query.
- Category filtering with route-based state.
- Pagination for browsing larger post lists.
- Authentication-aware navbar with login, register, and logout actions.
- Create post flow with a rich text editor and category selection.
- Edit and delete actions for post authors.
- Post detail pages with comment viewing and comment submission.
- Responsive layout with dark mode support.
- Animated UI details using motion and subtle transitions.

## Bonus Features Implemented

- Rich text editor extras such as headings, lists, quotes, links, images, and YouTube embeds.
- Theme toggle for light and dark mode.
- Optimistic-style comment updates that show new comments immediately when the API returns them.
- Polished empty states and call-to-action screens.
- Editorial-style visual treatment with glassmorphism, gradients, and motion polish.

## Approximate Time Spent

Approx. 14 hours total.

## Folder Structure And Design Decisions

- `src/app` contains the route-level pages and layout using the Next.js App Router. Each folder maps to a user-facing route such as the home page, login, register, create, post details, and edit screens.
- `src/components` holds reusable UI building blocks such as the navbar, search bar, category filter, editor, comment section, pagination, and action buttons. Keeping these separate makes the pages easier to read and keeps interaction logic localized.
- `src/lib` stores shared app state and helpers, including auth context and auth-related utilities. This avoids duplicating login state across pages and components.
- `prisma` and `seed-categories.js` support the data model and initial category data for the backend-facing workflow.
- `public` is reserved for static assets.

Design-wise, the app leans into a modern editorial feel instead of a plain CRUD layout. The home page emphasizes visual hierarchy, generous spacing, and card-based browsing. Reusable client components handle interactive pieces like auth state, filters, rich text editing, comments, and theme switching so the route pages stay focused on composition rather than UI wiring.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm start` — run the production build
- `npm run lint` — run lint checks
