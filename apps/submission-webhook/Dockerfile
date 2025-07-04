FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY turbo.json ./

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter "@repo/db" run build \
    && pnpm --filter "@repo/db" exec prisma generate \
    && pnpm --filter "submission-webhook" run build

EXPOSE 8080

CMD ["pnpm", "--filter", "submission-webhook", "start"]