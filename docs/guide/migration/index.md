# Vue 2에서 Vue 3로 마이그레이션하기 %{#migrating-from-vue-2}%

Vue Router API의 대부분은 v3(Vue 2용)에서 v4(Vue 3용)로의 재작성 과정에서 변경되지 않았지만, 여전히 일부 중단된 변경 사항들이 있습니다. 이 가이드는 이러한 변경 사항들이 발생한 이유를 이해하고 Vue Router 4에서 작동하도록 애플리케이션을 적응시키는 방법을 돕기 위해 제공됩니다.

## 중단된 변경 사항들 %{#breaking-changes}%

변경 사항들은 사용량에 따라 정렬되었습니다. 따라서 이 목록을 순서대로 따르는 것이 좋습니다.

### `new Router`가 `createRouter`로 대체되었습니다 %{#new-router-becomes-createrouter}%

Vue Router는 이제 클래스가 아닌 함수들의 집합입니다. 따라서 `new Router()`를 작성하는 대신에 이제 `createRouter`를 호출해야 합니다:

```js
// 이전에는
// import Router from 'vue-router'
import { createRouter } from 'vue-router'

const router = createRouter({
  // ...
})
```

### 새로운 `history` 옵션이 `mode`를 대체했습니다 %{#new-history-option-to-replace-mode}%

`mode: 'history'` 옵션이 더 유연한 `history`로 대체되었습니다. 사용하던 모드에 따라 적절한 함수로 교체해야 합니다:

- `"history"`: `createWebHistory()`
- `"hash"`: `createWebHashHistory()`
- `"abstract"`: `createMemoryHistory()`

전체 코드 예시는 다음과 같습니다:

```js
import { createRouter, createWebHistory } from 'vue-router'
// createWebHashHistory 및 createMemoryHistory도 있습니다.

createRouter({
  history: createWebHistory(),
  routes: [],
})
```

SSR의 경우, 적절한 history를 수동으로 전달해야 합니다:

```js
// router.js
let history = isServer ? createMemoryHistory() : createWebHistory()
let router = createRouter({ routes, history })
// 서버 진입점(server-entry.js) 어딘가에서
router.push(req.url) // 요청된 url
router.isReady().then(() => {
  // 요청 처리
})
```

**이유**: 사용하지 않는 history에 대해 트리 쉐이킹(tree shaking)을 가능하게 하며, 네이티브 솔루션과 같은 고급 사용 사례에 대해 사용자 정의 history를 구현할 수 있게 합니다.

### `base` 옵션이 이동되었습니다 %{#moved-the-base-option}%

`base` 옵션은 이제 `createWebHistory`(및 다른 histories)의 첫 번째 인자로 전달됩니다:

```js
import { createRouter, createWebHistory } from 'vue-router'
createRouter({
  history: createWebHistory('/base-directory/'),
  routes: [],
})
```

### `fallback` 옵션이 제거되었습니다 %{#removal-of-the-fallback-option}%

`fallback` 옵션은 더 이상 라우터 생성 시 지원되지 않습니다:

```diff
-new VueRouter({
+createRouter({
-  fallback: false,
// 다른 옵션들...
})
```

**이유**: Vue가 지원하는 모든 브라우저가 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)를 지원하므로 `location.hash`를 수정하는 해킹 방법을 피하고 직접 `history.pushState()`를 사용할 수 있습니다.

### `*` (별표 또는 캐치 올) 라우트가 제거되었습니다 %{#removed-star-or-catch-all-routes}%

Catch all 라우트 (`*`, `/*`)는 이제 사용자 정의 정규식을 사용하는 매개변수로 정의해야 합니다:

```js
const routes = [
  // pathMatch는 매개변수의 이름입니다. 예를 들어, /not/found로 이동하면
  // { params: { pathMatch: ['not', 'found'] }}가 생성됩니다.
  // 이것은 마지막 * 덕분에 반복된 매개변수가 생성되며,
  // 이것은 not-found 라우트를 직접 이름으로 사용하여 해당 경로로 직접 이동하는 경우에 필요합니다.
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  // 마지막 `*`을 생략하면 params 내의 `/` 문자가 해석될 때 인코딩됩니다.
  { path: '/:pathMatch(.*)', name: 'bad-not-found', component: NotFound },
]
// 명명된 라우트(named routes)를 사용하는 경우 나쁜 예시:
router.resolve({
  name: 'bad-not-found',
  params: { pathMatch: 'not/found' },
}).href // '/not%2Ffound'
// 좋은 예시:
router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href // '/not/found'
```

