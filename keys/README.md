# keys/

**Local input only** - the service never reads this folder. `npm run encode-credentials`
turns it into two env values (`FIREBASE_SERVICE_ACCOUNT_B64`, `APN_CONFIG_B64`) and writes them
into `.env`; on a server those two lines go into `/opt/icare/backend/.env.notification`.
Everything here except this file and `apn.example.json` is gitignored.

| File | Source |
|---|---|
| `serviceAccountKey.json` | Legacy `Notification-Server-Web/key/serviceAccountKey.json` (the legacy Firebase project installed apps registered with) |
| `apn.json` | Copy `apn.example.json`; key ids / team ids come from the `apnOptions*` objects in legacy `server.js` |
| `AuthKey_<keyId>.p8` | Legacy `Notification-Server-Web/key/` on the production server |

## `apn.json`

- `default` is used for any bundle id not listed under `bundles` - in legacy that's the iCare
  key (`apnOptionsICare`), which also covers `com.icare.teachers`.
- `keyFile` is the `.p8` file name in this folder; the script inlines its contents.
- A bundle whose `.p8` is missing is left out (the script warns) and falls back to the default
  key - its iOS sends fail per token until the key is added and the script re-run.
