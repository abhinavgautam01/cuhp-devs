# CUHP Devs

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Turbo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

CUHP Devs is a coding practice and student developer community platform organized as a Turbo + pnpm monorepo. It combines a Next.js frontend, an Express API, a Socket.IO realtime service, MongoDB-backed shared data models, and a local problem pipeline for coding challenges with generated multi-language boilerplate.

The repository is no longer a generic Turborepo starter. It already contains implemented flows for authentication, onboarding/profile setup, dashboard views, problem practice, realtime chat rooms, community posts/snippets, resources, settings, and public developer profiles.

## Overview

> [!NOTE]
> A student developer platform that combines coding practice, public profiles, community interaction, realtime chat, and curated learning resources in one monorepo.

## What This Project Implements

| Area | Highlights |
| --- | --- |
| `Dashboard` | Personalized welcome state, profile-aware summary cards, streak/progress widgets, activity feed, badges, and upcoming events |
| `Practice` | Coding problem catalog, problem detail pages, Monaco-based code editor, language switching, sample testcase execution, and generated starter code |
| `Community` | Social feed, post likes/bookmarks, saved snippets, chat rooms, live messaging, typing indicators, room activity, and online member tracking |
| `Resources` | Academic resource sections, Telegram/community links, and direct course or vault-style learning links |
| `Settings` | Profile editing, avatar selection, theme preference management, and logout flow |
| `Profile Overview` | Public profile pages by handle, developer search, rank/points/streak stats, activity heatmap, submissions timeline, and recent activity |

## Architecture

```text
apps/
  web/             Next.js frontend
  http-backend/    Express REST API
  socket/          Socket.IO realtime service
  problems/        Local problem statements, testcases, and generated boilerplate
packages/
  ui/                    Shared UI components
  db/                    Shared Mongoose models, schemas, and DB scripts
  common/                Shared common package
  boilerplate-generator/ Problem boilerplate generation package
  eslint-config/         Shared lint config
  typescript-config/     Shared tsconfig presets
```

### Apps

