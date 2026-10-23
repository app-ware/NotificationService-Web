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

# Firebase service account, APN .p8 keys and apn.json are NOT baked into the image -
# mount them read-only at /usr/src/app/keys (see keys/README.md).
EXPOSE 4448

CMD ["node", "dist/main.js"]