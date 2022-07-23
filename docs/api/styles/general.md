# 공통 {#general}

## createRouter

Vue 앱에서 사용할 수 있는 라우터 인스턴스를 만듭니다.
전달할 수 있는 모든 속성 목록은 [`RouterOptions`](/api/typescript/router-options.html)를 확인하십시오.

**시그니처**:

```typescript
export declare function createRouter(options: RouterOptions): Router
```

### 파라미터

| 파라미터    | 타입                              | 설명         |
|---------|---------------------------------|------------|
| options | [RouterOptions](/api/typescript/router-options.html) | 라우터 초기화 옵션 |

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
**SEO가 중요하다면 [`createWebHistory`](/api/styles/general.html#createwebhistory)를 사용해야 합니다**.

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
특정 실패를 확인하기 위해 [isNavigationFailure](/guide/advanced/navigation-failures.html#differentiating-navigation-failures)에 전달할 수 있습니다.
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

- **타입**: [`RouteLocationNormalized`](/api/typescript/route-location-normalized.html)
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
