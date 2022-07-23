# RouteRecordNormalized

[경로 레코드](/api/typescript/route-record-raw.html)의 정규화된 버전입니다.

## aliasOf

- **타입**: `RouteRecordNormalized | undefined`
- **상세**:

  이 레코드가 다른 레코드의 별칭인지 정의합니다.
  이 레코드가 원본인 경우, 이 속성은 `undefined`입니다.

## beforeEnter

- **타입**: [`NavigationGuard`](/api/typescript/navigation-guard.html)
- **상세**:

  다른 곳에서 이 레코드로 진입할 때 적용될 "진입 전 네비게이션 가드".

- **참고**: [가이드 - 네비게이션 가드](/guide/advanced/navigation-guards.md)

## children

- **타입**: Array of normalized [route records](/api/typescript/route-record-normalized.html)
- **상세**:

  이 레코드의 자식 경로 레코드입니다.
  자식 경로가 없는 경우, 빈 배열입니다.
  이 배열은 `addRoute()`와 `removeRoute()`의 호출로 업데이트되지 않습니다.

## components

- **타입**: `Record<string, Component>`
- **상세**:

  이름이 있는 뷰(view)의 모음집 객체.
  이름이 있는 뷰가 없는 경우에는 `default`키와 값만 있습니다.


## meta

- **타입**: `RouteMeta`
- **상세**:

  레코드에 첨부된 임의의 데이터입니다.

- **참고**: [가이드 - 경로 메타 필드](/guide/advanced/meta.md)

## name

- **타입**: `string | symbol | undefined`
- **상세**:

  경로 레코드의 이름입니다.
  제공되지 않은 경우 `undefined`입니다.

## path

- **타입**: `string`
- **상세**:

  레코드의 정규화된 경로입니다.
  모든 부모 `path`를 포함합니다.

## props

- **타입**: `Record<string, boolean | Function | Record<string, any>>`
- **상세**:

  각 이름이 있는 뷰(view)의 [`props` 옵션](/api/typescript/route-record-raw.html#props) 모음집 객체입니다.
  없으면 `default`라는 속성 하나만 포함됩니다.

## redirect

- **타입**: [`RouteLocationRaw`](/api/typescript/route-location-raw.html)
- **상세**:

  경로가 일치하는 경우, 리디렉션할 위치입니다.
  리디렉션은 네비게이션 가드보다 먼저 트리거되고,
  대상 위치로 새 탐색을 트리거합니다.