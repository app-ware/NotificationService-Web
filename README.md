# NotificationService-Web

Delivers push notifications and emails for NurseryServices-Web. It has **no database**: the
Nursery API resolves who gets what and publishes ready-to-send jobs to RabbitMQ; this service
only turns them into FCM / APN / Resend calls.

```
Nursery API ──emit('push.send')──▶ push_queue  ──▶ PushModule ──▶ FCM (legacy project) / APN
            ──emit('email.send')─▶ email_queue ──▶ MailModule ──▶ Resend (layout templates/<id>.hbs)
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
  config/rabbitmq/              # queue CONTRACT (identical in Nursery), consumer options, DLQ topology
  config/logger/                # pino
  contracts/                    # PushJob, EmailJob - CONTRACT, identical in Nursery
  common/rmq-job.util.ts        # manual ack / dead-letter wrapper for every handler
  modules/push/                 # push.send → FcmService / ApnService
  modules/mail/                 # email.send → MailTemplateService (Handlebars) → Resend
  health.controller.ts          # GET /health
keys/                           # credentials, gitignored - see keys/README.md
```

## Run locally

1. `cp .env.example .env` and fill it in; put the credentials in `keys/` (see `keys/README.md`).
2. RabbitMQ: `docker compose up rabbitmq` from NurseryServices-Web (management UI on :15672).
3. `npm install && npm run start:dev`

To test without the Nursery API, publish to `push_queue` / `email_queue` from the management UI
(Queues → the queue → Publish message) with a body like:

```json
{ "pattern": "push.send", "data": { "jobId": "test-1", "createdAt": "2026-10-23T10:00:00Z", "centerId": 1, "notificationType": 2, "audience": "parent", "message": "Hello", "recipients": [{ "deviceToken": "<token>", "userId": "<parentId>", "deviceType": 2 }] } }
```

Set the message property `content_type` = `application/json`.

## Behavior

- **Ack / dead-letter**: a handler acks when the job completes - including jobs where some
  tokens/addresses were rejected (those are logged, not retried). Anything unexpected (bad
  config, network failure, malformed job) is nacked without requeue → `<queue>.dlq`.
- **At-least-once**: a crash after sending but before the ack redelivers the job. Email is
  protected by Resend's idempotency key (= jobId); a push could be delivered twice.
- **Logs**: one line per job tagged with `jobId` (the same id Nursery logs when publishing).
  Payloads are never logged - email jobs carry parent PINs.
- **Email layouts**: `src/modules/mail/templates/<id>.hbs`. A missing, null or unknown
  `templateId` falls back to `1.hbs`. `bodyHtml` is inserted unescaped; all other variables
  are escaped.
