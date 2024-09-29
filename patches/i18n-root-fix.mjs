import { cookieKey, defaultLocale, locales } from "../languages.config.mjs";
import path from "node:path";
import fs from "node:fs";

const targetFile = path.join(
  path.dirname(import.meta.dirname),
  ".output",
  "public",
  "index.html",
);
const allowedLocales = locales?.map((locale) => `'${locale.code}'`).join(",");

const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <script type="text/javascript">
      function getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
      };

      let langCode = getCookie('${cookieKey}');
      if (!langCode) {
        langCode = navigator.language || navigator.userLanguage;
        langCode = str.split(langCode)[0];
      }

      if (![${allowedLocales}].includes(langCode)) {
        langCode = '${defaultLocale}';
      }

      window.location.href = "/" + langCode;
    </script>
  </head>
  <body>
    If you are not redirected automatically, <a href="/${defaultLocale}">click here</a>.
  </body>
</html>
`;

fs.writeFileSync(targetFile, html, { encoding: "utf8", flag: "w" });
