FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json package-lock.json* ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/i18n ./i18n
EXPOSE 4448

CMD ["node", "dist/main.js"]