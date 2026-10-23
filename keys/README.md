# keys/

Push credentials. Everything here except this file and `apn.example.json` is gitignored and
excluded from the Docker image - mount the folder read-only at `/usr/src/app/keys`.

| File | Env var | Source |
|---|---|---|
| `serviceAccountKey.json` | `FIREBASE_SERVICE_ACCOUNT_PATH` | Legacy `Notification-Server-Web/key/serviceAccountKey.json` (the legacy Firebase project installed apps registered with) |
| `apn.json` | `APN_CONFIG_PATH` | Copy `apn.example.json`; key ids / team ids come from the `apnOptions*` objects in legacy `server.js` |
| `AuthKey_<keyId>.p8` | referenced from `apn.json` | Legacy `Notification-Server-Web/key/` on the production server |

## `apn.json`

- `default` is used for any bundle id not listed under `bundles` - in legacy that's the iCare
  key (`apnOptionsICare`), which also covers `com.icare.teachers`.
- `keyFile` is relative to the folder `apn.json` sits in.
- A missing `.p8` only fails the iOS sends for the bundles that use it - they're reported as
  per-token failures in the push job's log line, the rest of the job still goes out.
