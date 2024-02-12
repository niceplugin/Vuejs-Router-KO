# 다양한 히스토리 모드 %{#different-history-modes}%

<VueSchoolLink
href="https://vueschool.io/lessons/history-mode"
title="Learn about the differences between Hash Mode and HTML5 Mode"
/>

라우터 인스턴스를 생성할 때 `history` 옵션을 사용하여, 다양한 히스토리 모드 중에서 하나를 적용할 수 있습니다.

## 해시 모드 %{#hash-mode}%

해시 모드는 `createWebHashHistory()`를 사용하여 적용합니다:

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```

내부적으로 전달되는 실제 URL 앞에 해시 문자(`#`)를 사용합니다. URL의 이 섹션은 서버로 전송되지 않으므로 서버의 특별한 조치가 필요하지 않습니다. **그러나 그것은 SEO에 나쁜 영향을 미치므로**, 이것이 문제가 된다면 HTML5 모드를 사용해야 합니다.

## HTML5 모드 %{#html5-mode}%

HTML5 모드는 `createWebHashHistory()`를 사용하여 적용하며, 권장하는 모드입니다:

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

`createWebHistory()`를 사용할 때 URL은 `https://example.com/user/id`와 같이 "정상"으로 보입니다.

하지만 여기에 문제가 있습니다. 우리 앱은 적절한 서버 구성이 없는 클라이언트 사이드 SPA이므로, 사용자가 브라우저에서 바로 `https://example.com/user/id`에 접근하면 404 오류가 발생합니다.

문제를 해결하려면 서버에 간단한 포괄 대체 라우트를 추가하기만 하면 됩니다. URL 접근이 배포된 정적 자산과 일치하지 않으면, 앱의 `index.html` 페이지를 제공해야 합니다.

## 메모리 모드 %{#memory-mode}%

메모리 모드는 브라우저 환경을 고려하지 않습니다. 따라서 URL과 상호작용하지 않으며, **자동으로 네비게이션 초기화를 트리거하지 않습니다**. 이것은 Node.js 환경의 SSR에 완벽합니다. `createMemoryHistory()`를 사용하여 적용하며, `app.use(router)`를 호출한 후 **반드시 네비게이션 초기화를 해야 합니다**.

```js
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    //...
  ],
})
```

브라우저에서 이 모드를 사용할 수 있지만 **히스토리가 없으므로**, 권장되지 않으니 유의해야 합니다. 다시말해 "뒤로" 또는 "앞으로" 이동할 수 없습니다.

## 서버 구성 예제 %{#example-server-configurations}%

참고: 아래 예제들은 루트 폴더에서 앱을 제공한다고 가정합니다. 루트 폴더 대신 하위 폴더에 배포하는 경우, [Vue CLI의 `publicPath` 옵션](https://cli.vuejs.org/config/#publicpath)과 [라우터의 `base` 속성](/api/interfaces/Router.md#createWebHistory)을 설정해야 합니다. 또한 예제를 조정해야 합니다(예: `RewriteBase /`를 `RewriteBase /name-of-your-subfolder/`로 교체).

### Apache

```
<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

`mod_rewrite` 대신 [`FallbackResource`](https://httpd.apache.org/docs/2.4/mod/mod_dir.html#fallbackresource)를 사용할 수도 있습니다.

### nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 네이티브 Node.js %{#native-node-js}%

```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http
  .createServer((req, res) => {
    fs.readFile('index.html', 'utf-8', (err, content) => {
      if (err) {
        console.log('"index.html" 파일을 열 수 없습니다.')
      }

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })

      res.end(content)
    })
  })
  .listen(httpPort, () => {
    console.log('서버 수신 대기 중: http://localhost:%s', httpPort)
  })
```

### Node.js에서 Express %{#express-with-node-js}%

Node.js의 Express 경우, [connect-history-api-fallback 미들웨어](https://github.com/bripkens/connect-history-api-fallback) 사용을 고려하십시오.

### Internet Information Services (IIS)

1. [IIS UrlRewrite](https://www.iis.net/downloads/microsoft/url-rewrite) 설치
2. 다음을 사용하여 사이트의 루트 디렉터리에 `web.config` 파일을 만듭니다:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
          <match url="(.*)" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

### Caddy v2

```
try_files {path} /
```

### Caddy v1

```
rewrite {
    regexp .*
    to {path} /
}
```

### Firebase hosting

`firebase.json`의 호스팅 부분을 다음과 같이 수정:

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Netlify

`_redirects` 파일을 만들어 배포될 파일에 포함:

```
/* /index.html 200
```

vue-cli, nuxt 및 vite 프로젝트에서 이 파일은 일반적으로 `static` 또는 `public`이라는 폴더에 있습니다.

[Netlify 문서](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps)에서 문법에 대해 자세히 알아볼 수 있습니다. 리디렉션을 다른 Netlify 기능과 결합하기 위해 [`netlify.toml`을 생성](https://docs.netlify.com/configure-builds/file-based-configuration/)할 수도 있습니다.

### Vercel

프로젝트의 루트 디렉터리에 다음과 같은 `vercel.json` 파일을 만듭니다:

```json
{
  "rewrites": [{ "source": "/:path*", "destination": "/index.html" }]
}
```

## 경고 %{#caveat}%

Vue Router를 사용하여 만든 클라이언트 사이드 SPA는 모든 라우트에 `index.html`을 제공하므로, 서버는 더 이상 찾을 수 없는 페이지에 대해서 404 오류를 반환하지 않습니다. 이 문제를 해결하려면, 정의되지 않은 모든 라우트르 포괄할 수 있는 "포괄 라우트"를 구현하여, 404 페이지를 표시해야 합니다.

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:pathMatch(.*)', component: NotFoundComponent }],
})
```

또는 Node.js 서버를 사용하는 경우, 서버 측 라우터를 사용하여 수신되는 URL을 매칭하고, 매칭되는 라우트가 없으면 404로 응답하는 폴백을 구현할 수 있습니다. 자세한 내용 참고: [Vue SSR 문서](https://vuejs.kr/guide/scaling-up/ssr.html)
