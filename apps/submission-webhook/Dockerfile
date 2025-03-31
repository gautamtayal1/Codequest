FROM node:20-alpine

WORKDIR /src

RUN npm install -g pnpm

COPY ../../pnpm-lock.yaml ./pnpm-lock.yaml 
COPY ./package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 8080

CMD [ "pnpm", "run", "dev" ]