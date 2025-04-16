FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

WORKDIR /app/packages/db
RUN pnpm prisma generate

WORKDIR /app/apps/submission-webhook

EXPOSE 8080

CMD ["pnpm", "dev"]