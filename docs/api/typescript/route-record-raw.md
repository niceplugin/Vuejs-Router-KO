# RouteRecordRaw

[`routes` 옵션](/api/typescript/router-options.html) 또는 [`router.addRoute()`](/api/typescript/router-methods.html#addroute)로 경로를 추가할 때,
사용자가 제공할 수 있는 경로 레코드.
경로 레코드에는 세 가지 종류가 있습니다:

- 단일 뷰(view) 레코드: `component` 옵션이 있음.
- 다중 뷰 레코드([이름이 있는 보기](/guide/essentials/named-views.md)): `components` 옵션이 있음.
- 리디렉션 레코드: 리디렉션 동작으로 해당 레코드에는 도달할 수 없기 때문에, `component` 또는 `components` 옵션을 가질 수 없음.

## path

- **타입**: `string`
- **상세**:

  레코드의 경로입니다.
  레코드가 다른 레코드의 자식이 아닌 경우, `/`로 시작해야 합니다. <br>
  파라미터 정의 가능: `/users/1` 및 `/users/posva`는 `/users/:id`와 매치됩니다.

- **참고**: [가이드 - 동적 경로 매칭](/guide/essentials/dynamic-matching.md)

## redirect

- **타입**: `RouteLocationRaw | (to: RouteLocationNormalized) => RouteLocationRaw` (선택적)
- **상세**:

  경로가 일치하는 경우, 리디렉션할 위치입니다.
  리디렉션은 네비게이션 가드보다 먼저 트리거되고,
  대상 위치로 새 탐색을 트리거합니다.
  대상 경로 위치를 수신하고, 리디렉션해야 하는 위치를 반환하는 함수일 수도 있습니다.

- **참고**: [가이드 - 리디렉션과 별칭](/guide/essentials/redirect-and-alias.md)

## children

- **타입**: Array of [`RouteRecordRaw`](/api/typescript/route-record-raw.html) (선택적)
- **상세**:

  현재 레코드의 중첩 경로입니다.

- **참고**: [가이드 - 중첩된 경로](/guide/essentials/nested-routes.md)

## alias

- **타입**: `string | string[]` (선택적)
- **상세**:

  경로의 별칭입니다.
  레코드의 복사본처럼 작동하는 추가 경로를 정의할 수 있습니다.
  이렇게 하면 `/users/:id` 경로에 `/u/:id`와 같은 별칭 경로를 활성화 할 수 있습니다.
  **`path`와 모든 `alias` 값은 동일한 파라미터를 공유해야 합니다**.

- **참고**: [가이드 - 리디렉션과 별칭](/guide/essentials/redirect-and-alias.md)

## name

- **타입**: `string | symbol` (선택적)
- **상세**:

  경로 레코드의 고유한 이름입니다.

## beforeEnter

- **타입**: [`NavigationGuard | NavigationGuard[]`](/api/typescript/navigation-guard.html) (선택적)
- **상세**:

  이 레코드의 "진입 전 네비게이션 가드"입니다.
  레코드에 `redirect` 속성이 있는 경우, `beforeEnter`는 효과가 없습니다.

## props

- **타입**: `boolean | Record<string, any> | (to: RouteLocationNormalized) => Record<string, any>` (선택적)
- **상세**:

  파라미터를 `router-view`에 의해 렌더링된 컴포넌트의 prop으로 전달할 수 있습니다.
  다중 뷰(view) 레코드의 경우,
  `components`와 `props`는 전달하려는 뷰의 이름과 동일한 키를 가진 객체여야 합니다.

- **참고**: [가이드 - 경로 컴포넌트에 props 전달하기](/guide/essentials/passing-props.md)

## sensitive

- **타입**: `boolean` (선택적)
- **상세**:

  경로 매칭에 대소문자를 구분하도록 하며, 기본값은 `false`입니다.

## strict

- **타입**: `boolean` (선택적)
- **상세**:

  경로 끝에 후행 슬래시(`/`)가 있는지 여부를 엄격하게 확인합니다.
  기본값은 `false`로 기본적으로 `/users` 경로가 `/users` 및 `/users/`와 모두 매칭됨을 의미합니다.

## meta

- **타입**: `RouteMeta` (선택적)
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