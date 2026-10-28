# NotificationService-Web

Delivers push notifications and emails for NurseryServices-Web. It has **no database**: the
Nursery API resolves who gets what and publishes ready-to-send jobs to RabbitMQ; this service
only turns them into FCM / APN / Resend calls.

```
Nursery API ──emit('push.send')──▶ push_queue  ──▶ PushModule ──▶ FCM (legacy project) / APN
            ──emit('email.send')─▶ email_queue ──▶ MailModule ──▶ Resend (templates/layouts/<layoutKey>.hbs)
                                        │ nack (unexpected failure)
                                        ▼
                     notifications.dlx ──▶ push_queue.dlq / email_queue.dlq
```

Push uses the **legacy** Firebase project and APN keys on purpose: older app builds that
can't be updated only have tokens for those.

## Layout

```
src/
  main.ts                       # create app → connectRabbitConsumers → listen
  config/rabbitmq/              # rabbitmq.constants.ts + contracts/ (PushJob, EmailJob) are the CONTRACT,
                                #   identical in Nursery; plus consumer options and DLQ topology
  config/logger/                # pino
  common/rmq-job.util.ts        # manual ack / dead-letter wrapper for every handler
  modules/push/                 # push.send → FcmService / ApnService
  modules/mail/                 # email.send → MailTemplateService (Handlebars) → Resend
  health.controller.ts          # GET /health
keys/                           # LOCAL credential input for `npm run encode-credentials`, gitignored
scripts/encode-credentials.mjs  # keys/ → FIREBASE_SERVICE_ACCOUNT_B64 + APN_CONFIG_B64 env lines
```

## Run locally

1. `cp .env.example .env`, fill in Resend; put the credentials in `keys/` (see `keys/README.md`)
   and run `npm run encode-credentials` - it writes the two push lines into `.env`.
2. RabbitMQ: `docker compose up rabbitmq` from NurseryServices-Web (management UI on :15672).
3. `npm install && npm run start:dev`

To test without the Nursery API, publish to `push_queue` / `email_queue` from the management UI
(Queues → the queue → Publish message) with a body like:

```json
{ "pattern": "push.send", "data": { "jobId": "test-1", "createdAt": "2026-10-23T10:00:00Z", "centerId": 1, "notificationType": 2, "audience": "parent", "message": "Hello", "recipients": [{ "deviceToken": "<token>", "userId": "<parentId>", "deviceType": 2 }] } }
```

Set the message property `content_type` = `application/json`.

## Deploy

Image: `ghcr.io/app-ware/notificationservice`, built by `.github/workflows/deploy.yml` (same
pipeline shape as NurseryServices-Web): push to `develop` → tag `develop` → **staging**; push to
`main` → tag `latest`. **Production deploy is manual only** (Actions → Run workflow →
`production`) while production push stays on the legacy pm2 server. The image tag on the server
comes from `NOTIFICATION_IMAGE_TAG`. The service itself is declared in **NurseryServices-Web's
`docker-compose.prod.yml`** - the compose file the servers run from `/opt/icare/backend`.

One-time server prep (per server, before the first deploy) - **one file, nothing else**:

```bash
# On your machine: produce the two push lines (needs keys/ filled in)
npm run encode-credentials -- --env .env.notification   # gitignored

# On the server: /opt/icare/backend/.env.notification with exactly these 4 lines
#   FIREBASE_SERVICE_ACCOUNT_B64=...   (from the generated file)
#   APN_CONFIG_B64=...                 (from the generated file)
#   RESEND_API_KEY=re_...
#   MAIL_FROM=iCare Portal <noreply@icare-portal.com>
chmod 600 /opt/icare/backend/.env.notification
```

`RABBITMQ_URL` is set by the compose file from the server's `RABBITMQ_USER`/`RABBITMQ_PASS` - not
needed in `.env.notification`. `PORT` defaults to 4448.
GitHub setup in this repo (same as NurseryServices-Web): environments `staging` and `production`
holding `STAGING_HOST`/`STAGING_USER`/`STAGING_SSH_KEY` (+ optional `STAGING_PORT`) and
`PROD_HOST`/`PROD_USER`/`PROD_SSH_KEY` (+ optional `PROD_PORT`), plus `GHCR_TOKEN` with read
access to this package.

Order: the Nursery change (compose entry + `PUSH_TRANSPORT=queue` in staging's `.env`) must be on
the server before this workflow's first run, otherwise `docker compose pull notification-service`
finds no such service.

## Internal HTTP

Besides `GET /health`, one internal route: `POST /mail/preview` (`MailPreviewController`) - body
`{ design, variables }` (the same shapes as an `EmailJob`) → `{ html, design }`, rendered by the same
layouts as a real send; nothing is queued or sent. Used by Nursery's Settings email preview.
Guarded by `X-Internal-API-Key` = `NOTIFICATION_SERVICE_API_KEY` (`InternalApiKeyGuard`,
constant-time compare); without the key configured the route answers 503 (fail closed). No public
port - Nursery calls `http://notification-service:4448` inside the Docker network.

## Behavior

- **Ack / dead-letter**: a handler acks when the job completes - including jobs where some
  tokens/addresses were rejected (those are logged, not retried). Anything unexpected (bad
  config, network failure, malformed job) is nacked without requeue → `<queue>.dlq`.
- **At-least-once**: a crash after sending but before the ack redelivers the job. Email is
  protected by Resend's idempotency key (= jobId); a push could be delivered twice.
- **Logs**: one line per job tagged with `jobId` (the same id Nursery logs when publishing).
  Payloads are never logged - email jobs carry parent PINs.
- **Email layouts**: `src/modules/mail/templates/layouts/<layoutKey>.hbs` - `classic` (port of
  the legacy credential email) and `modern`; the list is `MAIL_LAYOUTS` in the contract. A job's
  `design` picks the layout, `theme` (light/dark), `language` (en/ar - Arabic renders
  right-to-left), `accentColor` (#rrggbb) and the logo / store-link toggles; anything missing or
  invalid falls back to classic / light / en / brand blue / shown (`mail-design.ts`).
  **Nursery sends data, never HTML**: every variable is escaped; `bodyText` (the center's
  message) is escaped and keeps its line breaks. Images: the iCare logo defaults to the one the portal already serves; the store badges come
  from `MAIL_APP_STORE_BADGE_URL` / `MAIL_GOOGLE_PLAY_BADGE_URL` (`assets/email/README.md`) and fall
  back to text buttons; links go to the stores and to the portal (`MAIL_PORTAL_URL`). Jobs from an older
  Nursery (numbered `templateId`, text in `bodyHtml`) still render.
- **Fixed templates** (2026-10-27): a job's `template` picks which email it is - missing/unknown =
  `parent-credentials` (the layouts above). `user-invite` (`src/modules/mail/templates/user-invite.hbs`)
  is the "set your password" email for a new center user: one design based on `modern`, not
  editable - `design.layoutKey` and the store links are ignored, while the center's `language`,
  `theme`, `accentColor` and logo choice apply. Variables: `USER_INVITE_VARIABLES` in the contract;
  `setPasswordUrl` must be an absolute http(s) URL or the job is dead-lettered. The link carries a
  one-time token - like PINs, never logged.