:::tip
라우트의 이름을 사용하여 직접 not-found 라우트로 이동하지 않는 경우에는 반복된 매개변수를 위해 `*`을 추가할 필요가 없습니다. `router.push('/not/found/url')`과 같이 호출하면 올바른 `pathMatch` 매개변수가 제공됩니다.
:::

**이유**: Vue Router는 더 이상 `path-to-regexp`을 사용하지 않으며, 대신 라우트 순위 지정과 동적 라우팅을 가능하게 하는 고유한 구문 분석 시스템을 구현합니다. 일반적으로 하나의 단일 catch-all 라우트를 프로젝트에 추가하므로 `*`에 대한 특별한 구문을 지원하는 것에 큰 이점이 없습니다. 매개변수의 인코딩은 예측하기 쉽도록 라우트 간에 인코딩됩니다.

### `currentRoute` 속성은 이제 `ref()`입니다 %{#The-currentRoute-property-is-now-a-ref-}%

이전에는 라우터 인스턴스의 [`currentRoute`](https://v3.router.vuejs.org/api/#router-currentroute) 객체의 속성에 직접 접근할 수 있었습니다.

vue-router v4의 도입으로 라우터 인스턴스의 `currentRoute` 객체의 기본 유형이 Vue 3에서 소개된 새로운 [반응성 기본 사항](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)에서 가져온 `Ref<RouteLocationNormalizedLoaded>`으로 변경되었습니다.

`useRoute()` 또는 `this.$route`로 라우트를 읽는 경우에는 아무 것도 변경되지 않지만 라우터 인스턴스에서 직접 접근하는 경우 `currentRoute.value`를 통해 실제 라우트 객체에 접근해야 합니다:

```ts
const { page } = router.currentRoute.query // [!code --]
const { page } = router.currentRoute.value.query // [!code ++]
```

### `onReady`를 `isReady`로 대체했습니다 %{#replaced-onready-with-isready}%

기존의 `router.onReady()` 함수가 인자 없이 반환하는 Promise인 `router.isReady()`로 대체되었습니다:

```js
// 이전 방식
router.onReady(onSuccess, onError)
// 새로운 방식
router.isReady().then(onSuccess).catch(onError)
// 또는 await을 사용합니다:
try {
  await router.isReady()
  // onSuccess
} catch (err) {
  // onError
}
```

### `scrollBehavior` 변경사항 %{#scrollbehavior-changes}%

`scrollBehavior`에서 반환되는 객체가 이제 [`ScrollToOptions`](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions)와 유사합니다. `x`는 `left`로, `y`는 `top`으로 이름이 변경되었습니다. [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0035-router-scroll-position.md)를 참조하세요.

**이유**: 객체를 `ScrollToOptions`와 비슷하게 만들어서 원래의 JS 네이티브 API와 더 친숙하게 만들고, 미래에 새로운 옵션을 추가하는 것을 가능하게 하기 위함입니다.

### `<router-view>`, `<keep-alive>`, 그리고 `<transition>` %{#router-view-keep-alive-and-transition}%

`transition`과 `keep-alive`는 이제 `RouterView` 내부에서 `v-slot` API를 통해 사용되어야 합니다:

```vue
<router-view v-slot="{ Component }">
<transition>
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</transition>
</router-view>
```

**이유**: 이 변경은 필요한 변경으로, [관련된 RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0034-router-view-keep-alive-transitions.md)를 참조하세요.

### `<router-link>`의 `append` 속성 제거됨 %{#removal-of-append-prop-in-router-link}%

`<router-link>`에서 `append` 속성이 제거되었습니다. 이제 기존의 `path`에 값을 수동으로 연결해야 합니다:

```html
이전 방식
<router-link to="child-route" append>to relative child</router-link>
새로운 방식
<router-link :to="append($route.path, 'child-route')">
  to relative child
</router-link>
```

_App_ 인스턴스 전역에서 `append` 함수를 정의해야 합니다:

```js
app.config.globalProperties.append = (path, pathToAppend) =>
  path + (path.endsWith('/') ? '' : '/') + pathToAppend
```

**이유**: `append`는 매우 자주 사용되지 않으며, 사용자 정의 코드로 쉽게 대체할 수 있습니다.

### `<router-link>`의 `event`와 `tag` 속성 제거 %{#removal-of-event-and-tag-props-in-router-link}%

`<router-link>`의 `event`와 `tag` 속성이 제거되었습니다. 이제 [`v-slot` API](/guide/advanced/composition-api#uselink)를 사용하여 `<router-link>`를 완전히 커스터마이징할 수 있습니다:

```html
이전 방식
<router-link to="/about" tag="span" event="dblclick">About Us</router-link>
새로운 방식
<router-link to="/about" custom v-slot="{ navigate }">
  <span @click="navigate" @keypress.enter="navigate" role="link">About Us</span>
</router-link>
```

**이유**: 이러한 속성들은 `<a>` 태그와 다른 요소를 사용하는 데 자주 함께 사용되었지만, `v-slot` API 이전에 도입되었으며 모든 사용자를 위해 번들 크기를 증가시키는 것에 충분히 사용되지 않았기 때문에 제거되었습니다.

### `<router-link>`의 `exact` 속성 제거 %{#removal-of-the-exact-prop-in-router-link}%

`exact` 속성은 더 이상 필요하지 않으므로 제거되었습니다. 이제 두 가지 사항을 알아두어야 합니다:

- 라우트는 더 이상 생성된 라우트 위치 객체 및 해당 `path`, `query`, `hash` 속성에 기반하여 활성화됩니다.
- `path` 섹션만 일치하고 `query` 및 `hash`는 더 이상 고려되지 않습니다.

만약 `hash` 섹션도 고려하고자 한다면 [`v-slot` API](/guide/advanced/composition-api#uselink)를 사용하여 `<router-link>`를 확장해야 합니다.

**이유**: 더 이상 필요하지 않은 기능을 수정하고, 라우터의 무게를 늘리지 않으면서 더 간단한 방법으로 처리하기 위해서입니다. 자세한 내용은 [active matching에 관한 RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0028-router-active-link.md#summary)을 참조하십시오.

### 믹스인의 네비게이션 가드 무시 %{#navigation-guards-in-mixins-are-ignored}%

현재 믹스인의 네비게이션 가드는 지원되지 않습니다. [vue-router#454](https://github.com/vuejs/router/issues/454)에서 이 지원에 대한 추적을 할 수 있습니다.

### `router.match` 제거 및 `router.resolve` 변경 %{#removal-of-router-match-and-changes-to-router-resolve}%

`router.match`와 `router.resolve` 모두 `router.resolve`로 통합되었으며 약간 다른 형식으로 변경되었습니다. 자세한 내용은 [API](/api/interfaces/Router.md#Methods-resolve)를 참조하십시오.

**이유**: 동일한 목적으로 사용되던 여러 메서드를 통합하기 위해서입니다.

### `router.getMatchedComponents()` 제거 %{#removal-of-router-getmatchedcomponents}%

`router.getMatchedComponents` 메서드가 이제 제거되었습니다. 대신 매치된 컴포넌트들은 `router.currentRoute.value.matched`에서 가져올 수 있습니다:

```js
router.currentRoute.value.matched.flatMap(record =>
  Object.values(record.components)
)
```

**이유**: 이 메서드는 SSR 시에만 사용되었으며 사용자가 한 줄로 처리할 수 있는 간단한 메서드였기 때문에 제거되었습니다.

### 리다이렉트 레코드에서 특수 경로 사용 불가능 %{#redirect-records-cannot-use-special-paths}%

이전에는 비공개로 설정된 기능으로 리다이렉트 레코드를 `/events/:id`와 같은 특수 경로로 설정할 수 있었고, 기존의 `id` 매개변수를 재사용할 수 있었습니다. 이제 이 기능은 더 이상 지원되지 않으며 두 가지 옵션이 있습니다:

- 매개변수 없이 라우트의 이름을 사용하기: `redirect: { name: 'events' }`. 단, `:id` 매개변수가 선택적인 경우에는 작동하지 않습니다.
- 함수를 사용하여 대상에 기반한 새 위치를 재생성하기: `redirect: to => ({ name: 'events', params: to.params })`

**이유**: 이 구문은 거의 사용되지 않았으며 다른 방법들과 비교하여 짧지 않았을 뿐더러, 라우터를 무겁게 만드는 복잡성을 도입했습니다.

### 모든 네비게이션은 이제 항상 비동기 %{#all-navigations-are-now-always-asynchronous}%

첫 번째 네비게이션을 포함하여 모든 네비게이션은 이제 비동기로 처리됩니다. 따라서 `transition`을 사용하는 경우 앱을 마운트하기 전에 라우터가 "준비"되어야 할 수도 있습니다:

```js
app.use(router)
// 참고: 서버 측에서는 초기 위치를 수동으로 푸시해야 합니다
router.isReady().then(() => app.mount('#app'))
```

그렇지 않으면 `appear` prop을 `transition`에 제공한 것처럼 처음에 초기 전환이 발생하게 됩니다. 이것은 라우터가 초기 위치(아무것도 없는 상태)를 표시한 후에 첫 번째 위치를 표시하기 때문입니다.

**참고**: 초기 네비게이션에서 네비게이션 가드가 있는 경우, 서버 측 렌더링을 수행하지 않는 한 앱 렌더를 차단하고 해결되기 전까지 기다리지 않는 것이 좋습니다. 이 경우 라우터를 준비되기 전에 앱을 마운트하는 것은 Vue 2와 동일한 결과를 얻을 수 있습니다.

### `router.app` 제거 %{#removal-of-router-app}%

`router.app`은 이제 더 이상 마지막 루트 컴포넌트(Vue 인스턴스)를 나타내지 않습니다. 이제 Vue Router는 동시에 여러 Vue 애플리케이션에서 안전하게 사용할 수 있습니다. 라우터를 사용하는 경우 여전히 `app`을 추가할 수 있습니다:

```js
app.use(router)
router.app = app
```

또한 `Router` 인터페이스의 TypeScript 정의를 확장하여 `app` 속성을 추가할 수도 있습니다.

**이유**: Vue 3 애플리케이션이 Vue 2에서 존재하지 않고 이제 같은 라우터 인스턴스를 사용하는 여러 애플리케이션을 올바르게 지원합니다. `app` 속성이 있으면 루트 인스턴스가 아닌 애플리케이션을 나타내므로 혼란스러울 수 있습니다.

### 라우트 컴포넌트의 `<slot>`에 콘텐츠 전달 %{#passing-content-to-route-components-slot}%

이전에는 라우트 컴포넌트의 `<slot>`에 직접 템플릿을 전달할 수 있었습니다. 이제는 `<router-view>` 컴포넌트 아래에 중첩하여 `<slot>`에 전달해야 합니다:

```html
<router-view>
  <p>In Vue Router 3, I render inside the route component</p>
</router-view>
```

`<router-view>`에 대한 `v-slot` API를 사용하여 `<component>`에 전달해야 합니다:

```html
<router-view v-slot="{ Component }">
  <component :is="Component">
    <p>In Vue Router 3, I render inside the route component</p>
  </component>
</router-view>
```

### 라우트 위치에서 `parent` 제거 %{#removal-of-parent-from-route-locations}%

`parent` 속성은 정규화된 라우트 위치(`this.$route` 및 `router.resolve`에 의해 반환되는 객체)에서 제거되었습니다. 그러나 여전히 `matched` 배열을 통해 접근할 수 있습니다:

```js
const parent = this.$route.matched[this.$route.matched.length - 2]
```

**이유**: `parent`와 `children` 속성이 중복되는 것은 불필요한 순환 참조를 만들어 냅니다. 이미 `matched`를 통해 속성을 얻을 수 있기 때문에 이러한 변경이 이루어졌습니다.

### `pathToRegexpOptions` 제거 %{#removal-of-pathtoregexpoptions}%

라우트 레코드의 `pathToRegexpOptions`와 `caseSensitive` 속성이 `createRouter()`의 `sensitive` 및 `strict` 옵션으로 대체되었습니다. 이제 `createRouter()`를 사용하여 직접 `pathToRegexpOptions`를 전달할 수 있습니다. `path-to-regexp`에 특정한 다른 옵션은 더 이상 사용되지 않습니다.

### 무명 매개변수 제거 %{#removal-of-unnamed-parameters}%

`path-to-regexp`의 제거로 인해 무명 매개변수가 더 이상 지원되지 않습니다:

- `/foo(/foo)?/suffix`는 이제 `/foo/:_(foo)?/suffix`가 됩니다.
- `/foo(foo)?`는 이제 `/foo:_(foo)?`가 됩니다.
- `/foo/(.*)`는 이제 `/foo/:_(.*)`가 됩니다.

:::tip
매개변수에 `_` 대신 다른 이름을 사용할 수 있습니다. 중요한 것은 하나를 제공하는 것입니다.
:::

### `history.state` 사용 %{#usage-of-history-state}%

Vue Router는 `history.state`에 정보를 저장합니다. 수동으로 `history.pushState()`를 호출하는 코드가 있다면, 이를 피하거나 정상적인 `router.push()`와 `history.replaceState()`로 리팩터링해야 합니다:

```js
// 이전 방식
history.pushState(myState, '', url)
// 새로운 방식
await router.push(url)
history.replaceState({ ...history.state, ...myState }, '')
```

마찬가지로, 현재 상태를 보존하지 않고 `history.replaceState()`를 호출하고 있다면 현재 `history.state`를 전달해야 합니다:

```js
// 이전 방식
history.replaceState({}, '', url)
// 새로운 방식
history.replaceState(history.state, '', url)
```

**이유**: 라우터는 스크롤 위치, 이전 위치 등과 같은 네비게이션에 대한 정보를 history state에 저장하기 때문에 이러한 변경이 이루어졌습니다.

### `options`에서 `routes` 옵션 필수화 %{#routes-option-is-required-in-options}%

`options`에서 `routes` 속성은 이제 필수적으로 요구됩니다.

```js
createRouter({ routes: [] })
```

**이유**: 라우터는 라우트와 함께 생성되도록 설계되었습니다. 대부분의 경우 최소한 하나의 라우트가 필요하며, 대개 앱 당 한 번 작성되므로 이렇게 변경되었습니다.

### 존재하지 않는 이름을 가진 라우트 %{#non-existent-named-routes}%

존재하지 않는 이름의 라우트를 푸시하거나 해결하려고 하면 오류가 발생합니다:

```js
// 이름을 잘못 입력했을 경우
router.push({ name: 'homee' }) // 오류 발생
router.resolve({ name: 'homee' }) // 오류 발생
```

**이유**: 이전에 라우터는 `/`로 이동하지만 아무 것도 표시하지 않았습니다(홈 페이지 대신). 오류를 발생시키는 것이 더 타당하며, 유효한 URL로 이동할 수 없기 때문에 더 이상 `/`로 이동하지 않습니다.

### 필요한 매개변수가 누락된 이름 있는 라우트 %{#missing-required-params-on-named-routes}%

필요한 매개변수 없이 이름 있는 라우트를 푸시하거나 해결하려고 하면 오류가 발생합니다:

```js
// 다음 라우트를 가정하면:
const routes = [{ path: '/users/:id', name: 'user', component: UserDetails }]

// `id` 매개변수가 누락된 경우 오류 발생
router.push({ name: 'user' })
router.resolve({ name: 'user' })
```

**이유**: 위와 동일합니다.

### 빈 `path`를 가진 이름 있는 하위 라우트의 슬래시 제거 %{#named-children-routes-with-an-empty-path-no-longer-appends-a-slash}%

빈 `path`를 가진 중첩된 이름 있는 라우트는 이제 슬래시를 포함하지 않습니다:

```js
const routes = [
  {
    path: '/dashboard',
    name: 'dashboard-parent',
    component: DashboardParent,
    children: [
      { path: '', name: 'dashboard', component: DashboardDefault },
      {
        path: 'settings',
        name: 'dashboard-settings',
        component: DashboardSettings,
      },
    ],
  },
]
```

이름 있는 라우트 `dashboard`로 이동하면 이제 슬래시 없이 URL이 생성됩니다:

```js
router.resolve({ name: 'dashboard' }).href // '/dashboard'
```

이로 인해 다음과 같은 결과가 발생합니다:

```js
const routes = [
  {
    path: '/parent',
    component: Parent,
    children: [
      // 이제 `/parent/home` 대신 `/home`로 리디렉션됩니다.
      { path: '', redirect: 'home' },
      { path: 'home', component: Home },
    ],
  },
]
```

주의: `path`가 `/parent/`인 경우에는 여전히 `/parent/home`으로의 상대적 위치는 `/parent/home`이며 `home`의 상대적 위치는 `/home`이기 때문에 작동합니다.

<!-- Learn more about relative links [in the cookbook](../../cookbook/relative-links.md). -->

**이유**: 이로 인해 후행 슬래시 동작이 일관되게 유지되며, 기본적으로 모든 라우트가 후행 슬래시를 허용하게 됩니다. 이는 `strict` 옵션을 사용하여 비활성화할 수 있으며, 라우트에 직접 슬래시를 추가하거나 추가하지 않을 수도 있습니다.

<!-- TODO: maybe a cookbook entry -->

### `$route` 속성 인코딩 %{#route-properties-encoding}%

`params`, `query`, 그리고 `hash`에서 디코딩된 값들은 이제 어디서 네비게이션을 시작하더라도 일관성을 가집니다 (구버전 브라우저는 여전히 인코딩되지 않은 `path`와 `fullPath`를 생성할 것입니다). 초기 네비게이션은 앱 내에서 발생하는 네비게이션과 동일한 결과를 가져야 합니다.

아래는 [정규화된 라우트 위치](/api/interfaces/RouteLocationNormalized.md)를 기준으로 합니다:

- `path`, `fullPath`의 값은 이제 더 이상 디코딩되지 않습니다. 브라우저가 제공하는대로 표시됩니다(대부분의 브라우저에서는 인코딩된 상태로 제공됩니다). 예를 들어, 주소 창에 직접 `https://example.com/hello world`를 입력하면 인코딩된 버전인 `https://example.com/hello%20world`를 얻게 되며, `path`와 `fullPath`는 모두 `/hello%20world`가 됩니다.
- `hash`는 이제 디코딩되며, 이로 인해 다음과 같이 복사하여 사용할 수 있습니다: `router.push({ hash: $route.hash })` 그리고 [scrollBehavior](/api/interfaces/RouterOptions.md#Properties-scrollBehavior)의 `el` 옵션에서 직접 사용할 수 있습니다.
- `push`, `resolve`, 그리고 `replace`를 사용하고 `string` 위치나 객체의 `path` 속성을 제공할 때, **반드시 인코딩**해야 합니다(이전 버전과 같습니다). 반면에 `params`, `query`, 그리고 `hash`는 인코딩되지 않은 상태로 제공되어야 합니다.
- 슬래시 문자 (`/`)는 이제 `params` 내에서 적절히 디코딩되지만 URL에서는 인코딩된 버전인 `%2F`로 생성됩니다.

**이유**: 이로 인해 `router.push()`와 `router.resolve()`를 호출할 때 존재하는 위치의 속성을 쉽게 복사할 수 있으며, 결과적으로 브라우저 간 일관된 라우트 위치를 만들 수 있습니다. `router.push()`는 이제 멱등성을 가지며, 즉 `router.push(route.fullPath)`, `router.push({ hash: route.hash })`, `router.push({ query: route.query })`, 그리고 `router.push({ params: route.params })`를 호출하여 추가적인 인코딩을 생성하지 않습니다.

### TypeScript 변경 사항 %{#typescript-changes}%

더 일관적이고 표현력 있는 타이핑을 위해 몇 가지 타입이 이름을 바꾸었습니다:

| `vue-router@3` | `vue-router@4`          |
| -------------- | ----------------------- |
| RouteConfig    | RouteRecordRaw          |
| Location       | RouteLocation           |
| Route          | RouteLocationNormalized |

## 새로운 기능 %{#new-features}%

Vue Router 4에서 주목해야 할 일부 새로운 기능들은 다음과 같습니다:

- [동적 라우팅](../advanced/dynamic-routing.md)
- [Composition API](../advanced/composition-api.md)
<!-- - Custom History implementation -->
