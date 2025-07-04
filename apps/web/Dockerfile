FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY turbo.json ./

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter "@repo/db" run build \
    && pnpm --filter "@repo/db" exec prisma generate

RUN pnpm --filter "web" run build


EXPOSE 3000

CMD ["pnpm", "--filter", "web", "start"]

