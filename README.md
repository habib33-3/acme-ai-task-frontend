# Acme AI Job Task Frontend

This is the frontend application for the **Acme AI Job Task**. It is built with **Vite, React, and Tailwind CSS**.

## Prerequisites

- Node.js 24+
- pnpm
- Docker and Docker Compose (optional)

## Local Development

Clone the repository:

```bash
git clone https://github.com/habib33-3/acme-ai-task-frontend.git
cd acme-ai-task-frontend
```

Install dependencies:

```bash
pnpm install
```

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start the development server:

```bash
pnpm dev
```

The application will be available at:

http://localhost:5173

## Docker

To run the frontend using Docker Compose:

```bash
docker compose up
```

The application will be available at:

http://localhost:80

To stop the containers:

```bash
docker compose down
```
