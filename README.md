# Landscape

The goal of this project is to learn full-stack and devops skills while also building a website for a local business.

## Development

Follow these steps to get the full stack running locally from a fresh clone or fork.

### Prerequisites

- [Node.js (v20+)](https://nodejs.org/en)
- [Docker](https://www.docker.com/)

### Setup Development Environment

Follow these steps to setup your development environment.

#### 1. Install Dependencies

Run this from the root of the monorepo to install packages for all workspaces simultaneously:

```sh
npm install
```

> [!NOTE]
> If your host machine is running a newer version of Node (e.g., v25+), you may see an **npm warn EBADENGINE** regarding the cms workspace. You can safely ignore this warning. The Strapi backend is isolated inside a Docker container with a strictly controlled Node version, so the host machine's version mismatch will not affect it.

#### 2. Configure Environment Variables

You need to setup the environment for the backend CMS. From the monorepo root, copy the template:

```sh
cp apps/cms/.env.example apps/cms/.env
```

> [!NOTE]
> The default values in `apps/cms/.env.example` are pre-configured to work out-of-the-box for local development. No manual changes are required.

#### 3. Start the Backend (Strapi + PostgreSQL)

We run the backend and database inside Docker to ensure environment parity across all developer machines. Start the containers:

```sh
npm run dev:cms
```

*(Leave this terminal running to view the backend logs. To stop the server later, press `Ctrl + C`)*

**Strapi Admin Panel:** http://localhost:1337/admin

> [!NOTE]
> On your first boot, Strapi will prompt you to register a local Admin user.

##### Data Workflow (Worktrees & Production)

We use a single shared local database across all git worktrees (configured via `COMPOSE_PROJECT_NAME=landscape_local`). This means your local dummy data persists when switching branches. Later in the project, we will use `strapi transfer` to periodically pull real content from the production AWS server down to our local machines.

#### 4. Start the Frontend (Next.js)

Open a second terminal tab or split pane at the monorepo root and start the web app:

```sh
npm run dev:web
```

*(Leave this terminal running to view the frontend logs. To stop the server later, press `Ctrl + C`)*

**Web App:** http://localhost:3000

### Test Production Build

If you want to test the production build locally, do **Step 1** from **Setup Development Environment**, then do the following steps.

#### 1. Configure Environment Variables

You need to set up the production environment variables. From the monorepo root, copy the template:

```sh
cp .env.example .env
```

#### 2. Start the Backend and Frontend (Strapi + PostgreSQL + NextJS)

Build all containers and run them in the background:

```sh
npm run prod:up
```

Once the containers are running, you can access the applications at:
- Web App: http://localhost:3000
- Strapi Admin Panel: http://localhost:1337/admin

#### 3. Stop the Backend and Frontend (Strapi + PostgreSQL + NextJS)

When you're done testing, teardown all containers:

```sh
docker compose -f compose.prod.yml down
```

> [!WARNING]  
> **To completely reset the production database locally:** run `docker compose -f compose.prod.yml down -v`. The `-v` flag permanently deletes the database volume. **NEVER** run the `-v` flag on the actual production server.
