# RouterOptions

Options to initialize a [Router](Router.md) instance.

## 계층

- [`PathParserOptions`](../type-aliases/PathParserOptions.md)

  ↳ **`RouterOptions`**

## 속성

### end

• `Optional` **end**: `boolean`

Should the RegExp match until the end by appending a `$` to it.

**`Default Value`**

`true`

#### 다음에서 상속됨

PathParserOptions.end

___

### history

• **history**: [`RouterHistory`](RouterHistory.md)

History implementation used by the router. Most web applications should use
`createWebHistory` but it requires the server to be properly configured.
You can also use a _hash_ based history with `createWebHashHistory` that
does not require any configuration on the server but isn't handled at all
by search engines and does poorly on SEO.

#### 예제

```js
createRouter({
  history: createWebHistory(),
  // other options...
})
```

___

### linkActiveClass

• `Optional` **linkActiveClass**: `string`

Default class applied to active [RouterLink](../variables/RouterLink.md). If none is provided,
`router-link-active` will be applied.

___

### linkExactActiveClass

• `Optional` **linkExactActiveClass**: `string`

Default class applied to exact active [RouterLink](../variables/RouterLink.md). If none is provided,
`router-link-exact-active` will be applied.

___

### parseQuery

• `Optional` **parseQuery**: 

Custom implementation to parse a query. See its counterpart,
[stringifyQuery](RouterOptions.md#stringifyquery).

#### 예제

Let's say you want to use the [qs package](https://github.com/ljharb/qs)
to parse queries, you can provide both `parseQuery` and `stringifyQuery`:
```js
import qs from 'qs'

createRouter({
  // other options...
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
})
```

___

### routes

• **routes**: readonly [`RouteRecordRaw`](../type-aliases/RouteRecordRaw.md)[]

Initial list of routes that should be added to the router.

___

### scrollBehavior

• `Optional` **scrollBehavior**: [`RouterScrollBehavior`](RouterScrollBehavior.md)

Function to control scrolling when navigating between pages. Can return a
Promise to delay scrolling. Check ScrollBehavior.

#### 예제

```js
function scrollBehavior(to, from, savedPosition) {
  // `to` and `from` are both route locations
  // `savedPosition` can be null if there isn't one
}
```

___

### sensitive

• `Optional` **sensitive**: `boolean`

Makes the RegExp case-sensitive.

**`Default Value`**

`false`

#### 다음에서 상속됨

PathParserOptions.sensitive

___

### strict

• `Optional` **strict**: `boolean`

Whether to disallow a trailing slash or not.

**`Default Value`**

`false`

#### 다음에서 상속됨

PathParserOptions.strict

___

### stringifyQuery

• `Optional` **stringifyQuery**: 

Custom implementation to stringify a query object. Should not prepend a leading `?`.
[parseQuery](RouterOptions.md#parsequery) counterpart to handle query parsing.
