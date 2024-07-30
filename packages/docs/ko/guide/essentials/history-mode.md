# 다양한 히스토리 모드 %{#Different-History-modes}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/history-mode"
  title="Learn about the differences between Hash Mode and HTML5 Mode"
/>

라우터 인스턴스를 생성할 때 `history` 옵션을 통해 다양한 히스토리 모드 중에서 선택할 수 있습니다.

## 해시 모드 %{#Hash-Mode}%

해시 히스토리 모드는 `createWebHashHistory()`로 생성됩니다:

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```

이 모드는 실제 URL 앞에 해시 문자(`#`)를 사용합니다. URL의 이 부분은 서버로 전송되지 않기 때문에 서버 수준에서 특별한 처리가 필요하지 않습니다. **그러나 SEO에 부정적인 영향을 미칩니다**. 이것이 우려되는 경우, HTML5 히스토리 모드를 사용하세요.

## HTML5 모드 %{#HTML5-Mode}%

HTML5 모드는 `createWebHistory()`로 생성되며, 권장되는 모드입니다:

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

`createWebHistory()`를 사용할 때, URL은 `https://example.com/user/id`처럼 "정상적으로" 보일 것입니다.

하지만 여기에는 문제가 있습니다. 우리의 앱은 단일 페이지 클라이언트 사이드 애플리케이션이기 때문에, 적절한 서버 설정 없이 유저가 `https://example.com/user/id`에 직접 접근하면 404 오류가 발생할 것입니다.

이 문제를 해결하려면 서버에 간단한 catch-all 폴백 라우트를 추가하기만 하면 됩니다. URL이 어떤 정적 자산과도 일치하지 않으면, `index.html` 페이지를 제공하도록 하면 됩니다.

## 메모리 모드 %{#Memory-mode}%

메모리 히스토리 모드는 브라우저 환경을 전제로 하지 않기 때문에 URL과 상호 작용하지 않으며 초기 탐색을 자동으로 트리거하지도 않습니다. 따라서 Node 환경 및 SSR에 적합합니다. `createMemoryHistory()`로 생성되며, `app.use(router)`를 호출한 후 초기 탐색을 수동으로 push 해야 합니다.

```js
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    //...
  ],
})
```

권장되지는 않지만, 이 모드를 브라우저 애플리케이션 내에서 사용할 수는 있습니다. 하지만 **히스토리가 없을 것**이라는 점을 주의해야 합니다. 이것은 *뒤로가기* 또는 *앞으로가기*가 불가능하다는 것을 의미합니다.

## 서버 구성 예제 %{#Example-Server-Configurations}%

**참고**: 다음 예제들은 애플리케이션을 루트 폴더에서 제공한다고 가정합니다. 서브폴더에 배포할 경우, [Vue CLI의 `publicPath` 옵션](https://cli.vuejs.org/config/#publicpath)과 관련된 [라우터의 `base` 프로퍼티](../../api/interfaces/Router.md#createWebHistory)를 사용해야 합니다. 또한 아래 예제에서 루트 폴더 대신 서브폴더를 사용하도록 조정해야 합니다 (예: `RewriteBase /`를 `RewriteBase /name-of-your-subfolder/`로 변경).

### Apache %{#Apache}%

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

### nginx %{#nginx}%

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 네이티브 Node.js %{#Native-Node-js}%

```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http
  .createServer((req, res) => {
    fs.readFile('index.html', 'utf-8', (err, content) => {
      if (err) {
        console.log('We cannot open "index.html" file.')
      }

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })

      res.end(content)
    })
  })
  .listen(httpPort, () => {
    console.log('Server listening on: http://localhost:%s', httpPort)
  })
```

### Express + Node.js %{#Express-with-Node-js}%

Node.js/Express의 경우, [connect-history-api-fallback 미들웨어](https://github.com/bripkens/connect-history-api-fallback)를 사용을 고려해볼 수 있습니다.

### Internet Information Services (IIS) %{#Internet-Information-Services-IIS-}%

1. [IIS UrlRewrite](https://www.iis.net/downloads/microsoft/url-rewrite)를 설치합니다.
2. 사이트의 루트 디렉토리에 다음과 같이 `web.config` 파일을 생성합니다:

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

`firebase.json`: 파일에 다음을 추가하세요:

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

다음은 배포 파일에 포함되는 `_redirects` 파일을 생성하는 방법입니다:

```
/* /index.html 200
```

vue-cli, nuxt, vite 프로젝트에서 이 파일은 일반적으로 `static` 또는 `public` 폴더 아래에 위치합니다.

[Netlify 문서](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps)에서 문법에 대한 자세한 정보를 찾을 수 있습니다. 또한 [`netlify.toml` 파일을 생성](https://docs.netlify.com/configure-builds/file-based-configuration/)하여 다른 Netlify 기능과 함께 리다이렉션을 결합할 수 있습니다.

### Vercel

프로젝트의 루트 디렉토리에 다음과 같이 `vercel.json` 파일을 생성하세요:

```json
{
  "rewrites": [{ "source": "/:path*", "destination": "/index.html" }]
}
```

## 추가 정보 %{#Caveat}%

이 작업에는 한 가지 주의할 점이 있습니다. 모든 찾을 수 없는 경로가 이제 `index.html` 파일을 제공하므로 서버는 더 이상 404 오류를 보고하지 않습니다. 이 문제를 해결하려면 Vue 앱 내에서 catch-all 라우트를 구현하여 404 페이지를 표시해야 합니다:

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:pathMatch(.*)', component: NotFoundComponent }],
})
```

또는 Node.js 서버를 사용하는 경우 서버 측에서 라우터를 사용하여 들어오는 URL을 매칭하고 매칭되는 경로가 없으면 404로 응답하여 이 문제를 해결할 수 있습니다. 자세한 내용은 [Vue 서버 사이드 렌더링 문서](https://vuejs.org/guide/scaling-up/ssr.html)를 참고하세요.
