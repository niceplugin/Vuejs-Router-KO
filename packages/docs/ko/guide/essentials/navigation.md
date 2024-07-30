---
sidebarDepth: 0
---

# 프로그래매틱 탐색 %{#Programmatic-Navigation}%

<VueSchoolLink v-if="false"
href="https://vueschool.io/lessons/vue-router-4-programmatic-navigation"
title="Learn how to navigate programmatically"
/>

`<router-link>`를 사용하여 선언적으로 탐색을 위한 앵커 태그를 만드는 것 외에도, 라우터의 인스턴스 메서드를 사용하여 이를 프로그래매틱하게 수행할 수 있습니다.

## 다른 위치로 이동하기 %{#Navigate-to-a-different-location}%

**참고: 아래 예제에서는 라우터 인스턴스를 `router`로 참조합니다. 컴포넌트 내부에서는 `$router` 프로퍼티를 사용하여 라우터에 접근할 수 있습니다. 예를 들어, `this.$router.push(...)`와 같이 사용합니다. Composition API를 사용하는 경우, [`useRouter()`](../advanced/composition-api)를 호출하여 라우터에 접근할 수 있습니다.**

다른 URL로 이동하려면 `router.push`를 사용합니다. 이 메서드는 히스토리 스택에 새 항목을 추가하므로, 유저가 브라우저의 뒤로 가기 버튼을 클릭하면 이전 URL로 돌아갈 수 있습니다.

이 메서드는 `<router-link>`를 클릭할 때 내부적으로 호출되므로, `<router-link :to="...">`를 클릭하는 것은 `router.push(...)`를 호출하는 것과 동일합니다.

| 선언적                       | 프로그래매틱             |
|---------------------------|--------------------|
| `<router-link :to="...">` | `router.push(...)` |

인자는 문자열 경로이거나 위치를 설명하는 객체일 수 있습니다. 예:

```js
// 문자열 경로
router.push('/users/eduardo')

// 경로를 가진 객체
router.push({ path: '/users/eduardo' })

// 라우터가 URL을 만들도록 파라미터가 있는 네임드 라우트
router.push({ name: 'user', params: { username: 'eduardo' } })

// 쿼리를 포함한 결과, /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 해시를 포함한 결과, /about#team
router.push({ path: '/about', hash: '#team' })
```

**참고**: 위 예제에서 보듯이 `query`는 그렇지 않지만 `params`는 `path`가 제공된 경우 무시되므로, `path` 대신에 라우트의 `name`을 제공하거나 모든 파라미터를 포함한 전체 `path`를 수동으로 지정해야 합니다:

```js
const username = 'eduardo'
// 우리는 URL을 수동으로 만들수 있지만 인코딩을 직접 처리해야 합니다.
router.push(`/user/${username}`) // -> /user/eduardo
// 위와 동일함.
router.push({ path: `/user/${username}` }) // -> /user/eduardo
// 가능하다면 `name`과 `params`를 사용하여 자동 URL 인코딩의 이점을 누리세요.
router.push({ name: 'user', params: { username } }) // -> /user/eduardo
// `params`는 `path`와 함께 사용할 수 없습니다.
router.push({ path: '/user', params: { username } }) // -> /user
```

`params`를 지정할 때는 반드시 `string`, `number` (또는 [반복 가능한 파라미터](./route-matching-syntax.md#Repeatable-params)의 경우 이들의 배열)를 제공해야 합니다. **다른 타입(예: 객체, 불리언 등)은 자동으로 문자열로 변환**됩니다. [선택적 파라미터](./route-matching-syntax.md#Optional-parameters)의 경우, 이를 제거하려면 빈 문자열(`""`)이나 `null`을 값으로 제공할 수 있습니다.

`to` 프로퍼티는 `router.push`와 동일한 종류의 객체를 허용하므로, 동일한 규칙이 적용됩니다.

`router.push` 및 다른 모든 탐색 관련 메서드는 탐색이 완료되었는지와 성공 여부를 확인할 수 있도록 *Promise*를 반환합니다. 이에 대해서는 [탐색 처리](../advanced/navigation-failures.md)에서 더 자세히 다룰 것입니다.

## 현재 위치 대체하기 %{#Replace-current-location}%

`router.push`처럼 동작하지만, 이름에서 알 수 있듯이 새로운 히스토리 항목을 추가하지 않고 현재 항목을 대체한다는 점이 다릅니다.

| 선언적                               | 프로그래매틱                |
|-----------------------------------|-----------------------|
| `<router-link :to="..." replace>` | `router.replace(...)` |

`router.push`에 전달되는 `to` 인자에 `replace: true` 프로퍼티를 직접 추가하는 것도 가능합니다:

```js
router.push({ path: '/home', replace: true })
// 위와 동일함.
router.replace({ path: '/home' })
```

## 특정 히스토리로 이동하기 %{#Traverse-history}%

<VueSchoolLink v-if="false"
href="https://vueschool.io/lessons/go-back"
title="Learn how to use Vue Router to go back"
/>

이 메서드는 `window.history.go(n)`과 유사하게 히스토리 스택에서 몇 단계 앞으로 또는 뒤로 이동할지를 나타내는 단일 정수를 매개변수로 받습니다.

예제:

```js
// 하나의 레코드 앞으로 이동, `router.forward()`와 동일
router.go(1)

// 하나의 레코드 뒤로 이동, `router.back()`과 동일
router.go(-1)

// 3개의 레코드 앞으로 이동
router.go(3)

// 그만큼의 레코드이 없으면 조용히 실패
router.go(-100)
router.go(100)
```

## 히스토리 다루기 %{#History-Manipulation}%

`router.push`, `router.replace`, `router.go`가 [`window.history.pushState`, `window.history.replaceState`, `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History)에 대응되는 함수라는 점을 이미 눈치채셨을 것입니다. 이들은 실제로 `window.history` API를 모방합니다.

따라서 [브라우저 히스토리 API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)에 익숙하다면 Vue Router를 사용하여 히스토리를 조작하는 것이 익숙하게 느껴질 것입니다.

Vue Router의 탐색 메서드(`push`, `replace`, `go`)는 라우터 인스턴스를 생성할 때 전달된 `history` 옵션과 관계없이 일관되게 작동합니다.