#### Web App
![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?style=flat-square&logo=nextdotjs&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State-7B3FE4?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Socket.IO Client](https://img.shields.io/badge/Socket.IO-Client-010101?style=flat-square&logo=socketdotio&logoColor=white)

- Built with Next.js App Router and React 19.
- Uses server components and client components together.
- Fetches backend data through shared API helpers.
- Uses Zustand for auth, onboarding, theme, sidebar, and toast state.
- Uses Framer Motion for animated transitions and richer UI behavior.
- Uses `socket.io-client` for realtime community chat features.

#### HTTP Backend
![Express](https://img.shields.io/badge/Express-API-000000?style=flat-square&logo=express&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Validation-3068B7?style=flat-square&logo=zod&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Cookies-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

- Built with Express + TypeScript.
- Exposes REST endpoints for auth, users, problems, submissions, code execution, languages, and posts.
- Uses JWT in cookies for auth.
- Uses Zod for request validation in the auth flow.
- Starts a background result worker after MongoDB connection is ready.

#### Socket Service
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=flat-square&logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Change_Streams-47A248?style=flat-square&logo=mongodb&logoColor=white)

- Separate realtime service using Socket.IO.
- Authenticates sockets before connection.
- Handles chat room join/leave flows, member presence, room stats, typing events, message send/delete, and room creation.
- Watches Mongo post inserts with change streams and broadcasts new posts when supported by MongoDB.

#### Problems Catalog
![Boilerplate](https://img.shields.io/badge/Boilerplate-Generated-2563EB?style=flat-square)
![Testcases](https://img.shields.io/badge/Testcases-Local-059669?style=flat-square)

- Stores coding challenge assets locally.
- Each problem can contain `Problem.md`, `Structure.md`, testcase input/output files, and generated language boilerplates.
- Example problem folders in the repo show the expected structure for challenge authoring.

### Shared Packages

#### `packages/ui`
- Shared UI library used by the web app.
- Contains reusable section UIs for dashboard, practice, community, auth, navigation, settings, and profile overview.
- Includes Monaco editor integration and markdown rendering utilities.

#### `packages/db`
- Shared Mongoose connection, models, schemas, interfaces, and enums.
- Includes scripts for syncing problems, updating problem data, and seeding testcases into MongoDB.

#### `packages/boilerplate-generator`
- Parses a problem `Structure.md` file.
- Generates starter boilerplate and full executable wrappers for C++, Rust, Python, and JavaScript.
- Supports generation for one problem slug or for all problems in the local catalog.

## Tech Stack

### Frontend
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Monaco-Editor-007ACC?style=flat-square)
![React Markdown](https://img.shields.io/badge/Markdown-Rendering-111827?style=flat-square&logo=markdown&logoColor=white)

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- Zustand
- Monaco Editor via `@monaco-editor/react`
- `react-markdown` + `remark-gfm`
- `socket.io-client`
- `lucide-react` and `react-icons`

### Backend and Realtime
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-Auth-334155?style=flat-square)
![Piston](https://img.shields.io/badge/Piston-Code_Execution-7C3AED?style=flat-square)

- Express 5
- Socket.IO
- MongoDB + Mongoose
- JWT + cookie-based auth
- bcrypt
- Zod
- Axios
- Piston-based code execution
- `p-limit` for bounded concurrent testcase execution

### Tooling
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?style=flat-square&logo=pnpm&logoColor=white)
![Turbo](https://img.shields.io/badge/Turbo-Build_System-EF4444?style=flat-square&logo=turborepo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)

- pnpm workspaces
- Turborepo
- TypeScript
- ESLint
- Prettier

## Frontend Implementation

### App Routing and UI Composition
The frontend lives in `apps/web` and uses the App Router. Product sections are split into route-level pages such as `/dashboard`, `/practice`, `/problem/[slug]`, `/community/*`, `/resources`, `/settings`, `/signin`, `/signup`, `/onboarding`, and `/:handle` for public profiles.

The app combines route-level server fetching with client-side interaction layers. Shared UI primitives and larger feature components come from `@repo/ui`, while route wrappers in `apps/web` provide data fetching, auth-aware user state, and page composition.

### State Management
Zustand stores are used for:
- authenticated user state
- onboarding flow state
- toast notifications
- theme selection
- sidebar collapse state

### Styling and UX
The frontend is styled with Tailwind CSS and uses Framer Motion for transitions, overlays, animated tab content, and section reveals. Practice uses Monaco Editor for code editing, and markdown/problem-style content is supported through shared UI package dependencies.

## Backend Implementation

The HTTP backend lives in `apps/http-backend` and exposes these route groups:

- `/auth`: signup, signin, logout, current-user lookup
- `/user`: profile update, profile fetch, dashboard data, public profile by handle, developer search, community room/snippet/message helpers
- `/problems`: list problems and fetch a problem by slug
- `/submissions`: create a submission, get recent submissions for a problem, fetch a single submission
- `/runCode`: run code against sample testcases
- `/languages`: language support endpoints
- `/posts`: create post, get feed, like post, bookmark post

### Authentication
- Signup and signin are validated with Zod.
- Passwords are hashed with bcrypt.
- Sessions are maintained using an HTTP-only `token` cookie.
- Protected endpoints use auth middleware or token verification helpers.

### Database Layer
The shared DB package models core platform entities such as:
- users
- problems
- default code
- testcases
- submissions
- posts
- chat rooms
- messages
- languages

This shared package is consumed by both the HTTP backend and the socket server so both services work against the same schemas and collections.

## Realtime Socket Features

![Chat](https://img.shields.io/badge/Realtime-Chat-0F172A?style=flat-square)
![Presence](https://img.shields.io/badge/Presence-Tracking-1D4ED8?style=flat-square)
![Typing](https://img.shields.io/badge/Typing-Indicators-7C3AED?style=flat-square)
![Rooms](https://img.shields.io/badge/Rooms-Dynamic-059669?style=flat-square)

The socket server lives in `apps/socket` and currently supports:

- authenticated socket connections
- joining and leaving chat rooms
- room-scoped online member tracking
- global room stats broadcasts
- activity logs for room joins/leaves
- sending and deleting chat messages
- typing and stop-typing events
- creating new rooms
- broadcasting newly inserted posts via MongoDB change streams

The web app consumes these features through `apps/web/hooks/useSocket.ts`.

## Problem System and Boilerplate Generator

![C++](https://img.shields.io/badge/C++-Boilerplate-00599C?style=flat-square&logo=cplusplus&logoColor=white)
![Python](https://img.shields.io/badge/Python-Boilerplate-3776AB?style=flat-square&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Boilerplate-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Rust](https://img.shields.io/badge/Rust-Boilerplate-000000?style=flat-square&logo=rust&logoColor=white)

One of the most specific parts of this project is the local problem pipeline.

### Problem Authoring Model
Problems are authored under `apps/problems/<slug>/` using files such as:
- `Problem.md`
- `Structure.md`
- `tests/input/*`
- `tests/output/*`
- generated `boilerplate/*`
- generated `boilerplate-full/*`

### Boilerplate Generation
The `packages/boilerplate-generator` package reads `Structure.md` and generates:
- starter function templates for C++, Rust, Python, and JavaScript
- full executable wrappers for those languages

### Backend Integration
When a problem is requested from the backend:
- the API loads the problem document from MongoDB
- sample testcases are loaded and deduplicated
- language metadata is loaded
- if default code is missing in MongoDB, the backend can generate it on demand from the local `Structure.md`
- the frontend receives formatted default code by language

### Code Execution Flow
The practice workspace sends code to `/runCode`, where the backend:
- validates problem slug, source code, and language
- resolves the matching language runtime/version
- loads sample testcases
- builds executable source using the generated wrapper strategy
- executes each testcase through Piston with concurrency limiting
- returns testcase-by-testcase status, stdout, stderr, time, and memory

### Submission Flow
The backend also supports formal submission creation:
- creates a submission document
- stores executable code and runtime metadata
- stores expected outputs and testcase counts
- allows later retrieval of recent and individual submission records

## Feature Breakdown By Section

### Dashboard
![Dashboard](https://img.shields.io/badge/Section-Dashboard-2563EB?style=flat-square)

Implemented pieces include:
- authenticated dashboard route
- user-aware welcome header
- profile-derived program, semester, and interests display
- XP/progress/streak widgets
- recent badges panel
- activity feed cards
- upcoming events panel
- call-to-action surfaces like daily challenge and learning path entry points

Current state notes:
- much of the dashboard payload is still mocked in the controller
- some labels and content are presentation-ready before the analytics layer is fully real

### Practice
![Practice](https://img.shields.io/badge/Section-Practice-0F766E?style=flat-square)

Implemented pieces include:
- problem listing page backed by `/problems`
- search query filtering on the frontend
- daily-problem style featured card
- problem detail page by slug
- description/editor/console split workspace
- language switching
- Monaco editor integration
- code reset and run-code actions
- sample testcase output panel
- generated default code per language

Current state notes:
- category filtering is still partial because tags are not yet resolved into a frontend-friendly category model
- the `Submit` action is present in the UI, but the run-code experience is more complete than the final submission UX shown on the page

### Community
![Community](https://img.shields.io/badge/Section-Community-7C3AED?style=flat-square)

Implemented pieces include:
- community feed route
- backend post creation and feed retrieval
- like/unlike post support
- bookmark/saved snippet support
- saved snippets page based on bookmarked snippet posts
- chat room listing and room detail flows
- realtime room join/leave
- live message delivery
- typing indicators
- online member lists and room activity stats
- room creation through sockets
- new-post realtime broadcasting when Mongo change streams are available

Current state notes:
- some room metadata and side widgets are still scaffolded or mocked
- change streams require MongoDB replica set support for automatic new-post broadcasts

### Resources
![Resources](https://img.shields.io/badge/Section-Resources-D97706?style=flat-square)

Implemented pieces include:
- dedicated resources route
- tabbed resources UI
- academic syllabus section
- Telegram/community links section
- direct course or vault section

Current state notes:
- some tabs are intentionally deferred or commented out
- data is currently supplied through mock resource helpers

### Settings
![Settings](https://img.shields.io/badge/Section-Settings-475569?style=flat-square)

Implemented pieces include:
- authenticated settings page
- editable full name, handle, bio, avatar, and theme state
- avatar picker modal
- curated avatar set plus DiceBear style selection
- save changes flow via `/user/profile`
- logout flow via `/auth/logout`
- account security section shell

Current state notes:
- password update is surfaced in the UI, but the backend password-management flow is not fully implemented here yet

### Profile Overview
![Profile Overview](https://img.shields.io/badge/Section-Profile_Overview-DC2626?style=flat-square)

Implemented pieces include:
- public profile route by handle
- own-profile detection when logged in
- developer search overlay
- follow button presentation for other users
- rank, streak, solved count, points, badges, and XP cards
- activity heatmap
- submissions today panel
- recent activity timeline

Current state notes:
- profile metrics are built from submissions/posts and are meaningfully computed
- some labels are product-facing while ranking/badging rules are still simple milestone formulas

### Auth and Onboarding
![Auth](https://img.shields.io/badge/Section-Auth_&_Onboarding-111827?style=flat-square)

Implemented pieces include:
- signup and signin screens
- validated auth backend
- cookie session setup
- onboarding/profile setup screens
- persistence of profile fields such as program, semester, interests, handle, avatar, bio, and theme

## Known Gaps and Current Problems

> [!WARNING]
> Some sections are fully wired, while others still rely on mocked payloads, staged UI, or infrastructure assumptions such as MongoDB replica-set support for change streams.

This README should reflect the code honestly, so these limitations are worth calling out:

- The current `README.md` previously lagged behind the actual product and still looked like a starter repo.
- Some dashboard, community, and resources content is still mocked or partially hardcoded.
- Practice category filtering is not fully backed by resolved tag metadata yet.
- The visible practice `Submit` button is ahead of the fully polished end-to-end submission UX in the page layer.
- Mongo change stream based post broadcasting works only when MongoDB is configured appropriately.
- A few UI sections are clearly scaffolded for future growth, especially side widgets and some resources/settings capabilities.

## Scripts

![Dev](https://img.shields.io/badge/Run-pnpm_dev-2563EB?style=flat-square)
![Build](https://img.shields.io/badge/Run-pnpm_build-059669?style=flat-square)
![Lint](https://img.shields.io/badge/Run-pnpm_lint-D97706?style=flat-square)
![Types](https://img.shields.io/badge/Run-pnpm_check--types-7C3AED?style=flat-square)

From the repository root:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

Problem and DB utility scripts:

```bash
pnpm generate-boilerplate
pnpm problem-update:db
pnpm problems-sync:db
pnpm testcases-push:db
```

## Local Services

| Service | Default Port |
| --- | --- |
| Web app | `http://localhost:3000` |
| HTTP backend | `http://localhost:3001` |
| Socket server | `http://localhost:4001` |

## Development Notes

- The workspace uses `pnpm` and `turbo` from the repo root.
- The backend and socket apps depend on the shared `@repo/db` package.
- The web app expects the backend and socket services to be available for full functionality.
- The project includes local problem assets and scripts, so the coding platform is not just UI-only; it already includes challenge content, default code generation, and execution plumbing.
