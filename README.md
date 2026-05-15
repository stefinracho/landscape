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

You need to setup the environment for the backend CMS. From the monorepo root, navigate to the CMS and copy the template:

```sh
cd apps/cms
```

```sh
cp .env.example .env
```

> [!NOTE]
> The default values in `.env.example` are pre-configured to work out-of-the-box for local development. No manual changes are required.

#### 3. Start the Backend (Strapi + PostgreSQL)

We run the backend and database inside Docker to ensure environment parity across all developer machines. While still inside the `apps/cms` directory, start the containers:

```sh
docker compose up -d
```

- Strapi Admin Panel: http://localhost:1337/admin

> [!NOTE]
> On your first boot, Strapi will prompt you to register a local Admin user.

#### 4. Start the Frontend (Next.js)

Open a new terminal tab at the monorepo root. Because we are using npm workspaces, you can target the web app directly from the root without needing to change directories:

```sh
npm run dev --workspace=web
```

- Web App: http://localhost:3000

### Teardown Development Environment

Follow these steps to teardown your development environment.

#### Stop the Backend (Strapi + PostgreSQL)

To stop the backend and remove the containers, run the following from the `apps/cms` directory:

```sh
docker compose down
```

#### Stop the Frontend (Next.js)

To stop the frontend, simply press `Ctrl + C` in your terminal.
