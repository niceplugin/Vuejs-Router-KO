# RouteLocationNormalized

정규화된 경로 위치.
[리디렉션 레코드](/api/typescript/route-record-raw.html)를 가지지 않습니다.
네비게이션 가드에서 `to`와 `from`은 항상 이 유형입니다.

## fullPath

- **타입**: `string`
- **상세**:

  경로 위치와 연결된 인코딩된 URL입니다.
  `path`, `query` 및 `hash`를 포함합니다.

## hash

- **타입**: `string`
- **상세**:

  URL의 `hash` 섹션을 디코딩한 값으로, 항상 `#`으로 시작합니다.
  URL에 `hash`가 없으면 빈 문자열입니다.

## query

- **타입**: `Record<string, LocationQueryValue | LocationQueryValue[]>`
- **상세**:

  URL의 `search` 섹션에서 추출된 디코딩된 쿼리 파라미터의 모음집(객체)입니다.

## matched

- **타입**: [`RouteRecordNormalized[]`](/api/typescript/route-record-normalized.html)
- **상세**:

  주어진 경로 위치와 일치하는 [정규화된 경로 레코드](/api/typescript/route-record-normalized.html)로 이루어진 배열입니다.

## meta

- **타입**: `RouteMeta`
- **상세**:

  일치하는 모든 레코드에 첨부된 임의의 데이터가 부모에서 자식으로 병합(비재귀적으로)된 객체.

- **참고**: [가이드 - 경로 메타 필드](/guide/advanced/meta.md)

## name

- **타입**: `string | symbol | undefined | null`
- **상세**:

  경로 레코드의 이름입니다.
  제공되지 않은 경우, `undefined`입니다.

## params

- **타입**: `Record<string, string | string[]>`
- **상세**:

  `path`에서 추출된 디코딩된 파라미터의 모음집(객체)입니다.

## path

- **타입**: `string`
- **상세**:

  경로 위치와 연결된 URL의 인코딩된 `pathname` 섹션입니다.

## redirectedFrom

- **타입**: [`RouteLocation`](/api/typescript/route-location.html)
- **상세**:

  `redirect` 옵션이 감지되었거나 네비게이션 가드에서 `next()`를 호출한 경우, 현재 위치에 도달하기 전 최초에 접근하려고 했던 경로 위치.
  리디렉션이 없으면 `undefined`입니다.