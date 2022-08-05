# createWebHashHistory

▸ **createWebHashHistory**(`base?`): [`RouterHistory`](../interfaces/RouterHistory.md)

Creates a hash history. Useful for web applications with no host (e.g. `file://`) or when configuring a server to
handle any URL is not possible.

### 예제

```js
// at https://example.com/folder
createWebHashHistory() // gives a url of `https://example.com/folder#`
createWebHashHistory('/folder/') // gives a url of `https://example.com/folder/#`
// if the `#` is provided in the base, it won't be added by `createWebHashHistory`
createWebHashHistory('/folder/#/app/') // gives a url of `https://example.com/folder/#/app/`
// you should avoid doing this because it changes the original url and breaks copying urls
createWebHashHistory('/other-folder/') // gives a url of `https://example.com/other-folder/#`

// at file:///usr/etc/folder/index.html
// for locations with no `host`, the base is ignored
createWebHashHistory('/iAmIgnored') // gives a url of `file:///usr/etc/folder/index.html#`
```

### 파라미터

| 이름 | 타입 | 설명 |
| :------ | :------ | :------ |
| `base?` | `string` | optional base to provide. Defaults to `location.pathname + location.search` If there is a `<base>` tag in the `head`, its value will be ignored in favor of this parameter **but note it affects all the history.pushState() calls**, meaning that if you use a `<base>` tag, it's `href` value **has to match this parameter** (ignoring anything after the `#`). |
