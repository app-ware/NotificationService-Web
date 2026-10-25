# assets/email/

Images the email layouts link to, taken from the legacy credential email
(`ICareService/scripts/` in the legacy WCF service). Their old public URLs
(`https://app-ware.com/ICareService/scripts/*.png`) now redirect to the homepage, so they need a
new public home.

| File | Used for |
|---|---|
| `IcareLogo.png` | iCare logo at the top of the `classic` layout |
| `AppStore.png` | App Store badge (both layouts) |
| `GooglePlay.png` | Google Play badge (both layouts) |

Upload these three files to any public HTTPS location, keep the file names, and set
`MAIL_ASSETS_BASE_URL` to that folder (e.g. `https://files.example.com/email`). Until it is set
the layouts render text instead - an "iCare" wordmark and plain store link buttons - so an email
never shows a broken image. Email clients only load absolute public URLs: no data URIs, no
links to a private network.
