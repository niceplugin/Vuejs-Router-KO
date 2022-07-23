# Router 메서드 {#router-methods}

## addRoute

기존 경로의 자식으로 새 [경로 레코드](/api/typescript/route-record-raw.html)를 추가합니다.
경로에 `name` 값이 있고, 동일한 값을 가진 기존 경로가 이미 있으면, 먼저 제거 후 추가합니다.

**시그니처**:

```typescript
addRoute(parentName: string | symbol, route: RouteRecordRaw): () => void
```

_파라미터_

| 파라미터  | 타입                                | 설명                                             |
| ---------- | ----------------------------------- | ------------------------------------------------------- |
| parentName | `string \| symbol`                  | `route`가 추가되어야 하는 상위 경로 레코드. |
| route      | [`RouteRecordRaw`](/api/typescript/route-record-raw.html) | 경로 레코드 추가.                                     |

## addRoute

라우터에 새 [경로 레코드](/api/typescript/route-record-raw.html)를 추가합니다.
경로에 `name` 값이 있고, 동일한 값을 가진 기존 경로가 이미 있으면, 먼저 제거 후 추가합니다.

**시그니처**:

```typescript
addRoute(route: RouteRecordRaw): () => void
```

_파라미터_

| 파라미터 | 타입                                | 설명         |
| --------- | ----------------------------------- | ------------------- |
| route     | [`RouteRecordRaw`](/api/typescript/route-record-raw.html) | 경로 레코드 추가. |

:::tip
경로를 추가해도 새 탐색이 트리거되지 않습니다.
즉, 새 탐색이 트리거되지 않는 한 추가된 경로는 표시되지 않습니다.
:::

## afterEach

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

### 예제

```js
router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    console.log('탐색 실패: ', failure)
  }
})
```

## back

가능하다면 `history.back()`을 호출하여 히스토리에서 뒤로 이동합니다.
`router.go(-1)`와 동일합니다.

**시그니처**:

```typescript
back(): void
```

## beforeEach

탐색 전에 실행되는 네비게이션 가드를 추가합니다.
등록된 가드를 제거하는 함수를 반환합니다.

**시그니처**:

```typescript
beforeEach(guard: NavigationGuard): () => void
```

_파라미터_

| 파라미터 | 타입                                  | 설명             |
| --------- | ------------------------------------- | ----------------------- |
| guard     | [`NavigationGuard`](/api/typescript/navigation-guard.html) | 네비게이션 가드 추가. |

## beforeResolve

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
| guard     | [`NavigationGuard`](/api/typescript/navigation-guard.html) | 네비게이션 가드 추가. |

### 예제

```js
router.beforeResolve(to => {
  if (to.meta.requiresAuth && !isAuthenticated) return false
})
```

## forward

가능하다면 `history.forward()`를 호출하여 히스토리에서 앞으로 이동합니다.
`router.go(1)`와 동일합니다.

**시그니처**:

```typescript
forward(): void
```

## getRoutes

모든 [경로 레코드](/api/typescript/route-record-normalized.html) 전체 목록을 가져옵니다.

**시그니처**:

```typescript
getRoutes(): RouteRecordNormalized[]
```

## go

히스토리를 사용하여 앞으로 또는 뒤로 이동합니다.

**시그니처**:

```typescript
go(delta: number): void
```

_파라미터_

| 파라미터 | 타입     | 설명                                                                         |
| --------- | -------- | ----------------------------------------------------------------------------------- |
| delta     | `number` | 현재 페이지를 기준으로 이동하려는 히스토리의 위치. |

## hasRoute

인자로 전달된 이름의 경로가 존재하는지 확인합니다.

**시그니처**:

```typescript
hasRoute(name: string | symbol): boolean
```

_파라미터_

| 파라미터 | 타입               | 설명                |
| --------- | ------------------ | -------------------------- |
| name      | `string \| symbol` | 확인할 경로의 이름. |

## isReady

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

## onError

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

## push

히스토리 스택에 항목을 푸시하여, 프로그래밍 방식으로 새 URL로 이동합니다.

**시그니처**:

```typescript
push(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
```

_파라미터_

| 파라미터 | 타입                                    | 설명                   |
| --------- | --------------------------------------- | ----------------------------- |
| to        | [`RouteLocationRaw`](/api/typescript/route-location-raw.html) | 탐색할 경로 위치. |

## removeRoute

이름으로 기존 경로를 제거합니다.

**시그니처**:

```typescript
removeRoute(name: string | symbol): void
```

_파라미터_

| 파라미터 | 타입               | 설명                 |
| --------- | ------------------ | --------------------------- |
| name      | `string \| symbol` | 제거할 경로의 이름. |

## replace

히스토리 스택의 현재 항목을 교체하여, 프로그래밍 방식으로 새 URL로 이동합니다.

**시그니처**:

```typescript
replace(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
```

_파라미터_

| 파라미터 | 타입                                    | 설명                   |
| --------- | --------------------------------------- | ----------------------------- |
| to        | [`RouteLocationRaw`](/api/typescript/route-location-raw.html) | 탐색할 경로 위치 |

## resolve

[경로 위치](/api/typescript/route-location-raw.html)의 [정규화된 버전](/api/typescript/route-location.html)을 반환합니다.
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
| to        | [`RouteLocationRaw`](/api/typescript/route-location-raw.html) | 확인할 경로 위치 |
