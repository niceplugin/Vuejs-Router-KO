---
sidebarDepth: 0
---

# 프로그래밍 방식 탐색 %{#programmatic-navigation}%

<VueSchoolLink
href="https://vueschool.io/lessons/vue-router-4-programmatic-navigation"
title="Learn how to navigate programmatically"
/>

`<router-link>`로 생성된 앵커 태그로 탐색하는 방법 외에도, 라우터의 인스턴스 메서드를 사용하여 프로그래밍 방식으로 탐색을 할 수 있습니다.

## 다른 위치로 이동 %{#navigate-to-a-different-location}%

**참고: 아래 예시에서 라우터 인스턴스를 `router`라고 합니다. 컴포넌트 내에서 라우터에 접근하려면 `$router` 속성을 사용하세요. 예를 들어, `this.$router.push(...)`와 같이 사용할 수 있습니다. Composition API를 사용하는 경우, [`useRouter()`](../advanced/composition-api)를 호출하여 라우터에 접근할 수 있습니다.**

다른 URL로 이동하려면 `router.push`를 사용해야 합니다. 이 메서드는 새 항목을 히스토리 스택으로 푸시하므로, 사용자가 브라우저의 뒤로가기 버튼을 클릭하면 이전 URL로 이동합니다.

이것은 `<router-link>`를 클릭할 때 내부적으로 호출되는 메서드이므로, `<router-link :to="...">`를 클릭하는 것은 `router.push(...)`를 호출하는 것과 같습니다.

| 선언 방식                   | 프로그래밍 방식       |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

이 메서드의 인자는 "문자열 라우트" 또는 "위치를 나타내는 객체"일 수 있습니다. 예제:

```js
// 문자열 라우트
router.push('/users/eduardo')

// 라우트(path)를 나타낸 객체
router.push({ path: '/users/eduardo' })

// 파라미터 값이 있는 이름을 가진 라우트
router.push({ name: 'user', params: { username: 'eduardo' } })

// 쿼리(query) 사용, 이동할 라우트: /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 해시(hash) 사용, 이동할 라우트: /about#team
router.push({ path: '/about', hash: '#team' })
```

**참고**: `path`가 제공되면 `params`가 무시됩니다. 대신 라우트에 `name`을 제공하거나, 수동으로 파라미터를 포함한 전체 `path`를 지정해줘야 합니다. `query`의 경우, 위의 예제처럼 이러한 주의사항에 해당되지 않습니다.

```js
const username = 'eduardo'
// URL을 직접 만들 수 있지만, 인코딩을 직접 처리해야 함.
router.push(`/user/${username}`) // -> /user/eduardo
// 위와 동일함.
router.push({ path: `/user/${username}` }) // -> /user/eduardo
// 가급적 `name` 및 `params` 사용을 추천, 자동으로 URL을 인코딩.
router.push({ name: 'user', params: { username } }) // -> /user/eduardo
// `params`는 `path`와 함께 사용할 수 없음.
router.push({ path: '/user', params: { username } }) // -> /user
```

`params`를 지정할 때 `string`, `number` 또는 `array`([반복 가능한 파라미터](./route-matching-syntax.md#Repeatable-params)일 경우)를 제공해야 합니다. **다른 모든 유형(예: 객체, 불린 등)은 자동으로 문자열로 변환됩니다**. [선택적 파라미터](./route-matching-syntax.md#optional-parameters)의 경우, 빈 문자열(`""`) 또는 `null`을 값으로 제공하여 제거할 수 있습니다.

`<router-link>`의 `to`는 `router.push`와 동일한 객체를 허용하므로 두 객체 모두 똑같은 규칙이 적용됩니다.

`router.push`를 포함한 모든 탐색 메서드는 탐색이 완료될 때까지 기다렸다가 성공했는지 실패했는지 알 수 있도록 하는 `Promise`를 반환합니다. [탐색 결과 대기하기](../advanced/navigation-failures.md)에서 더 자세히 이야기하겠습니다.

## 현재 위치 바꾸기 %{#replace-current-location}%

이것은 `router.push`처럼 작동합니다. 유일한 차이점은 이름에서 알 수 있듯이, 새 히스토리 항목을 푸시하지 않고 탐색하는 것으로 현재 항목을 대체합니다.

| 선언 방식                           | 프로그래밍 방식          |
|-----------------------------------| --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

`router.push`에 전달되는 `to` 인수에 `replace: true` 속성을 직접 추가하는 것도 가능합니다:

```js
router.push({ path: '/home', replace: true })
// 이 둘은 동일함.
router.replace({ path: '/home' })
```

## 히스토리 이동 %{#traverse-history}%

<VueSchoolLink
href="https://vueschool.io/lessons/go-back"
title="Learn how to use Vue Router to go back"
/>

이 메서드는 `window.history.go(n)`과 유사하게, 히스토리 스택에서 앞 또는 뒤로 이동할 단계를 나타내는 정수를 단일 인자로 사용합니다.

예제:

```js
// `router.forward()`와 동일하게 앞으로 한 번 이동함.
router.go(1)

// `router.back()`과 동일하게 뒤로 한 번 이동함.
router.go(-1)

// 앞으로 3 번 이동함.
router.go(3)

// 이동 가능한 값을 초과하는 경우, 작동하지 않음(애러가 발생하진 않음).
router.go(-100)
router.go(100)
```

## 히스토리 조작 %{#history-manipulation}%

`router.push`, `router.replace`, `router.go`는 `window.history` API의 [`window.history.pushState`, `window.history.replaceState`, `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History)처럼 작동합니다.

따라서 이미 [브라우저 히스토리 API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)에 익숙하다면, Vue Router를 사용할 때 히스토리 조작이 익숙할 것입니다.

Vue Router의 내비게이션 메서드(`push`, `replace`, `go`)는 라우터 인스턴스를 생성할 때 전달된 `history` 옵션에 관계없이 일관된 방식으로 작동한다는 점을 언급하는 것이 중요합니다.
