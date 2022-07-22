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
- **기본값**: `false`
- **상세**:

  `replace` 속성은 클릭 시 `router.push()` 대신 `router.replace()`가 호출되므로,
  탐색이 기록되지 않습니다.

```html
<router-link to="/abc" replace>ABC로 이동</router-link>
```

### active-class

- **타입**: `string`
- **기본값**: `"router-link-active"`
- **상세**:

  링크가 활성화 되었을 때, 렌더링된 `<a>`에 적용할 클래스입니다.
  [`linkActiveClass`](#linkactiveclass)로 전역 구성을 한 경우,
  기본값은 전역 구성 값 입니다.

### aria-current-value

- **타입**: `'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'`(`string`)
- **기본값**: `"page"`
- **상세**:

  링크가 정확히 활성화되면 [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) 속성에 값이 전달됩니다.

### custom

- **타입**: `boolean`
- **기본값**: `false`
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
- **기본값**: `"router-link-exact-active"`
- **상세**:

  링크가 정확히 활성화 되었을 때, 렌더링된 `<a>`에 적용할 클래스입니다.
  [`linkExactActiveClass`](#linkexactactiveclass)로 전역 구성을 한 경우,
  기본값은 전역 구성 값 입니다.

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
- **기본값**: `"default"`
- **상세**:

  `<router-view>`에 `name`이 있으면,
  일치하는 경로 레코드의 `components` 옵션 내 `name`에 해당하는 값의 컴포넌트를 렌더링합니다.

- **참고**: [가이드 - 이름이 있는 뷰](/guide/essentials/named-views.md)

### route

- **타입**: [`RouteLocationNormalized`](#routelocationnormalized)
- **상세**:

  모든 컴포넌트를 뷰(view)에 표시할 수 있도록 해결된(지연 로드인 경우 로드가 완료된) 경로 위치 객체를 받습니다.
  보통 `router.resolt`로 경로 위치 객체를 생성하며,
  이 객체는 `shallowRef`나 `computed`를 사용해 **반응형으로 감싼 객체**를 받아야 합니다.

## `<router-view>`'s `v-slot`

`<router-view>`는 주로 `<transition>`와 `<keep-alive>` 컴포넌트로 경로 컴포넌트를 래핑하기 위해 `v-slot` API를 노출합니다.

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
        <template #fallback> 로딩 중... </template>
      </suspense>
    </keep-alive>
  </transition>
</router-view>
```

- `Component`: `<component>`의 `is` prop에 전달할 VNode.
- `route`: 처리된(resolved) [정규화된 경로 위치](#routelocationnormalized).

뷰 컴포넌트의 props를 `<router-view>`가 아닌 `<component>`에 직접 전달해야 합니다:

```html
<router-view v-slot="{ Component, route }">
  <component :is="Component" view-prop="value" />
</router-view>
```

## createRouter

Vue 앱에서 사용할 수 있는 라우터 인스턴스를 만듭니다.
전달할 수 있는 모든 속성 목록은 [`RouterOptions`](#routeroptions)를 확인하십시오.

**시그니처**:

```typescript
export declare function createRouter(options: RouterOptions): Router
```

### 파라미터

| 파라미터    | 타입                              | 설명         |
|---------|---------------------------------|------------|
| options | [RouterOptions](#routeroptions) | 라우터 초기화 옵션 |

## createWebHistory

HTML5 히스토리 모드를 생성합니다.
SPA에서 가장 일반적인 히스토리입니다.
앱은 http 프로토콜을 통해 제공되어야 합니다.

**시그니처**:

```typescript
export declare function createWebHistory(base?: string): RouterHistory
```

### 파라미터

| 파라미터 | 타입       | 설명                                                              |
|------|----------|-----------------------------------------------------------------|
| base | `string` | 선택적. 앱이 `https://example.com/folder/`와 같은 폴더 내부에서 호스팅될 때 유용합니다. |

### 예제

```js
createWebHistory() // 앱은 도메인의 루트인 `https://example.com`에서 호스팅됩니다.
createWebHistory('/folder/') // `https://example.com/folder/`에서 호스팅됩니다.
```

## createWebHashHistory

해시 히스토리 모드를 생성합니다.
호스트가 없는 웹 앱(예: `file://`)이나 URL을 처리하도록 서버를 구성할 필요가 없는 경우에 유용합니다.
**SEO가 중요하다면 [`createWebHistory`](#createwebhistory)를 사용해야 합니다**.

**시그니처**:

```typescript
export declare function createWebHashHistory(base?: string): RouterHistory
```

### 파라미터

| 파라미터 | 타입     | 설명                                                                                                                                                                                                                           |
|------| -------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| base | `string` | 선택적. 기본값은 `location.pathname + location.search`입니다. `head`에 `<base>` 태그가 있는 경우, 해당 값은 이 파라미터에 의해 무시되지만, **모든 history.pushState() 호출**에 영향을 미칩니다. 그러므로 `<base>` 태그를 사용하는 경우, `href` 값이 **이 파라미터와 일치해야 합니다**(`#` 뒤의 모든 항목 무시). |

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

메모리 기반 히스토리 모드를 생성합니다.
이 히스토리의 주요 목적은 SSR을 처리하는 것입니다.
어디에도 없는 특별한 장소에서 시작됩니다.
사용자가 브라우저 컨텍스트에 있지 않은 경우, `router.push()` 또는 `router.replace()`를 호출하여 해당 위치를 시작 위치로 바꾸는 것은 사용자에게 달려 있습니다.

**시그니처**:

```typescript
export declare function createMemoryHistory(base?: string): RouterHistory
```

### 파라미터

| 파라미터 | 타입     | 설명                        |
| --------- | -------- |---------------------------|
| base      | `string` | 모든 URL에 base 적용, 기본값은 '/' |

## NavigationFailureType

탐색 실패에 대해 가능한 모든 유형의 열거입니다.
특정 실패를 확인하기 위해 [isNavigationFailure](#isnavigationfailure)에 전달할 수 있습니다.
**숫자 값을 절대 사용하지 말고**, 항상 `NavigationFailureType.aborted`와 같은 변수를 사용해야 합니다.

**시그니처**:

```typescript
export declare enum NavigationFailureType
```

### Members

| Member     | 값   | 설명                                                             |
| ---------- |-----|----------------------------------------------------------------|
| aborted    | 4   | 네비게이션 가드 내부에서 `false`가 반환되었거나, `next(false)`를 호출했기 때문에 실패한 탐색. |
| cancelled  | 8   | 탐색이 완료되기 전에 새 탐색이 시작되어 취소된 탐색(반드시 완료되진 않음).                    |
| duplicated | 16  | 이미 해당 위치에 있기 때문에, 중복되어 취소된 탐색.                                 |

## START_LOCATION

- **타입**: [`RouteLocationNormalized`](#routelocationnormalized)
- **상세**:

  라우터의 최초 경로 위치입니다. 네비게이션 가드에서 최초 탐색을 구별하는 데 사용할 수 있습니다.

  ```js
  import { START_LOCATION } from 'vue-router'

  router.beforeEach((to, from) => {
    if (from === START_LOCATION) {
      // 최초 탐색일 경우 ...
    }
  })
  ```

## 컴포지션 API {#composition-api}

### onBeforeRouteLeave

현재 위치의 컴포넌트가 떠나려고 할 때마다 트리거되는 네비게이션 가드를 추가합니다.
`beforeRouteLeave`와 유사하며 모든 컴포넌트에서 사용할 수 있습니다.
컴포넌트가 마운트 해제되면 가드가 제거됩니다.

**시그니처**:

```typescript
export declare function onBeforeRouteLeave(leaveGuard: NavigationGuard): void
```

#### 파라미터

| 파라미터  | 타입                                  | 설명             |
| ---------- | ------------------------------------- | ----------------------- |
| leaveGuard | [`NavigationGuard`](#navigationguard) | 네비게이션 가드를 추가합니다. |

### onBeforeRouteUpdate

현재 위치가 업데이트되려고 할 때마다 트리거되는 네비게이션 가드를 추가합니다.
`beforeRouteUpdate`와 유사하며 모든 컴포넌트에서 사용할 수 있습니다.
컴포넌트가 마운트 해제되면 가드가 제거됩니다.

**시그니처**:

```typescript
export declare function onBeforeRouteUpdate(updateGuard: NavigationGuard): void
```

#### 파라미터

| 파라미터   | 타입                                  | 설명             |
| ----------- | ------------------------------------- | ----------------------- |
| updateGuard | [`NavigationGuard`](#navigationguard) | 네비게이션 가드를 추가합니다. |

### useLink

[`v-slot` API](#router-link-s-v-slot)에 의해 노출되는 모든 것을 반환합니다.

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

| 파라미터 | 타입                | 설명                                                                           |
| --------- | ------------------- | ------------------------------------------------------------------------------------- |
| props     | `RouterLinkOptions` | `<router-link>`에 전달할 수 있는 props 객체입니다. `Ref`와 `ComputedRef`를 허용합니다. |

### useRoute

현재 경로 위치를 반환합니다.
템플릿 내에서 `$route`를 사용하는 것과 같습니다.
`setup()` 내부에서 호출되어야 합니다.

**시그니처**:

```typescript
export declare function useRoute(): RouteLocationNormalized
```

### useRouter

[라우터](#router-properties) 인스턴스를 반환합니다.
템플릿 내에서 `$router`를 사용하는 것과 동일합니다.
`setup()` 내부에서 호출되어야 합니다.

**시그니처**:

```typescript
export declare function useRouter(): Router
```

## TypeScript

Vue Router에서 사용하는 인터페이스와 타입은 다음과 같습니다.
문서는 객체의 기존 속성에 대한 개념을 제공하기 위해 이러한 속성을 참조합니다.

## Router 프로퍼티 {#router-properties}

### currentRoute

- **타입**: [`Ref<RouteLocationNormalized>`](#routelocationnormalized)
- **상세**:

  읽기 전용. 현재 경로 위치.

### options

- **타입**: [`RouterOptions`](#routeroptions)
- **상세**:

  읽기 전용. 라우터를 생성하기 위해 전달된 원본 옵션 객체.

## Router 메서드 {#router-methods}

### addRoute

기존 경로의 자식으로 새 [경로 레코드](#routerecordraw)를 추가합니다.
경로에 `name` 값이 있고, 동일한 값을 가진 기존 경로가 이미 있으면, 먼저 제거 후 추가합니다.

**시그니처**:

```typescript
addRoute(parentName: string | symbol, route: RouteRecordRaw): () => void
```

_파라미터_

| 파라미터  | 타입                                | 설명                                             |
| ---------- | ----------------------------------- | ------------------------------------------------------- |
| parentName | `string \| symbol`                  | `route`가 추가되어야 하는 상위 경로 레코드. |
| route      | [`RouteRecordRaw`](#routerecordraw) | 경로 레코드 추가.                                     |

### addRoute

라우터에 새 [경로 레코드](#routerecordraw)를 추가합니다.
경로에 `name` 값이 있고, 동일한 값을 가진 기존 경로가 이미 있으면, 먼저 제거 후 추가합니다.

**시그니처**:

```typescript
addRoute(route: RouteRecordRaw): () => void
```

_파라미터_

| 파라미터 | 타입                                | 설명         |
| --------- | ----------------------------------- | ------------------- |
| route     | [`RouteRecordRaw`](#routerecordraw) | 경로 레코드 추가. |

:::tip
경로를 추가해도 새 탐색이 트리거되지 않습니다.
즉, 새 탐색이 트리거되지 않는 한 추가된 경로는 표시되지 않습니다.
:::

### afterEach

모든 탐색 이후에 실행되는 네비게이션 훅을 추가합니다.
등록된 훅을 제거하는 함수를 반환합니다.

**시그니처**:

```typescript
afterEach(guard: NavigationHookAfter): () => void
```

_파라미터_

| 파라미터 | 타입                  | 설명            |
| --------- | --------------------- | ---------------------- |
| guard     | `NavigationHookAfter` | 탐색 후 네비게이션 훅 추가. |

#### 예제

```js
router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    console.log('탐색 실패: ', failure)
  }
})
```

### back

가능하다면 `history.back()`을 호출하여 히스토리에서 뒤로 이동합니다.
`router.go(-1)`와 동일합니다.

**시그니처**:

```typescript
back(): void
```

### beforeEach

탐색 전에 실행되는 네비게이션 가드를 추가합니다.
등록된 가드를 제거하는 함수를 반환합니다.

**시그니처**:

```typescript
beforeEach(guard: NavigationGuard): () => void
```

_파라미터_

| 파라미터 | 타입                                  | 설명             |
| --------- | ------------------------------------- | ----------------------- |
| guard     | [`NavigationGuard`](#navigationguard) | 네비게이션 가드 추가. |

### beforeResolve

탐색이 해결되기 전에 실행되는 네비게이션 가드를 추가합니다.
이 상태는 모든 컴포넌트를 로드했고,
다른 탐색 가드가 성공한 것입니다.
등록된 가드를 제거하는 함수를 반환합니다.

**시그니처**:

```typescript
beforeResolve(guard: NavigationGuard): () => void
```

_파라미터_

| 파라미터 | 타입                                  | 설명             |
| --------- | ------------------------------------- | ----------------------- |
| guard     | [`NavigationGuard`](#navigationguard) | 네비게이션 가드 추가. |

#### 예제

```js
router.beforeResolve(to => {
  if (to.meta.requiresAuth && !isAuthenticated) return false
})
```

### forward

가능하다면 `history.forward()`를 호출하여 히스토리에서 앞으로 이동합니다.
`router.go(1)`와 동일합니다.

**시그니처**:

```typescript
forward(): void
```

### getRoutes

모든 [경로 레코드](#routerecordnormalized) 전체 목록을 가져옵니다.

**시그니처**:

```typescript
getRoutes(): RouteRecordNormalized[]
```

### go

히스토리를 사용하여 앞으로 또는 뒤로 이동합니다.

**시그니처**:

```typescript
go(delta: number): void
```

_파라미터_

| 파라미터 | 타입     | 설명                                                                         |
| --------- | -------- | ----------------------------------------------------------------------------------- |
| delta     | `number` | 현재 페이지를 기준으로 이동하려는 히스토리의 위치. |

### hasRoute

인자로 전달된 이름의 경로가 존재하는지 확인합니다.

**시그니처**:

```typescript
hasRoute(name: string | symbol): boolean
```

_파라미터_

| 파라미터 | 타입               | 설명                |
| --------- | ------------------ | -------------------------- |
| name      | `string \| symbol` | 확인할 경로의 이름. |

### isReady

라우터가 초기 탐색을 완료했을 때 해결되는 Promise를 반환합니다.
즉, 초기 경로와 관련된 모든 비동기 진입 훅과 비동기 컴포넌트가 해결되었음을 의미합니다.
초기 탐색이 이미 발생한 경우 Promise는 즉시 해결됩니다.
이는 SSR에서 서버와 클라이언트 모두에서 일관된 출력을 보장하는 데 유용합니다.
서버에서는 초기 위치를 수동으로 푸시해야 하지만,
클라이언트에서는 라우터가 자동으로 URL에서 해당 위치를 선택합니다.

**시그니처**:

```typescript
isReady(): Promise<void>
```

### onError

탐색 중에 포착되지 않은 애러가 발생할 때마다, 호출되는 애러 핸들러를 추가합니다.
여기에는 동기 및 비동기적으로 발생한 애러,
탐색 가드에서 반환되거나 `next`로 전달된 애러,
경로를 렌더링하는 데 필요한 비동기 컴포넌트를 해결하려고 할 때 발생한 애러가 포함됩니다.

**시그니처**:

```typescript
onError(handler: (error: any, to: RouteLocationNormalized, from: RouteLocationNormalized) => any): () => void
```

_파라미터_

| 파라미터 | 타입                                                                              | 설명               |
| --------- | --------------------------------------------------------------------------------- | ------------------------- |
| handler   | `(error: any, to: RouteLocationNormalized, from: RouteLocationNormalized) => any` | 애러 핸들러 등록. |

### push

히스토리 스택에 항목을 푸시하여, 프로그래밍 방식으로 새 URL로 이동합니다.

**시그니처**:

```typescript
push(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
```

_파라미터_

| 파라미터 | 타입                                    | 설명                   |
| --------- | --------------------------------------- | ----------------------------- |
| to        | [`RouteLocationRaw`](#routelocationraw) | 탐색할 경로 위치. |

### removeRoute

이름으로 기존 경로를 제거합니다.

**시그니처**:

```typescript
removeRoute(name: string | symbol): void
```

_파라미터_

| 파라미터 | 타입               | 설명                 |
| --------- | ------------------ | --------------------------- |
| name      | `string \| symbol` | 제거할 경로의 이름. |

### replace

히스토리 스택의 현재 항목을 교체하여, 프로그래밍 방식으로 새 URL로 이동합니다.

**시그니처**:

```typescript
replace(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
```

_파라미터_

| 파라미터 | 타입                                    | 설명                   |
| --------- | --------------------------------------- | ----------------------------- |
| to        | [`RouteLocationRaw`](#routelocationraw) | 탐색할 경로 위치 |

### resolve

[경로 위치](#routelocationraw)의 [정규화된 버전](#routelocation)을 반환합니다.
또한 기존 `base`를 포함하는 `href` 속성도 포함합니다.

**시그니처**:

```typescript
resolve(to: RouteLocationRaw): RouteLocation & {
  href: string
}
```

_파라미터_

| 파라미터 | 타입                                    | 설명                   |
| --------- | --------------------------------------- | ----------------------------- |
| to        | [`RouteLocationRaw`](#routelocationraw) | 확인할 경로 위치 |

## RouterOptions

### history

라우터에서 사용하는 히스토리 구현 방법입니다.
대부분의 웹 앱은 `createWebHistory`를 사용해야 하지만,
제대로 구성하려면 서버가 필요합니다.
또는 `createWebHashHistory`로 해시 기반 히스토리를 사용할 수 있습니다.
이 히스토리은 서버에서 구성이 필요하지 않지만,
검색 엔진에서 전혀 처리되지 않으므로,
SEO에서 제대로 작동하지 않습니다.

**시그니처**:

```typescript
history: RouterHistory
```

#### 예제

```js
createRouter({
  history: createWebHistory(),
  // 다른 옵션...
})
```

### linkActiveClass

활성화된 [RouterLink](#router-link-props)에 적용되는 기본 클래스입니다.
아무것도 제공하지 않으면 `router-link-active`가 적용됩니다.

**시그니처**:

```typescript
linkActiveClass?: string
```

### linkExactActiveClass

정확히 활성화된 [RouterLink](#router-link-props)에 적용되는 기본 클래스입니다.
아무것도 제공하지 않으면 `router-link-exact-active`가 적용됩니다.

**시그니처**:

```typescript
linkExactActiveClass?: string
```

### parseQuery

쿼리를 파싱하기 위한 커스텀 구현.
반드시 쿼리 키와 값을 디코딩해야 합니다.
[stringifyQuery](#stringifyquery)와 대응됩니다.

**시그니처**:

```typescript
parseQuery?: (searchQuery: string) => Record<string, (string | null)[] | string | null>
```

#### 예제

[qs](https://github.com/ljharb/qs) 패키지를 사용하여 쿼리를 파싱하려는 경우,
`parseQuery`와 `stringifyQuery`를 모두 제공할 수 있습니다:

```js
import qs from 'qs'

createRouter({
  // 다른 옵션...
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
})
```

### routes

라우터에 추가해야 하는 경로의 초기 목록입니다.

**시그니처**:

```typescript
routes: RouteRecordRaw[]
```

### scrollBehavior

페이지 간 이동 시, 스크롤을 제어하는 함수입니다.
스크롤을 지연하기 위해 Promise를 반환할 수 있습니다.

**시그니처**:

```typescript
scrollBehavior?: RouterScrollBehavior
```

#### 예제

```js
function scrollBehavior(to, from, savedPosition) {
  // `to`와 `from`은 모두 경로 위치입니다.
  // `savedPosition`은 없는 경우 null일 수 있습니다.
}
```

- **참고**: [가이드 - 스크롤 동작](/guide/advanced/scroll-behavior.md)

### stringifyQuery

쿼리 객체를 문자열화하기 위한 커스텀 구현.
앞에 `?`를 붙이면 안 되며,
쿼리 키와 값을 올바르게 인코딩해야 합니다.
쿼리를 파싱하는 [parseQuery](#parsequery)와 대응됩니다.

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

[`routes` 옵션](#routeroptions) 또는 [`router.addRoute()`](#addroute)로 경로를 추가할 때,
사용자가 제공할 수 있는 경로 레코드.
경로 레코드에는 세 가지 종류가 있습니다:

- 단일 뷰(view) 레코드: `component` 옵션이 있음.
- 다중 뷰 레코드([이름이 있는 보기](/guide/essentials/named-views.md)): `components` 옵션이 있음.
- 리디렉션 레코드: 리디렉션 동작으로 해당 레코드에는 도달할 수 없기 때문에, `component` 또는 `components` 옵션을 가질 수 없음.

### path

- **타입**: `string`
- **상세**:

  레코드의 경로입니다.
  레코드가 다른 레코드의 자식이 아닌 경우, `/`로 시작해야 합니다. <br>
  파라미터 정의 가능: `/users/1` 및 `/users/posva`는 `/users/:id`와 매치됩니다.

- **참고**: [가이드 - 동적 경로 매칭](/guide/essentials/dynamic-matching.md)

### redirect

- **타입**: `RouteLocationRaw | (to: RouteLocationNormalized) => RouteLocationRaw` (선택적)
- **상세**:

  경로가 일치하는 경우, 리디렉션할 위치입니다.
  리디렉션은 네비게이션 가드보다 먼저 트리거되고,
  대상 위치로 새 탐색을 트리거합니다.
  대상 경로 위치를 수신하고, 리디렉션해야 하는 위치를 반환하는 함수일 수도 있습니다.

- **참고**: [가이드 - 리디렉션과 별칭](/guide/essentials/redirect-and-alias.md)

### children

- **타입**: Array of [`RouteRecordRaw`](#routerecordraw) (선택적)
- **상세**:

  현재 레코드의 중첩 경로입니다.

- **참고**: [가이드 - 중첩된 경로](/guide/essentials/nested-routes.md)

### alias

- **타입**: `string | string[]` (선택적)
- **상세**:

  경로의 별칭입니다.
  레코드의 복사본처럼 작동하는 추가 경로를 정의할 수 있습니다.
  이렇게 하면 `/users/:id` 경로에 `/u/:id`와 같은 별칭 경로를 활성화 할 수 있습니다.
  **`path`와 모든 `alias` 값은 동일한 파라미터를 공유해야 합니다**.

- **참고**: [가이드 - 리디렉션과 별칭](/guide/essentials/redirect-and-alias.md)

### name

- **타입**: `string | symbol` (선택적)
- **상세**:

  경로 레코드의 고유한 이름입니다.

### beforeEnter

- **타입**: [`NavigationGuard | NavigationGuard[]`](#navigationguard) (선택적)
- **상세**:

  이 레코드의 "진입 전 네비게이션 가드"입니다.
  레코드에 `redirect` 속성이 있는 경우, `beforeEnter`는 효과가 없습니다.

### props

- **타입**: `boolean | Record<string, any> | (to: RouteLocationNormalized) => Record<string, any>` (선택적)
- **상세**:

  파라미터를 `router-view`에 의해 렌더링된 컴포넌트의 prop으로 전달할 수 있습니다.
  다중 뷰(view) 레코드의 경우,
  `components`와 `props`는 전달하려는 뷰의 이름과 동일한 키를 가진 객체여야 합니다.

- **참고**: [가이드 - 경로 컴포넌트에 props 전달하기](/guide/essentials/passing-props.md)

### sensitive

- **타입**: `boolean` (선택적)
- **상세**:

  경로 매칭에 대소문자를 구분하도록 하며, 기본값은 `false`입니다.

### strict

- **타입**: `boolean` (선택적)
- **상세**:

  경로 끝에 후행 슬래시(`/`)가 있는지 여부를 엄격하게 확인합니다.
  기본값은 `false`로 기본적으로 `/users` 경로가 `/users` 및 `/users/`와 모두 매칭됨을 의미합니다.

### meta

- **타입**: [`RouteMeta`](#routemeta) (선택적)
- **상세**:

  레코드에 첨부된 커스텀 데이터입니다.

- **참고**: [가이드 - 경로 메타 필드](/guide/advanced/meta.md)

:::tip

함수형 컴포넌트를 사용하려면 `displayName`을 추가해야 합니다.

예제:

```js
const HomeView = () => h('div', 'HomePage')
// TypeScript에서는 FunctionalComponent 유형을 사용해야 합니다.
HomeView.displayName = 'HomeView'
const routes = [{ path: '/', component: HomeView }]
```

:::

## RouteRecordNormalized

[경로 레코드](#routerecordraw)의 정규화된 버전입니다.

### aliasOf

- **타입**: `RouteRecordNormalized | undefined`
- **상세**:

  이 레코드가 다른 레코드의 별칭인지 정의합니다.
  이 레코드가 원본인 경우, 이 속성은 `undefined`입니다.

### beforeEnter

- **타입**: [`NavigationGuard`](#navigationguard)
- **상세**:

  다른 곳에서 이 레코드로 진입할 때 적용될 "진입 전 네비게이션 가드".

- **참고**: [가이드 - 네비게이션 가드](/guide/advanced/navigation-guards.md)

### children

- **타입**: Array of normalized [route records](#routerecordnormalized)
- **상세**:

  이 레코드의 자식 경로 레코드입니다.
  자식 경로가 없는 경우, 빈 배열입니다.
  이 배열은 `addRoute()`와 `removeRoute()`의 호출로 업데이트되지 않습니다.

### components

- **타입**: `Record<string, Component>`
- **상세**:

  이름이 있는 뷰(view)의 모음집 객체.
  이름이 있는 뷰가 없는 경우에는 `default`키와 값만 있습니다.


### meta

- **타입**: `RouteMeta`
- **상세**:

  레코드에 첨부된 임의의 데이터입니다.

- **참고**: [가이드 - 경로 메타 필드](/guide/advanced/meta.md)

### name

- **타입**: `string | symbol | undefined`
- **상세**:

  경로 레코드의 이름입니다.
  제공되지 않은 경우 `undefined`입니다.

### path

- **타입**: `string`
- **상세**:

  레코드의 정규화된 경로입니다.
  모든 부모 `path`를 포함합니다.

### props

- **타입**: `Record<string, boolean | Function | Record<string, any>>`
- **상세**:

  각 이름이 있는 뷰(view)의 [`props` 옵션](#props) 모음집 객체입니다.
  없으면 `default`라는 속성 하나만 포함됩니다.

### redirect

- **타입**: [`RouteLocationRaw`](#routelocationraw)
- **상세**:

  경로가 일치하는 경우, 리디렉션할 위치입니다.
  리디렉션은 네비게이션 가드보다 먼저 트리거되고,
  대상 위치로 새 탐색을 트리거합니다.

## RouteLocationRaw

`router.push()`나 `redirect`에 전달하거나,
[Navigation Guards](/guide/advanced/navigation-guards.md)에서 반환하는 유저-레벨(개발자 입장에서 사용 가능한) 경로 위치입니다.

이 저수준 위치는 `/users/posva#bio`와 같은 `string`이거나, 객체 입니다:

```js
// 이 세 가지 포멧은 동일함.
router.push('/users/posva#bio')
router.push({ path: '/users/posva', hash: '#bio' })
router.push({ name: 'users', params: { username: 'posva' }, hash: '#bio' })
// 해시만 변경.
router.push({ hash: '#bio' })
// 쿼리만 변경
router.push({ query: { page: '2' } })
// 파라미터만 변경
router.push({ params: { username: 'jolyne' } })
```

참고로 `path`는 인코딩된 상태로 제공되어야 하며(예: `phantom blood`는 `phantom%20blood`으로),
`params`, `query` 및 `hash`는 인코딩되지 않아야 하며 라우터에 의해 인코딩됩니다.

저수준 경로 위치는 네비게이션 가드에서 `router.push()` 대신 `router.replace()`를 호출하는 `replace` 옵션도 지원합니다.
이것을 사용하면 `router.push()`를 호출할 때,
내부적으로 `router.replace()`를 호출합니다.

```js
router.push({ hash: '#bio', replace: true })
// 둘 다 동일함.
router.replace({ hash: '#bio' })
```

## RouteLocation

[리디렉션 레코드](#routerecordraw)를 포함할 수 있는 결정된(resolved) [RouteLocationRaw](#routelocationraw).
그 외에도 [RouteLocationNormalized](#routelocationnormalized)와 동일한 속성을 가집니다.

## RouteLocationNormalized

정규화된 경로 위치.
[리디렉션 레코드](#routerecordraw)를 가지지 않습니다.
네비게이션 가드에서 `to`와 `from`은 항상 이 유형입니다.

### fullPath

- **타입**: `string`
- **상세**:

  경로 위치와 연결된 인코딩된 URL입니다.
  `path`, `query` 및 `hash`를 포함합니다.

### hash

- **타입**: `string`
- **상세**:

  URL의 `hash` 섹션을 디코딩한 값으로, 항상 `#`으로 시작합니다.
  URL에 `hash`가 없으면 빈 문자열입니다.

### query

- **타입**: `Record<string, LocationQueryValue | LocationQueryValue[]>`
- **상세**:

  URL의 `search` 섹션에서 추출된 디코딩된 쿼리 파라미터의 모음집(객체)입니다.

### matched

- **타입**: [`RouteRecordNormalized[]`](#routerecordnormalized)
- **상세**:

  주어진 경로 위치와 일치하는 [정규화된 경로 레코드](#routerecordnormalized)로 이루어진 배열입니다.

### meta

- **타입**: `RouteMeta`
- **상세**:

  일치하는 모든 레코드에 첨부된 임의의 데이터가 부모에서 자식으로 병합(비재귀적으로)된 객체.

- **참고**: [가이드 - 경로 메타 필드](/guide/advanced/meta.md)

### name

- **타입**: `string | symbol | undefined | null`
- **상세**:

  경로 레코드의 이름입니다.
  제공되지 않은 경우, `undefined`입니다.

### params

- **타입**: `Record<string, string | string[]>`
- **상세**:

  `path`에서 추출된 디코딩된 파라미터의 모음집(객체)입니다.

### path

- **타입**: `string`
- **상세**:

  경로 위치와 연결된 URL의 인코딩된 `pathname` 섹션입니다.

### redirectedFrom

- **타입**: [`RouteLocation`](#routelocation)
- **상세**:

  `redirect` 옵션이 감지되었거나 네비게이션 가드에서 `next()`를 호출한 경우, 현재 위치에 도달하기 전 최초에 접근하려고 했던 경로 위치.
  리디렉션이 없으면 `undefined`입니다.

## NavigationFailure

### from

- **타입**: [`RouteLocationNormalized`](#routelocationnormalized)
- **상세**:

  탐색을 시작한 경로 위치.

### to

- **타입**: [`RouteLocationNormalized`](#routelocationnormalized)
- **상세**:

  탐색하려고 한 경로 위치.

### type

- **타입**: [`NavigationFailureType`](#navigationfailuretype)
- **상세**:

  탐색 실패 유형.

- **참고**: [가이드 - 탐색 실패](/guide/advanced/navigation-failures.md)

## NavigationGuard

- **인자**:

  - [`RouteLocationNormalized`](#routelocationnormalized) to - Route location we are navigating to
  - [`RouteLocationNormalized`](#routelocationnormalized) from - Route location we are navigating from
  - `Function` next (선택적) - Callback to validate the navigation

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