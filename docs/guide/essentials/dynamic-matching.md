# 파라미터를 사용한 동적 경로 매칭 %{#dynamic-route-matching-with-params}%

<VueSchoolLink
href="https://vueschool.io/lessons/dynamic-routes"
title="Learn about dynamic route matching with params"
/>

주어진 경로의 패턴에 해당하는 컴포넌트를 매핑해야하는 경우가 자주 있습니다. 예를 들어 모든 사용자에게 렌더링되어야 하지만, 사용자 ID가 다른 `User` 컴포넌트가 있을 수 있습니다. Vue Router에서 경로에 동적 세그먼트를 사용하여 구현할 수 있습니다. 이 세그먼트를 **파라미터**(param)라고 합니다:

```js
const User = {
  template: '<div>사용자</div>',
}

// 이 경로들은 `createRouter`에 전달됨.
const routes = [
  // 동적 세그먼트는 콜론으로 시작.
  { path: '/users/:id', component: User },
]
```

이제 `/users/mike`나 `/users/john`과 같은 URL은 모두 동일한 경로로 매핑됩니다.

파라미터는 콜론 `:`으로 표시합니다. 경로가 일치하면 파라미터 값은 모든 컴포넌트에서 `this.$route.params`로 노출됩니다. 따라서 `User` 템플릿을 다음과 같이 변경하면, 현재 사용자 ID를 렌더링할 수 있습니다:

```js
const User = {
  template: '<div>사용자 {{ $route.params.id }}</div>',
}
```

동일한 경로에 여러 파라미터가 있을 수 있으며, `$route.params`의 해당 필드에 매핑됩니다. 예:

| 패턴                            | 매치된 경로               | \$route.params                           |
|--------------------------------|--------------------------| ---------------------------------------- |
| /users/:username               | /users/eduardo           | `{ username: 'eduardo' }`                |
| /users/:username/posts/:postId | /users/eduardo/posts/123 | `{ username: 'eduardo', postId: '123' }` |

`$route` 객체는 `$route.params` 외에도 `$route.query`(URL에 쿼리가 있는 경우), `$route.hash` 등과 같은 다른 유용한 정보도 노출합니다. 자세한 내용은 [API 참조](/api/interfaces/RouteLocationNormalized.html)에서 확인할 수 있습니다.

이 예제의 작동 데모는 [여기](https://codesandbox.io/s/route-params-vue-router-examples-mlb14?from-embed&initialpath=%2Fusers%2Feduardo%2Fposts%2F1)에서 찾을 수 있습니다.

<!-- <iframe
  src="https://codesandbox.io/embed//route-params-vue-router-examples-mlb14?fontsize=14&theme=light&view=preview&initialpath=%2Fusers%2Feduardo%2Fposts%2F1"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Route Params example"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe> -->

## 파라미터 변경에 반응하기 %{#reacting-to-params-changes}%

<VueSchoolLink
href="https://vueschool.io/lessons/reacting-to-param-changes"
title="Learn how to react to param changes"
/>

파라미터가 있는 경로를 사용하는 경우, 사용자가 `/users/mike`에서 `/users/john`으로 이동할 때, **동일한 컴포넌트 인스턴스가 재사용된다**는 것에 주의해야 합니다. 두 경로 모두 동일한 컴포넌트를 렌더링하므로 이전 인스턴스를 삭제한 다음 새 인스턴스를 만드는 것보다 더 효율적입니다. 그러나 이것은 **컴포넌트의 수명 주기 훅이 호출되지 않음을 의미**합니다.

동일한 컴포넌트에서 파라미터 변경 사항에 반응하기 위해, `$route` 객체의 어떠한 속성이라도 감시(`watch`)할 수 있습니다.

```js
const User = {
  template: '...',
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 경로 변경에 반응하기...
      }
    )
  },
}
```

또는 [네비게이션 가드](../advanced/navigation-guards.md) `beforeRouteUpdate`를 사용하여 탐색을 취소할 수도 있습니다:

```js
const User = {
  template: '...',
  async beforeRouteUpdate(to, from) {
    // 경로 변경에 반응하기...
    this.userData = await fetchUser(to.params.id)
  },
}
```

## 모두 예외처리 / 404 Not found 경로 %{#catch-all-404-not-found-route}%

<VueSchoolLink
href="https://vueschool.io/lessons/404-not-found-page"
title="Learn how to make a catch all/404 not found route"
/>

일반 파라미터는 `/`로 구분된 일부 URL 문자만 매치합니다. **모든 것**과 일치시키려면 파라미터 바로 뒤에 괄호 안에 정규식을 추가하여 맞춤 파라미터를 사용할 수 있습니다.

```js
const routes = [
  // 모든 것과 매치되며, 값은 `$route.params.pathMatch`에 할당됨.
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // `/user-`로 시작하는 모든 것과 일치하고, 값은 `$route.params.afterUser`에 할당됨.
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```

이 특정 시나리오에서는 괄호 사이에 [커스텀 정규 표현식](route-matching-syntax.md#custom-regexp-in-params)을 사용하고, `pathMatch` 파라미터를 [선택적으로 반복 가능](route-matching-syntax.md#optional-parameters)하게 만듭니다. 이를 통해 필요한 경우 `path`를 배열로 분할하여 경로를 직접 탐색할 수 있습니다:

```js
this.$router.push({
  name: 'NotFound',
  // `//`로 시작하는 URL을 피하기 위해, 첫 번째 문자 `/`만 제거하고 현재 경로를 유지
  params: { pathMatch: this.$route.path.substring(1).split('/') },
  // 존재하는 경우, 기존 쿼리 및 해시 유지
  query: this.$route.query,
  hash: this.$route.hash,
})
```

참고: [반복 가능한 파라미터](route-matching-syntax.md#Repeatable-params)

[히스토리 모드](history-mode.md)를 사용하는 경우, 지침에 따라 서버를 올바르게 구성해야 합니다.

## 고급 매칭 패턴 %{#advanced-matching-patterns}%

Vue Router는 `express`에서 사용하는 자체 경로 매칭 문법에서 영감을 받았습니다. 선택적 매개변수, 0개 이상/하나 이상의 요구사항, 커스텀 정규식 패턴과 같은 많은 고급 매칭 패턴을 지원합니다. [고급 매칭](route-matching-syntax.md) 문서에서 자세하게 설명합니다.
