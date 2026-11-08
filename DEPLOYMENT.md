# Deployment

CUHP Devs is a Turborepo + pnpm monorepo that deploys as **three Node processes plus two pieces of
infrastructure**. There is no container build and no CI pipeline in this repository, so deployment is
a manual, repeatable sequence: install, build, configure environment, start each service under a
process supervisor, then run the verification checks at the end of this document.

This file covers the requirements, the environment variables each app reads, build and start
commands taken from the actual package scripts, and a post-deploy checklist.

## Prerequisites

| Requirement | Version | Where it is pinned |
| --- | --- | --- |
| Node.js | 24 (`engines` allows `>=22`) | [`.node-version`](.node-version), [`package.json`](package.json) |
| pnpm | 10.30.1 | `packageManager` in [`package.json`](package.json) |
| TypeScript | 5.9.2 | root `devDependencies` |
| Turborepo | 2.8.9 | root `devDependencies` |
| MongoDB | replica set required (Atlas or self-managed) | see [MongoDB](#mongodb-is-a-replica-set-requirement) |
| Docker | required only on the host that runs Piston | [`compose.piston.yaml`](compose.piston.yaml) |

> [!NOTE]
> The workspace is defined by [`pnpm-workspace.yaml`](pnpm-workspace.yaml) as `apps/*` and
> `packages/*`. Always run `pnpm install` from the repository root — installing inside a single app
> will not link the shared `@repo/*` packages.

## Service topology

Four runtime components plus a database. Only two of them should be reachable from the internet.

| Component | Default port | Public? | Started by |
| --- | --- | --- | --- |
| `apps/web` — Next.js frontend | 3000 | **Yes** | `pnpm --filter web start` |
| `apps/http-backend` — Express API + submission worker | 3001 | **Yes** (via reverse proxy / TLS) | `pnpm --filter @repo/http-backend start` |
| `apps/socket` — Socket.IO service | 4001 | **Yes** (via reverse proxy / TLS) | `pnpm --filter @repo/socket start` |
| Piston — code execution sandbox | 2000 | **No — private only** | `docker compose -f compose.piston.yaml up -d` |
| MongoDB | 27017 | **No — private only** | Atlas, or a managed/self-hosted replica set |

`apps/problems` and everything under `packages/` are not services. They are assets and libraries
compiled into the apps that depend on them.

### How requests flow

The browser never calls the API host directly. [`apps/web/next.config.js`](apps/web/next.config.js)
rewrites `/api/:path*` to `HTTP_BACKEND_URL`, so all browser HTTP traffic is **same-origin** with the
frontend and the session cookie is first-party:

```text
browser ──/api/*──> Next.js (rewrite) ──> http-backend ──> MongoDB
                                               └────────> Piston (private)
browser ──/socket.io──────────────────────────> socket ──> MongoDB (change streams)
```

The Socket.IO connection is the one cross-origin hop: the browser connects directly to
`NEXT_PUBLIC_SOCKET_URL`, and the socket service authenticates it against the same JWT the API
issued. That is why `JWT_SECRET` must be identical in both services and why the socket service keeps
its own CORS allowlist.

> [!IMPORTANT]
> Do not expose ports 3001, 4001 or 2000 directly to the internet. Terminate TLS at a reverse proxy
> and forward to the services on loopback or a private address. Piston's package-management
> endpoints must never be reachable by users.

### Run exactly one API process and one socket process

Several pieces of state are deliberately process-local:

- the execution concurrency limiter and queue in [`apps/http-backend/src/utils/piston.ts`](apps/http-backend/src/utils/piston.ts),
- the per-user run/submit rate limiter in [`apps/http-backend/src/middleware/execution.middleware.ts`](apps/http-backend/src/middleware/execution.middleware.ts)
  (10 requests per 60 seconds, held in an in-memory `Map`),
- Socket.IO room presence and typing state.

> [!WARNING]
> Do not run multiple replicas, PM2 cluster mode, or an autoscaling group until there is a shared
> execution queue, a distributed rate limiter, a Socket.IO adapter, and shared presence. Submission
> judging itself is safe across restarts — the worker uses an atomic database claim with a renewable
> 90-second lease — but the concurrency budget and rate limit are per process.

## Environment variables

Each app ships a `.env.example`. Copy it for local development; for a real deployment set these in
the host's own configuration (systemd unit, App Service settings, Vercel project settings) rather
than committing files.

### `apps/http-backend/.env.example`

| Variable | Example / default | Notes |
| --- | --- | --- |
| `NODE_ENV` | `production` | Must be `production` for `Secure` cookies |
| `PORT` | `3001` | The service binds the host-provided port |
| `DATABASE_URL` | `mongodb://127.0.0.1:27017/cuhp?replicaSet=rs0` | Replica set required |
| `JWT_SECRET` | long random string | **Must match `apps/socket`** |
| `JWT_EXPIRES_IN` | `4d` | |
| `FRONTEND_URL` | `http://localhost:3000` | Public frontend origin |
| `BACKEND_CORS_ORIGINS` | `http://localhost:3000` | Comma-separated, no trailing slash |
| `PISTON_URL` | `http://localhost:2000/api/v2/execute` | Complete execute URL |
| `PISTON_RUNTIMES_URL` | `http://localhost:2000/api/v2/runtimes` | Complete runtimes URL |
| `PISTON_AUTH_TOKEN` | empty | Complete `Authorization` header value if required; never sent to the browser |
| `EXECUTION_CONCURRENCY` | `2` | Set to `1` on a small VM |
| `EXECUTION_QUEUE_SIZE` | `20` | Requests beyond this are rejected |
| `PISTON_RUN_MEMORY_MB` | `128` | Per run |
| `PISTON_COMPILE_MEMORY_MB` | `512` | Per compile — size the host for concurrent compilers plus the OS |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | — | OAuth app credentials |
| `GITHUB_CALLBACK_URL` | `http://localhost:3000/api/auth/github/callback` | On the **frontend** host |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | — | OAuth app credentials |
| `GOOGLE_CALLBACK_URL` | `http://localhost:3000/api/auth/google/callback` | On the **frontend** host |

### `apps/socket/.env.example`

| Variable | Example / default | Notes |
| --- | --- | --- |
| `NODE_ENV` | `production` | |
| `PORT` | `4001` | |
| `DATABASE_URL` | same cluster as the API | Change streams need the replica set |
| `JWT_SECRET` | long random string | **Must match `apps/http-backend`** |
| `SOCKET_CORS_ORIGINS` | `http://localhost:3000` | Comma-separated, no trailing slash |

### `apps/web/.env.example`

| Variable | Example / default | Notes |
| --- | --- | --- |
| `HTTP_BACKEND_URL` | `http://localhost:3001` | **Server-only.** Needed at build time *and* runtime; rebuild when it changes |
| `NEXT_PUBLIC_SOCKET_URL` | `http://localhost:4001` | Baked into the browser bundle at build time |

### `packages/db/.env.example`

Used by the problem and seeding scripts, not by a long-running service.

| Variable | Example / default | Notes |
| --- | --- | --- |
| `DATABASE_URL` | as above | |
| `PISTON_RUNTIMES_URL` | `http://localhost:2000/api/v2/runtimes` | Language seeding reads the installed inventory |
| `PISTON_AUTH_TOKEN` | empty | Optional |
| `PROBLEMS_DIR` | commented out | Absolute override for the problem catalog; defaults to `apps/problems` in the checkout |

### Values that must agree across services

| Concern | Where it is set | Rule |
| --- | --- | --- |
| JWT signing key | `http-backend`, `socket` | Byte-identical, or socket auth fails |
| Database | `http-backend`, `socket`, `packages/db` scripts | Same replica set |
| Frontend origin | `FRONTEND_URL`, `BACKEND_CORS_ORIGINS`, `SOCKET_CORS_ORIGINS` | All three are the public frontend origin, no trailing slash |
| OAuth callbacks | provider console, `GITHUB_CALLBACK_URL`, `GOOGLE_CALLBACK_URL` | Registered against the frontend hostname at `/api/auth/{provider}/callback`; update both sides together |
| Backend upstream | `HTTP_BACKEND_URL` | Reachable from the frontend's server, not from the browser |
| Socket URL | `NEXT_PUBLIC_SOCKET_URL` | Public, reachable from the browser, set before the frontend build |

> [!NOTE]
> `NEXT_PUBLIC_HTTP_URL` and `NEXT_PUBLIC_API_URL` are no longer used. If an older deployment still
> sets them, remove them — the browser must go through the same-origin `/api` rewrite so the session
> cookie stays first-party.

Production cookies are `HttpOnly`, `Secure` when `NODE_ENV=production`, and `SameSite=Lax`, so the
frontend must be served over HTTPS. The API rejects state-changing browser requests from origins
outside `BACKEND_CORS_ORIGINS`.

## MongoDB is a replica-set requirement

This is not a preference. The API refuses to start without it —
[`apps/http-backend/src/index.ts`](apps/http-backend/src/index.ts) throws
`Submission judging requires a MongoDB replica set. Use Atlas or a local replica set.`

Two features depend on it:

1. **Verdict commits.** Marking a submission `ACCEPTED` and awarding the solve/streak happen in one
   transaction. Standalone `mongod` does not support transactions.
2. **Live post broadcasts.** `apps/socket` watches post inserts with change streams, which require
   an oplog.

Atlas satisfies both on any tier that reports a replica set. A self-managed instance must be
initialised as a replica set (`replicaSet=rs0` in the connection string, matching the deployed set
name), even if it has a single member.

> [!TIP]
> Atlas offers both a `mongodb+srv://` URI and a standard `mongodb://` one. The SRV form needs
> working DNS SRV and TXT lookups, which some networks and resolvers block. If connections fail with
> DNS errors rather than authentication errors, use the standard connection string — it lists the
> hosts and the replica set name explicitly and behaves identically once connected.

The API waits for database readiness before it begins listening, and `/health/ready` returns 503
while MongoDB is disconnected.

## Code execution (Piston)

Code runs through [Piston](https://github.com/engineer-man/piston), which is **not** part of this
repository and is excluded from Git. It needs a Linux host with Docker, privileged containers and
`exec` on `/tmp` — see [`compose.piston.yaml`](compose.piston.yaml), which binds port 2000 to
loopback only and persists runtimes in `piston/data/piston/packages`.

The four supported languages come from `packages/boilerplate-generator`: **C++, Rust, Python and
JavaScript**. All four runtimes must be installed in Piston before language seeding will succeed;
starting the container does not install them.

For local development on Windows, start Docker Desktop with Linux containers, then from the
repository root:

```sh
pnpm -w piston:up
pnpm -w piston:logs
```

The first start downloads the image, and permission initialisation on Windows-mounted runtime files
can take several minutes — the health check allows up to ten. `pnpm -w piston:down` stops the
service and keeps the downloaded runtimes.

> [!WARNING]
> `compose.piston.yaml` is a local development convenience. Review host isolation, cgroup limits and
> network controls separately before putting it in front of real users, and keep it on a private
> address reachable only by the API host.

## Build and start

All commands run from the repository root.

```sh
pnpm install --frozen-lockfile

# Backend services and their workspace dependencies
pnpm -r --filter '@repo/http-backend...' --filter '@repo/socket...' run build

# Frontend (reads HTTP_BACKEND_URL and NEXT_PUBLIC_SOCKET_URL at build time)
pnpm --filter web build
```

| App | Build | Start | Output |
| --- | --- | --- | --- |
| `apps/http-backend` | `tsc -b` | `node ./dist/index.js` | `dist/` |
| `apps/socket` | `tsc -b` | `node ./dist/index.js` | `dist/` |
| `apps/web` | `next build` | `next start` | `.next/` |

Or through the workspace:

```sh
pnpm --filter @repo/http-backend start
pnpm --filter @repo/socket start
pnpm --filter web start
```

Both Node services bind the host-provided `PORT`, expose `/health/live` and `/health/ready`, and
handle `SIGTERM`/`SIGINT` by draining work and closing connections. A forced kill leaves leased
submission jobs recoverable — another claim picks them up once the lease expires.

Keep `apps/problems` in the backend artifact. Both the source and compiled scripts locate the
catalog independently of the working directory, and `PROBLEMS_DIR` overrides it.

### First-time database seeding

Run once against a new database, in this order, with `DATABASE_URL` supplied:

```sh
pnpm languages-sync:db    # reads the installed Piston inventory; all four languages must be present
pnpm problems-sync:db     # loads problem statements from apps/problems
pnpm testcases-push:db     # replaces sample testcases per problem
```

> [!WARNING]
> `testcases-push:db` replaces sample cases. Do not run it automatically on every deployment.

`pnpm generate-boilerplate` regenerates multi-language starter code from each problem's
`Structure.md`; review and commit the generated assets before deploying rather than generating on
the server.

## Reference deployment

The project currently runs as a split deployment: the Next.js frontend on Vercel, and the API,
socket service and Piston on Linux VMs.

| Piece | Where | How |
| --- | --- | --- |
| `apps/web` | Vercel | Git-linked build; `HTTP_BACKEND_URL` set as a runtime variable, `NEXT_PUBLIC_SOCKET_URL` at build time |
| `apps/http-backend` | Linux VM (ARM64) | `systemd` unit, `node --max-old-space-size=256 dist/index.js` |
| `apps/socket` | same VM | `systemd` unit, `node --max-old-space-size=128 dist/index.js` |
| TLS + routing | same VM | Caddy, automatic HTTPS with Let's Encrypt |
| Piston | separate VM | Docker Compose, port 2000 on a private address only |
| MongoDB | MongoDB Atlas | Managed replica set; either the `mongodb+srv://` or the standard connection string works |

Both Node services run as an unprivileged user with `NoNewPrivileges`, `PrivateTmp`,
`ProtectSystem=full` and `ProtectHome=read-only`, start at boot and restart on failure.

Caddy terminates TLS on the backend hostname and routes by path:

| Path | Upstream |
| --- | --- |
| `/socket.io`, `/socket.io/*` | socket service on loopback `:4001` |
| `/health/socket` | rewritten to `/health/ready` on the socket service |
| `/health/piston` | read-only proxy to Piston's `/api/v2/runtimes` on its private address |
| everything else | API on loopback `:3001` |

Execution and Piston package management are not exposed. A host firewall restricts Piston's port
2000 to the API VM's private address, and the only inbound rule on the backend VM is TCP 80/443.

> [!NOTE]
> On a two-vCPU VM, set `EXECUTION_CONCURRENCY=1` and provision swap. ARM64 hosts build `bcrypt`
> from source, so the toolchain must be present at install time.

## Deployment history

The topology above is the second arrangement. The first is recorded here because it explains some of
the current shape.

### Single-instance EC2

The project originally ran entirely on **one AWS EC2 instance** — the Next.js frontend, the Node
services and Piston on the same host. The Node processes ran under **PM2**. Piston ran as a **Docker
container**, Docker being a hard requirement for it; nothing else was containerised.

Requests initially reached the Node processes directly. A **reverse proxy was added later** to serve
a custom domain, `cuhp-devs.xyz`, over HTTPS. Which proxy handled that is not recorded in this
repository.

MongoDB was used without a hand-configured replica set. That was workable at the time: the startup
check that now refuses to boot without one was only added on 2026-09-17, along with transactional
verdict commits, so the earlier deployment did not yet need transactions.

### Why it moved

The EC2 free tier was due to lapse. The project was migrated roughly **one week before expiry**,
pre-empting charges rather than responding to a bill — so there is no cost breakdown from that
period to report. The `cuhp-devs.xyz` registration has since lapsed as well.

### What changed in the move

| | Single-instance EC2 | Current |
| --- | --- | --- |
| Frontend | Same host as the API | Vercel |
| API + socket | PM2 | `systemd` units on a dedicated VM |
| Piston | Same host as everything else | Its own VM, private address, firewalled to the API host |
| TLS / routing | Reverse proxy for the custom domain | Caddy, automatic HTTPS, path-routed |
| Database | MongoDB, no replica set | MongoDB Atlas (replica set) |
| Hosts | One EC2 instance | Two VMs, plus Vercel for the frontend |

Splitting Piston onto its own VM is the substantive change. Code execution needs privileged
containers, so keeping it on the same host as the API meant the sandbox and the API shared a kernel
and a memory budget. It now runs on a separate machine reachable only from the API's private
address.

Moving the frontend to Vercel is what makes the `/api` rewrite load-bearing. The browser and the API
are on different hosts, but because all browser HTTP traffic goes through the frontend's own origin,
the session cookie stays first-party and no cross-site cookie configuration is required. The
Socket.IO connection is the single exception, and it is handled by the CORS allowlist plus the
shared `JWT_SECRET`.

## Verification

Run these after every deployment. Replace the hostnames with your own.

### 1. Regression suite (no external dependencies)

```sh
pnpm test:deployment
node tests/proxy-smoke.cjs
node tests/profile-route-smoke.cjs
```

The suite in [`tests/`](tests) uses isolated model doubles and a local fake execution service — it
does not touch your database or your real Piston instance. It covers client-forged verdicts,
submission ownership, hidden-case failure, judging errors, limits and socket presence.

`proxy-smoke.cjs` starts a temporary Next.js server and a fake API on local port 3001 to verify
cookie and redirect forwarding plus authenticated server rendering, so **stop any local API first**.

### 2. Process health

```sh
curl -fsS https://api.example.com/health/live     # API process is up
curl -fsS https://api.example.com/health/ready    # 200 = MongoDB connected, 503 = not
curl -fsS https://api.example.com/health/socket   # socket service readiness
curl -fsS https://api.example.com/health/piston   # Piston runtime inventory
```

`/health/live` and `/health/ready` are routes in the applications themselves. `/health/socket` and
`/health/piston` are **not** — they are conveniences the reverse proxy provides, rewriting to the
socket service's own `/health/ready` and to Piston's read-only runtimes endpoint. If your proxy does
not define them, check those two services directly on their private addresses instead.

The Piston response must list C++, Rust, Python and JavaScript. If a language is missing, submission
judging will fail for it.

### 3. Database-backed read

```sh
curl -fsS https://api.example.com/languages
```

A populated response confirms the API, the replica set and language seeding together.

### 4. Negative checks

```sh
# Execution must reject unauthenticated callers
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://api.example.com/runCode   # expect 401
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://api.example.com/submissions # expect 401

# Piston package management must not be reachable
curl -s -o /dev/null -w '%{http_code}\n' https://api.example.com/api/v2/packages   # expect 404

# Socket.IO must reject origins outside SOCKET_CORS_ORIGINS
curl -s -o /dev/null -w '%{http_code}\n' \
  -H 'Origin: https://not-allowed.example' \
  'https://api.example.com/socket.io/?EIO=4&transport=polling'                     # expect 403
```

Confirm from outside the network that ports 3001, 4001, 2000 and 27017 do **not** answer.

### 5. Auth round trip

1. Sign in with email/password, GitHub and Google from the production frontend.
2. Confirm each provider redirects back to `https://your-frontend/api/auth/{provider}/callback`.
3. Check the session cookie is set on the frontend origin with `HttpOnly`, `Secure` and
   `SameSite=Lax`.
4. Reload a server-rendered page and confirm the session survives — this exercises cookie
   forwarding through the Next.js rewrite.
5. Call `/api/auth/me` from the frontend origin and confirm it returns the signed-in user.

### 6. Realtime

1. Open the community feed in two browsers signed in as different users.
2. Confirm the Socket.IO handshake succeeds over both WebSocket and polling transports.
3. Create a post in one session and confirm it appears in the other without a reload — this proves
   change streams, and therefore the replica set, are working end to end.
4. Join a chat room from both sessions and confirm presence, typing and message delete.

### 7. Code submission, end to end

1. Open a problem and **Run** a sample in each of the four languages.
2. **Submit** a known-correct solution and confirm the page polls to `ACCEPTED`, the problem is
   marked solved, and the streak updates.
3. Submit a solution that passes the samples but fails a hidden case, and confirm it is rejected and
   awards no solve.
4. Submit the same correct solution again and confirm it does not award a second solve.
5. Exceed 10 run/submit requests in a minute and confirm HTTP 429 with a `Retry-After` header.

## Known deployment gaps

Stated plainly, because they affect how this can be operated:

- **No CI and no container build.** There is no GitHub Actions workflow, Dockerfile for the apps, or
  infrastructure-as-code in this repository. Builds and restarts are run by hand on the host, which
  means deployments are not reproducible from a commit alone and there is no automated gate on
  `pnpm test:deployment` before a release.
- **Single-instance only.** The rate limiter, execution queue and socket presence are in-process, so
  the deployment cannot be scaled horizontally as it stands.
- **Piston is unmanaged.** It is installed outside the repository, its runtimes are persisted on a
  host volume, and reinstalling the host means reinstalling the language packages.
- **Historical submission data.** Submissions recorded before server-side judging cannot be
  distinguished from verified ones. Whether to reset or re-judge development data is a separate
  decision.
- **Mocked UI sections.** Parts of the dashboard, community and resources views still use static
  payloads, as noted in [README.md](README.md). A green deployment does not mean every surface is
  live data.
