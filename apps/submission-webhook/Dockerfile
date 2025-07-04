FROM node:20-alpine

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace metadata first (better layer caching)
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./

# Copy the full repository
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build packages & generate Prisma client
RUN pnpm --filter "@repo/db" run build \
    && pnpm --filter "@repo/db" exec prisma generate \
    && pnpm --filter "submission-webhook" run build

EXPOSE 8080

# Start the compiled server
CMD ["pnpm", "--filter", "submission-webhook", "start"]