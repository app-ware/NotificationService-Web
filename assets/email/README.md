# assets/email/

Store badges for the email layouts, taken from the legacy credential email (`ICareService/scripts/`
in the legacy WCF service). Their old public URLs (`https://app-ware.com/ICareService/scripts/*.png`)
now redirect to the app-ware.com homepage, so they need a new public home - the file server.

| File | Env var once hosted |
|---|---|
| `AppStore.png` | `MAIL_APP_STORE_BADGE_URL` |
| `GooglePlay.png` | `MAIL_GOOGLE_PLAY_BADGE_URL` |

Until **both** are set the layouts show plain text link buttons instead, so an email never shows a
broken image. The badges only change how the links look - the links themselves (App Store /
Google Play pages) work either way.

The iCare logo is not here: the layouts use the one the portal already serves
(`https://icare-portal.com/en/assets/images/logos/LogoHQ.png`, overridable with `MAIL_LOGO_URL`).
PNG, not the portal's WebP - Outlook doesn't render WebP.

Email clients only load absolute public HTTPS URLs: no data URIs, nothing on a private network.
