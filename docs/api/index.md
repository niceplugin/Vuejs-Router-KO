# API 레퍼런스 {#api-reference}

::: danger
번역 진행 중에 있습니다.
:::

## `<router-link>` Props

### to

- **타입**: [`RouteLocationRaw`](#routelocationraw)
- **상세**:

  링크의 대상 경로를 나타내는 `string` 또는 [경로 위치 객체](#routelocationraw) 입니다.
  클릭하면 `to` 속성 값이 내부적으로 `router.push()`로 전달됩니다.

```html
<!-- 리터럴 문자열 -->
<router-link to="/home">홈</router-link>
<!-- 다음과 같이 랜더링 됨 -->
<a href="/home">홈</a>

<!-- `v-bind`로 자바스크립 표현식을 사용 -->
<router-link :to="'/home'">홈</router-link>

<!-- 위 코드와 같음 -->
<router-link :to="{ path: '/home' }">홈</router-link>

<!-- 이름이 있는 경로 ->
<router-link :to="{ name: 'user', params: { userId: '123' }}">유저</router-link>

<!-- 쿼리 사용: `/register?plan=private` -->
<router-link :to="{ path: '/register', query: { plan: 'private' }}">
  등록하기
</router-link>
```

### replace

- **타입**: `boolean`
- **기본 값**: `false`
- **상세**:

  `replace` 속성은 클릭 시 `router.push()` 대신 `router.replace()`가 호출되므로,
  탐색이 기록되지 않습니다.

```html
<router-link to="/abc" replace>ABC로 이동</router-link>
```

### active-class

- **타입**: `string`
- **기본 값**: `"router-link-active"`
- **상세**:

  링크가 활성화 되었을 때, 렌더링된 `<a>`에 적용할 클래스입니다.
  [`linkActiveClass`](#linkactiveclass)로 전역 구성을 한 경우,
  기본 값은 전역 구성 값 입니다.

### aria-current-value

- **타입**: `'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'`(`string`)
- **기본 값**: `"page"`
- **상세**:

  링크가 정확히 활성화되면 [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) 속성에 값이 전달됩니다.

### custom

- **타입**: `boolean`
- **기본 값**: `false`
- **상세**:

  `<router-link>`가 콘텐츠를 `<a>` 엘리먼트로 래핑하지 않아야 하는지 여부.

  커스텀 RouterLink를 생성하기 위해 [`v-slot`](#router-link-s-v-slot)을 사용할 때 유용합니다.
  기본적으로 `<router-link>`는 `v-slot`을 사용하는 경우에도 `<a>` 엘리먼트로 래핑된 콘텐츠를 렌더링하지만,
  `custom` 속성을 전달하면 래핑 기능이 비활성화됩니다.

- **예제**:

  ```html
  <router-link to="/home" custom v-slot="{ navigate, href, route }">
    <a :href="href" @click="navigate">{{ route.fullPath }}</a>
  </router-link>
  ```

  `<a href="/home">/home</a>`로 랜더링 됩니다.

  ```html
  <router-link to="/home" v-slot="{ route }">
    <span>{{ route.fullPath }}</span>
  </router-link>
  ```

  `<a href="/home"><span>/home</span></a>`로 랜더링 됩니다.

### exact-active-class

- **타입**: `string`
- **기본 값**: `"router-link-exact-active"`
- **상세**:

  링크가 정확히 활성화 되었을 때, 렌더링된 `<a>`에 적용할 클래스입니다.
  [`linkExactActiveClass`](#linkexactactiveclass)로 전역 구성을 한 경우,
  기본 값은 전역 구성 값 입니다.

## `<router-link>`'s `v-slot`

`<router-link>`는 [범위가 지정된 슬롯](https://v3-docs.vuejs-korea.org/guide/components/slots.html#scoped-slots)을 통해 저수준으로 커스텀된 것을 노출합니다.
이것은 주로 라이브러리 작성자를 대상으로 하는 고급 API이지만,
커스텀 컴포넌트로 경로 링크를 만들려는 개발자에게도 유용할 수 있습니다.

:::tip
`<router-link>`에 `custom` 속성을 사용해,
콘텐츠가 `<a>` 엘리먼트 내부에 래핑되지 않도록 하십시오.
:::

```html
<router-link
  to="/about"
  custom
  v-slot="{ href, route, navigate, isActive, isExactActive }"
>
  <MyNavLink :active="isActive" :href="href" @click="navigate">
    {{ route.fullPath }}
  </MyNavLink>
</router-link>
```

- `href`: 이동할 URL이며, `<a>` 엘리먼트의 `href` 속성 값이 되야 합니다.
  히스토리 모드를 구성할 때 `base`가 전달된 경우, 해당 값이 여기에 포함됩니다.
- `route`: 이동해야 할 경로가 정규화된 위치 객체.
- `navigate`: 탐색을 트리거하는 함수입니다.
  `router-link`처럼 **이벤트를 자동으로 prevent**하며,
  `ctrl` 또는 `cmd` + 클릭 시에도 이벤트를 prevent합니다.
- `isActive`: [active-class](#active-class)를 적용해야 하는 경우 `true`입니다.
- `isExactActive`: [exact-active-class](#exact-active-class)를 적용해야 하는 경우 `true`입니다.

### 예제: 외부 엘리먼트에 활성화된 클래스 적용하기

때로는 활성화된 클래스가 `<a>` 엘리먼트가 아닌,
외부 엘리먼트에게 적용되어야 할 수 있습니다.
이 경우 해당 엘리먼트를 `router-link` 내부에 래핑한 후,
`v-slot` 속성으로 링크를 생성하면 됩니다:

```html
<router-link
  to="/foo"
  custom
  v-slot="{ href, route, navigate, isActive, isExactActive }"
>
  <li
    :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
  >
    <a :href="href" @click="navigate">{{ route.fullPath }}</a>
  </li>
</router-link>
```

:::tip
`a` 엘리먼트에 `target="_blank"`를 추가하는 경우,
`@click="navigate"` 핸들러를 생략해야 합니다.
:::

## `<router-view>` Props

### name

- **타입**: `string`
- **기본 값**: `"default"`
- **상세**:

  `<router-view>`에 `name`이 있으면,
  일치하는 경로 레코드의 `components` 옵션 내 `name`에 해당하는 값의 컴포넌트를 렌더링합니다.

- **참고**: [가이드 - 이름이 있는 뷰](/guide/essentials/named-views.md)

### route

- **타입**: [`RouteLocationNormalized`](#routelocationnormalized)
- **상세**:

  ⚠️번역 보류

  A route location that has all of its component resolved (if any was lazy loaded) so it can be displayed.

## `<router-view>`'s `v-slot`

`<router-view>` exposes a `v-slot` API mainly to wrap your route components with `<transition>` and `<keep-alive>` components.

```html
<router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transition || 'fade'" mode="out-in">
    <keep-alive>
      <suspense>
        <template #default>
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
        </template>
        <template #fallback> Loading... </template>
      </suspense>
    </keep-alive>
  </transition>
</router-view>
```

- `Component`: VNodes to be passed to a `<component>`'s `is` prop.
- `route`: resolved normalized [route location](#routelocationnormalized).

Note you should be passing View components' props directly to the `<component>` rather than the `<router-view>`:

```html
<router-view v-slot="{ Component, route }">
  <component :is="Component" view-prop="value" />
</router-view>
```

## createRouter

Creates a Router instance that can be used by a Vue app. Check the [`RouterOptions`](#routeroptions) for a list of all the properties that can be passed.

**시그니처**:

```typescript
export declare function createRouter(options: RouterOptions): Router
```

### 파라미터

| Parameter | Type                            | Description                      |
| --------- | ------------------------------- | -------------------------------- |
| options   | [RouterOptions](#routeroptions) | Options to initialize the router |

## createWebHistory

Creates an HTML5 history. Most common history for single page applications. The application must be served through the http protocol.

**시그니처**:

```typescript
export declare function createWebHistory(base?: string): RouterHistory
```

### 파라미터

| Parameter | Type     | Description                                                                                                           |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| base      | `string` | optional base to provide. Useful when the application is hosted inside of a folder like `https://example.com/folder/` |

### 예제

```js
createWebHistory() // No base, the app is hosted at the root of the domain `https://example.com`
createWebHistory('/folder/') // gives a url of `https://example.com/folder/`
```

## createWebHashHistory

Creates a hash history. Useful for web applications with no host (e.g. `file://`) or when configuring a server to handle any URL isn't an option. **Note you should use [`createWebHistory`](#createwebhistory) if SEO matters to you**.

**시그니처**:

```typescript
export declare function createWebHashHistory(base?: string): RouterHistory
```

### 파라미터

| Parameter | Type     | Description                                                                                                                                                                                                                                                                                                                                                       |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| base      | `string` | optional base to provide. Defaults to `location.pathname + location.search`. If there is a `<base>` tag in the `head`, its value will be ignored in favor of this parameter **but note it affects all the history.pushState() calls**, meaning that if you use a `<base>` tag, its `href` value **has to match this parameter** (ignoring anything after the `#`) |

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

## createMemoryHistory

Creates a in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere. If the user is not on a browser context, it's up to them to replace that location with the starter location by either calling `router.push()` or `router.replace()`.

**시그니처**:

```typescript
export declare function createMemoryHistory(base?: string): RouterHistory
```

### 파라미터

| Parameter | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| base      | `string` | Base applied to all urls, defaults to '/' |

### 반환 값

A history object that can be passed to the router constructor

## NavigationFailureType

Enumeration with all possible types for navigation failures. Can be passed to [isNavigationFailure](#isnavigationfailure) to check for specific failures. **Never use any of the numerical values**, always use the variables like `NavigationFailureType.aborted`.

**시그니처**:

```typescript
export declare enum NavigationFailureType
```

### Members

| Member     | Value | Description                                                                                                                      |
| ---------- | ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| aborted    | 4     | An aborted navigation is a navigation that failed because a navigation guard returned `false` or called `next(false)`            |
| cancelled  | 8     | A cancelled navigation is a navigation that failed because a more recent navigation finished started (not necessarily finished). |
| duplicated | 16    | A duplicated navigation is a navigation that failed because it was initiated while already being at the exact same location.     |

## START_LOCATION

- **타입**: [`RouteLocationNormalized`](#routelocationnormalized)
- **상세**:

  Initial route location where the router is. Can be used in navigation guards to differentiate the initial navigation.

  ```js
  import { START_LOCATION } from 'vue-router'

  router.beforeEach((to, from) => {
    if (from === START_LOCATION) {
      // initial navigation
    }
  })
  ```

## Composition API

### onBeforeRouteLeave

Add a navigation guard that triggers whenever the component for the current location is about to be left. Similar to `beforeRouteLeave` but can be used in any component. The guard is removed when the component is unmounted.

**시그니처**:

```typescript
export declare function onBeforeRouteLeave(leaveGuard: NavigationGuard): void
```

#### 파라미터

| Parameter  | Type                                  | Description             |
| ---------- | ------------------------------------- | ----------------------- |
| leaveGuard | [`NavigationGuard`](#navigationguard) | Navigation guard to add |

### onBeforeRouteUpdate

Add a navigation guard that triggers whenever the current location is about to be updated. Similar to `beforeRouteUpdate` but can be used in any component. The guard is removed when the component is unmounted.

**시그니처**:

```typescript
export declare function onBeforeRouteUpdate(updateGuard: NavigationGuard): void
```

#### 파라미터

| Parameter   | Type                                  | Description             |
| ----------- | ------------------------------------- | ----------------------- |
| updateGuard | [`NavigationGuard`](#navigationguard) | Navigation guard to add |

### useLink

Returns everything exposed by the [`v-slot` API](#router-link-s-v-slot).

**시그니처**:

```typescript
export declare function useLink(props: RouterLinkOptions): {
  route: ComputedRef<RouteLocationNormalized & { href: string }>,
  href: ComputedRef<string>,
  isActive: ComputedRef<boolean>,
  isExactActive: ComputedRef<boolean>,
  navigate: (event?: MouseEvent) => Promise(NavigationFailure | void),
}
```

#### 파라미터

| Parameter | Type                | Description                                                                           |
| --------- | ------------------- | ------------------------------------------------------------------------------------- |
| props     | `RouterLinkOptions` | props object that can be passed to `<router-link>`. Accepts `Ref`s and `ComputedRef`s |

### useRoute

Returns the current route location. Equivalent to using `$route` inside templates. Must be called inside of `setup()`.

**시그니처**:

```typescript
export declare function useRoute(): RouteLocationNormalized
```

### useRouter

Returns the [router](#router-properties) instance. Equivalent to using `$router` inside templates. Must be called inside of `setup()`.

**시그니처**:

```typescript
export declare function useRouter(): Router
```

## TypeScript

Here are some of the interfaces and types used by Vue Router. The documentation references them to give you an idea of the existing properties in objects.

## Router Properties

### currentRoute

- **타입**: [`Ref<RouteLocationNormalized>`](#routelocationnormalized)
- **상세**:

  Current route location. Readonly.

### options

- **타입**: [`RouterOptions`](#routeroptions)
- **상세**:

  Original options object passed to create the Router. Readonly.

## Router Methods

### addRoute

Add a new [Route Record](#routerecordraw) as the child of an existing route. If the route has a `name` and there is already an existing one with the same one, it removes it first.

**시그니처**:

```typescript
addRoute(parentName: string | symbol, route: RouteRecordRaw): () => void
```

_파라미터_

| Parameter  | Type                                | Description                                             |
| ---------- | ----------------------------------- | ------------------------------------------------------- |
| parentName | `string \| symbol`                  | Parent Route Record where `route` should be appended at |
| route      | [`RouteRecordRaw`](#routerecordraw) | Route Record to add                                     |

### addRoute

Add a new [route record](#routerecordraw) to the router. If the route has a `name` and there is already an existing one with the same one, it removes it first.

**시그니처**:

```typescript
addRoute(route: RouteRecordRaw): () => void
```

_파라미터_

| Parameter | Type                                | Description         |
| --------- | ----------------------------------- | ------------------- |
| route     | [`RouteRecordRaw`](#routerecordraw) | Route Record to add |

:::tip
Note adding routes does not trigger a new navigation, meaning that the added route will not be displayed unless a new navigation is triggered.
:::

### afterEach

Add a navigation hook that is executed after every navigation. Returns a function that removes the registered hook.

**시그니처**:

```typescript
afterEach(guard: NavigationHookAfter): () => void
```

_파라미터_

| Parameter | Type                  | Description            |
| --------- | --------------------- | ---------------------- |
| guard     | `NavigationHookAfter` | navigation hook to add |

#### 예제

```js
router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    console.log('failed navigation', failure)
  }
})
```

### back

Go back in history if possible by calling `history.back()`. Equivalent to `router.go(-1)`.

**시그니처**:

```typescript
back(): void
```

### beforeEach

Add a navigation guard that executes before any navigation. Returns a function that removes the registered guard.

**시그니처**:

```typescript
beforeEach(guard: NavigationGuard): () => void
```

_파라미터_

| Parameter | Type                                  | Description             |
| --------- | ------------------------------------- | ----------------------- |
| guard     | [`NavigationGuard`](#navigationguard) | navigation guard to add |

### beforeResolve

Add a navigation guard that executes before navigation is about to be resolved. At this state all component have been fetched and other navigation guards have been successful. Returns a function that removes the registered guard.

**시그니처**:

```typescript
beforeResolve(guard: NavigationGuard): () => void
```

_파라미터_

| Parameter | Type                                  | Description             |
| --------- | ------------------------------------- | ----------------------- |
| guard     | [`NavigationGuard`](#navigationguard) | navigation guard to add |

#### 예제

```js
router.beforeResolve(to => {
  if (to.meta.requiresAuth && !isAuthenticated) return false
})
```

### forward

Go forward in history if possible by calling `history.forward()`. Equivalent to `router.go(1)`.

**시그니처**:

```typescript
forward(): void
```

### getRoutes

Get a full list of all the [route records](#routerecordnormalized).

**시그니처**:

```typescript
getRoutes(): RouteRecordNormalized[]
```

### go

Allows you to move forward or backward through the history.

**시그니처**:

```typescript
go(delta: number): void
```

_파라미터_

| Parameter | Type     | Description                                                                         |
| --------- | -------- | ----------------------------------------------------------------------------------- |
| delta     | `number` | The position in the history to which you want to move, relative to the current page |

### hasRoute

Checks if a route with a given name exists

**시그니처**:

```typescript
hasRoute(name: string | symbol): boolean
```

_파라미터_

| Parameter | Type               | Description                |
| --------- | ------------------ | -------------------------- |
| name      | `string \| symbol` | Name of the route to check |

### isReady

Returns a Promise that resolves when the router has completed the initial navigation, which means it has resolved all async enter hooks and async components that are associated with the initial route. If the initial navigation already happened, the promise resolves immediately.This is useful in server-side rendering to ensure consistent output on both the server and the client. Note that on server side, you need to manually push the initial location while on client side, the router automatically picks it up from the URL.

**시그니처**:

```typescript
isReady(): Promise<void>
```

### onError

Adds an error handler that is called every time a non caught error happens during navigation. This includes errors thrown synchronously and asynchronously, errors returned or passed to `next` in any navigation guard, and errors occurred when trying to resolve an async component that is required to render a route.

**시그니처**:

```typescript
onError(handler: (error: any, to: RouteLocationNormalized, from: RouteLocationNormalized) => any): () => void
```

_파라미터_

| Parameter | Type                                                                              | Description               |
| --------- | --------------------------------------------------------------------------------- | ------------------------- |
| handler   | `(error: any, to: RouteLocationNormalized, from: RouteLocationNormalized) => any` | error handler to register |

### push

Programmatically navigate to a new URL by pushing an entry in the history stack.

**시그니처**:

```typescript
push(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
```

_파라미터_

| Parameter | Type                                    | Description                   |
| --------- | --------------------------------------- | ----------------------------- |
| to        | [`RouteLocationRaw`](#routelocationraw) | Route location to navigate to |

### removeRoute

Remove an existing route by its name.

**시그니처**:

```typescript
removeRoute(name: string | symbol): void
```

_파라미터_

| Parameter | Type               | Description                 |
| --------- | ------------------ | --------------------------- |
| name      | `string \| symbol` | Name of the route to remove |

### replace

Programmatically navigate to a new URL by replacing the current entry in the history stack.

**시그니처**:

```typescript
replace(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
```

_파라미터_

| Parameter | Type                                    | Description                   |
| --------- | --------------------------------------- | ----------------------------- |
| to        | [`RouteLocationRaw`](#routelocationraw) | Route location to navigate to |

### resolve

Returns the [normalized version](#routelocation) of a [route location](#routelocationraw). Also includes an `href` property that includes any existing `base`.

**시그니처**:

```typescript
resolve(to: RouteLocationRaw): RouteLocation & {
  href: string
}
```

_파라미터_

| Parameter | Type                                    | Description                   |
| --------- | --------------------------------------- | ----------------------------- |
| to        | [`RouteLocationRaw`](#routelocationraw) | Raw route location to resolve |

## RouterOptions

### history

History implementation used by the router. Most web applications should use `createWebHistory` but it requires the server to be properly configured. You can also use a _hash_ based history with `createWebHashHistory` that does not require any configuration on the server but isn't handled at all by search engines and does poorly on SEO.

**시그니처**:

```typescript
history: RouterHistory
```

#### 예제

```js
createRouter({
  history: createWebHistory(),
  // other options...
})
```

### linkActiveClass

Default class applied to active [RouterLink](#router-link-props). If none is provided, `router-link-active` will be applied.

**시그니처**:

```typescript
linkActiveClass?: string
```

### linkExactActiveClass

Default class applied to exact active [RouterLink](#router-link-props). If none is provided, `router-link-exact-active` will be applied.

**시그니처**:

```typescript
linkExactActiveClass?: string
```

### parseQuery

Custom implementation to parse a query. Must decode query keys and values. See its counterpart, [stringifyQuery](#stringifyquery).

**시그니처**:

```typescript
parseQuery?: (searchQuery: string) => Record<string, (string | null)[] | string | null>
```

#### 예제

Let's say you want to use the package [qs](https://github.com/ljharb/qs) to parse queries, you can provide both `parseQuery` and `stringifyQuery`:

```js
import qs from 'qs'

createRouter({
  // other options...
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
})
```

### routes

Initial list of routes that should be added to the router.

**시그니처**:

```typescript
routes: RouteRecordRaw[]
```

### scrollBehavior

Function to control scrolling when navigating between pages. Can return a Promise to delay when the scrolling happens.

**시그니처**:

```typescript
scrollBehavior?: RouterScrollBehavior
```

#### 예제

```js
function scrollBehavior(to, from, savedPosition) {
  // `to` and `from` are both route locations
  // `savedPosition` can be null if there isn't one
}
```

- **참고**: [가이드 - 스크롤 동작](/guide/advanced/scroll-behavior.md)

### stringifyQuery

Custom implementation to stringify a query object. Should not prepend a leading `?`. Should properly encode query keys and values. [parseQuery](#parsequery) counterpart to handle query parsing.

**시그니처**:

```typescript
stringifyQuery?: (
  query: Record<
    string | number,
    string | number | null | undefined | (string | number | null | undefined)[]
  >
) => string
```

## RouteRecordRaw

Route record that can be provided by the user when adding routes via the [`routes` option](#routeroptions) or via [`router.addRoute()`](#addroute-2). There are three different kind of route records:

- Single views records: have a `component` option
- Multiple views records ([named views](/guide/essentials/named-views.md)): have a `components` option
- Redirect records: cannot have `component` or `components` option because a redirect record is never reached.

### path

- **타입**: `string`
- **상세**:

  Path of the record. Should start with `/` unless the record is the child of another record. Can define parameters: `/users/:id` matches `/users/1` as well as `/users/posva`.

- **참고**: [가이드 - 동적 경로 매칭](/guide/essentials/dynamic-matching.md)

### redirect

- **타입**: `RouteLocationRaw | (to: RouteLocationNormalized) => RouteLocationRaw` (Optional)
- **상세**:

  Where to redirect if the route is directly matched. The redirection happens before any navigation guard and triggers a new navigation with the new target location. Can also be a function that receives the target route location and returns the location we should redirect to.

### children

- **타입**: Array of [`RouteRecordRaw`](#routerecordraw) (Optional)
- **상세**:

  Nested routes of the current record.

- **참고**: [가이드 - 중첩된 경로](/guide/essentials/nested-routes.md)

### alias

- **타입**: `string | string[]` (Optional)
- **상세**:

  Aliases for the route. Allows defining extra paths that will behave like a copy of the record. This enables paths shorthands like `/users/:id` and `/u/:id`. **All `alias` and `path` values must share the same params**.

### name

- **타입**: `string | symbol` (Optional)
- **상세**:

  Unique name for the route record.

### beforeEnter

- **타입**: [`NavigationGuard | NavigationGuard[]`](#navigationguard) (Optional)
- **상세**:

  Before enter guard specific to this record. Note `beforeEnter` has no effect if the record has a `redirect` property.

### props

- **타입**: `boolean | Record<string, any> | (to: RouteLocationNormalized) => Record<string, any>` (Optional)
- **상세**:

  Allows passing down params as props to the component rendered by `router-view`. When passed to a _multiple views record_, it should be an object with the same keys as `components` or a `boolean` to be applied to each component.target location.

- **참고**: [가이드 - 경로 컴포넌트에 props 전달하기](/guide/essentials/passing-props.md)

### sensitive

- **타입**: `boolean` (Optional)
- **상세**:

  Makes the route matching case sensitive, defaults to `false`. Note this can also be set at a route level.

### strict

- **타입**: `boolean` (Optional)
- **상세**:

  Strictly checks the presence or absence of a trailing slash (`/`) at the end of the path. Defaults to `false` meaning that by default a route `/users` matches both `/users` and `/users/`. Note this can also be set at a route level.

### meta

- **타입**: [`RouteMeta`](#routemeta) (Optional)
- **상세**:

  Custom data attached to the record.

- **참고**: [가이드 - 경로 메타 필드](/guide/advanced/meta.md)

:::tip
If you want to use a functional component, make sure to add a `displayName` to it.

For example:

```js
const HomeView = () => h('div', 'HomePage')
// in TypeScript, you will need to use the FunctionalComponent type
HomeView.displayName = 'HomeView'
const routes = [{ path: '/', component: HomeView }]
```

:::

## RouteRecordNormalized

Normalized version of a [Route Record](#routerecordraw)

### aliasOf

- **타입**: `RouteRecordNormalized | undefined`
- **상세**:

  Defines if this record is the alias of another one. This property is `undefined` if the record is the original one.

### beforeEnter

- **타입**: [`NavigationGuard`](#navigationguard)
- **상세**:

  Navigation guard applied when entering this record from somewhere else.

- **참고**: [가이드 - 네비게이션 가드](/guide/advanced/navigation-guards.md)

### children

- **타입**: Array of normalized [route records](#routerecordnormalized)
- **상세**:

  Children route records of a route at the time it was added. Empty array if none. Note this array doesn't update when `addRoute()` and `removeRoute()` are called.

### components

- **타입**: `Record<string, Component>`
- **상세**:

  Dictionary of named views, if none, contains an object with the key `default`.

### meta

- **타입**: `RouteMeta`
- **상세**:

  Arbitrary data attached to the record.

- **참고**: [가이드 - 경로 메타 필드](/guide/advanced/meta.md)

### name

- **타입**: `string | symbol | undefined`
- **상세**:

  Name for the route record. `undefined` if none was provided.

### path

- **타입**: `string`
- **상세**:

  Normalized path of the record. Includes any parent's `path`.

### props

- **타입**: `Record<string, boolean | Function | Record<string, any>>`
- **상세**:

  Dictionary of the [`props` option](#props) for each named view. If none, it will contain only one property named `default`.

### redirect

- **타입**: [`RouteLocationRaw`](#routelocationraw)
- **상세**:

  Where to redirect if the route is directly matched. The redirection happens before any navigation guard and triggers a new navigation with the new target location.

## RouteLocationRaw

User-level route location that can be passed to `router.push()`, `redirect`, and returned in [Navigation Guards](/guide/advanced/navigation-guards.md).

A raw location can either be a `string` like `/users/posva#bio` or an object:

```js
// these three forms are equivalent
router.push('/users/posva#bio')
router.push({ path: '/users/posva', hash: '#bio' })
router.push({ name: 'users', params: { username: 'posva' }, hash: '#bio' })
// only change the hash
router.push({ hash: '#bio' })
// only change query
router.push({ query: { page: '2' } })
// change one param
router.push({ params: { username: 'jolyne' } })
```

Note `path` must be provided encoded (e.g. `phantom blood` becomes `phantom%20blood`) while `params`, `query` and `hash` must not, they are encoded by the router.

Raw route locations also support an extra option `replace` to call `router.replace()` instead of `router.push()` in navigation guards. Note this also internally calls `router.replace()` even when calling `router.push()`:

```js
router.push({ hash: '#bio', replace: true })
// equivalent to
router.replace({ hash: '#bio' })
```

## RouteLocation

Resolved [RouteLocationRaw](#routelocationraw) that can contain [redirect records](#routerecordraw). Apart from that it has the same properties as [RouteLocationNormalized](#routelocationnormalized).

## RouteLocationNormalized

Normalized route location. Does not have any [redirect records](#routerecordraw). In navigation guards, `to` and `from` are always of this type.

### fullPath

- **타입**: `string`
- **상세**:

  Encoded URL associated to the route location. Contains `path`, `query` and `hash`.

### hash

- **타입**: `string`
- **상세**:

  Decoded `hash` section of the URL. Always starts with a `#`. Empty string if there is no `hash` in the URL.

### query

- **타입**: `Record<string, LocationQueryValue | LocationQueryValue[]>`
- **상세**:

  Dictionary of decoded query params extracted from the `search` section of the URL.

### matched

- **타입**: [`RouteRecordNormalized[]`](#routerecordnormalized)
- **상세**:

  Array of [normalized route records](#routerecordnormalized) that were matched with the given route location.

### meta

- **타입**: `RouteMeta`
- **상세**:

  Arbitrary data attached to all matched records merged (non recursively) from parent to child.

- **참고**: [가이드 - 경로 메타 필드](/guide/advanced/meta.md)

### name

- **타입**: `string | symbol | undefined | null`
- **상세**:

  Name for the route record. `undefined` if none was provided.

### params

- **타입**: `Record<string, string | string[]>`
- **상세**:

  Dictionary of decoded params extracted from `path`.

### path

- **타입**: `string`
- **상세**:

  Encoded `pathname` section of the URL associated to the route location.

### redirectedFrom

- **타입**: [`RouteLocation`](#routelocation)
- **상세**:

  Route location we were initially trying to access before ending up on the current location when a `redirect` option was found or a navigation guard called `next()` with a route location. `undefined` if there was no redirection.

## NavigationFailure

### from

- **타입**: [`RouteLocationNormalized`](#routelocationnormalized)
- **상세**:

  Route location we were navigating from

### to

- **타입**: [`RouteLocationNormalized`](#routelocationnormalized)
- **상세**:

  Route location we were navigating to

### type

- **타입**: [`NavigationFailureType`](#navigationfailuretype)
- **상세**:

  Type of the navigation failure.

- **참고**: [가이드 - 탐색 실패](/guide/advanced/navigation-failures.md)

## NavigationGuard

- **인자**:

  - [`RouteLocationNormalized`](#routelocationnormalized) to - Route location we are navigating to
  - [`RouteLocationNormalized`](#routelocationnormalized) from - Route location we are navigating from
  - `Function` next (Optional) - Callback to validate the navigation

- **상세**:

  Function that can be passed to control a router navigation. The `next` callback can be omitted if you return a value (or a Promise) instead, which is encouraged. Possible return values (and parameters for `next`) are:

  - `undefined | void | true`: validates the navigation
  - `false`: cancels the navigation
  - [`RouteLocationRaw`](#routelocationraw): redirects to a different location
  - `(vm: ComponentPublicInstance) => any` **only for `beforeRouteEnter`**: A callback to be executed once the navigation completes. Receives the route component instance as the parameter.

- **참고**: [가이드 - 네비게이션 가드](/guide/advanced/navigation-guards.md)

## Component Injections

### Component Injected Properties

These properties are injected into every child component by calling `app.use(router)`.

- **this.\$router**

  The router instance.

- **this.\$route**

  The current active [route location](#routelocationnormalized). This property is read-only and its properties are immutable, but it can be watched.

### Component Enabled Options

- **beforeRouteEnter**
- **beforeRouteUpdate**
- **beforeRouteLeave**
  <br>
- **참고**: [가이드 - 네비게이션 가드: 컴포넌트 내부 가드](/guide/advanced/navigation-guards.md#in-component-guards).