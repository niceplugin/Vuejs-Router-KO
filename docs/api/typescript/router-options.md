# RouterOptions {#routeroptions}

## history

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

### 예제

```js
createRouter({
  history: createWebHistory(),
  // 다른 옵션...
})
```

## linkActiveClass

활성화된 [RouterLink](/api/built-in-components/router-link-props.html)에 적용되는 기본 클래스입니다.
아무것도 제공하지 않으면 `router-link-active`가 적용됩니다.

**시그니처**:

```typescript
linkActiveClass?: string
```

## linkExactActiveClass

정확히 활성화된 [RouterLink](/api/built-in-components/router-link-props.html)에 적용되는 기본 클래스입니다.
아무것도 제공하지 않으면 `router-link-exact-active`가 적용됩니다.

**시그니처**:

```typescript
linkExactActiveClass?: string
```

## parseQuery

쿼리를 파싱하기 위한 커스텀 구현.
반드시 쿼리 키와 값을 디코딩해야 합니다.
[stringifyQuery](/api/typescript/router-options.html#stringifyquery)와 대응됩니다.

**시그니처**:

```typescript
parseQuery?: (searchQuery: string) => Record<string, (string | null)[] | string | null>
```

### 예제

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

## routes

라우터에 추가해야 하는 경로의 초기 목록입니다.

**시그니처**:

```typescript
routes: RouteRecordRaw[]
```

## scrollBehavior

페이지 간 이동 시, 스크롤을 제어하는 함수입니다.
스크롤을 지연하기 위해 Promise를 반환할 수 있습니다.

**시그니처**:

```typescript
scrollBehavior?: RouterScrollBehavior
```

### 예제

```js
function scrollBehavior(to, from, savedPosition) {
  // `to`와 `from`은 모두 경로 위치입니다.
  // `savedPosition`은 없는 경우 null일 수 있습니다.
}
```

- **참고**: [가이드 - 스크롤 동작](/guide/advanced/scroll-behavior.md)

## stringifyQuery

쿼리 객체를 문자열화하기 위한 커스텀 구현.
앞에 `?`를 붙이면 안 되며,
쿼리 키와 값을 올바르게 인코딩해야 합니다.
쿼리를 파싱하는 [parseQuery](/api/typescript/router-options.html#parsequery)와 대응됩니다.

**시그니처**:

```typescript
stringifyQuery?: (
  query: Record<
    string | number,
    string | number | null | undefined | (string | number | null | undefined)[]
  >
) => string
```