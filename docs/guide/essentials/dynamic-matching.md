# 동적 라우트 매칭과 파라미터 %{#Dynamic-Route-Matching-with-Params}%

<VueSchoolLink
  href="https://vueschool.io/lessons/dynamic-routes"
  title="동적 라우트 매칭과 파라미터에 대해 알아보기"
/>

종종 주어진 패턴에 따라 같은 컴포넌트에 라우트를 매핑해야 할 경우가 많습니다. 예를 들어, 모든 사용자에 대해 다른 사용자 ID로 렌더링되어야 하는 `User` 컴포넌트가 있을 수 있습니다. Vue Router에서는 경로에 동적 세그먼트를 사용하여 이를 달성할 수 있으며, 이를 _파라미터_ 라고 합니다:

```js
import User from './User.vue'

// 이것들은 `createRouter`에 전달됩니다
const routes = [
  // 동적 세그먼트는 콜론으로 시작합니다
  { path: '/users/:id', component: User },
]
```

이제 `/users/johnny`와 `/users/jolyne` 같은 URL은 모두 같은 라우트로 매핑됩니다.

_파라미터_는 콜론 `:`으로 표시됩니다. 라우트가 매치되면, _params_의 값은 모든 컴포넌트에서 `route.params`로 노출됩니다. 따라서 `User`의 템플릿을 다음과 같이 업데이트하여 현재 사용자 ID를 렌더링할 수 있습니다:

```vue
<template>
  <div>
    <!-- 현재 라우트는 템플릿에서 $route로 접근 가능합니다 -->
    User {{ $route.params.id }}
  </div>
</template>
```

한 라우트에 여러 _파라미터_를 가질 수 있으며, 이들은 `route.params`에서 해당 필드로 매핑됩니다. 예제:

| 패턴                            | 매치된 경로              | route.params                           |
| ------------------------------ | ------------------------ | -------------------------------------- |
| /users/:username               | /users/eduardo           | `{ username: 'eduardo' }`              |
| /users/:username/posts/:postId | /users/eduardo/posts/123 | `{ username: 'eduardo', postId: '123' }` |

`route.params` 외에도, `route` 객체는 URL에 쿼리가 있을 경우 `route.query`, `route.hash` 등 다른 유용한 정보도 제공합니다. 전체 세부 사항은 [API 참조](../../api/interfaces/RouteLocationNormalized.md)에서 확인할 수 있습니다.

이 예제의 실행 가능한 데모는 [여기](https://codesandbox.io/s/route-params-vue-router-examples-mlb14?from-embed&initialpath=%2Fusers%2Feduardo%2Fposts%2F1)에서 찾을 수 있습니다.

<!-- <iframe
  src="https://codesandbox.io/embed//route-params-vue-router-examples-mlb14?fontsize=14&theme=light&view=preview&initialpath=%2Fusers%2Feduardo%2Fposts%2F1"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Route Params example"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe> -->

## 파라미터 변경에 반응하기 %{#Reacting-to-Params-Changes}%

<VueSchoolLink
  href="https://vueschool.io/lessons/reacting-to-param-changes"
  title="파라미터 변경에 반응하는 방법 배우기"
/>

파라미터가 있는 라우트를 사용할 때 주의할 점은 사용자가 `/users/johnny`에서 `/users/jolyne`으로 이동할 때 **동일한 컴포넌트 인스턴스가 재사용된다는 것**입니다. 두 라우트 모두 같은 컴포넌트를 렌더링하기 때문에, 오래된 인스턴스를 파괴한 후 새로운 것을 생성하는 것보다 이 방법이 더 효율적입니다. **하지만 이는 컴포넌트의 생명주기 훅이 호출되지 않는다는 것을 의미합니다.**

같은 컴포넌트에서 파라미터 변경에 반응하려면, `route` 객체에서 `route.params`를 감시하는 것으로 충분합니다:

::: code-group

```vue [Composition API]
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(() => route.params.id, (newId, oldId) => {
  // 라우트 변경에 반응합니다...
})
</script>
```

```vue [Options API]
<script>
export default {
  created() {
    this.$watch(
      () => this.$route.params.id,
      (newId, oldId) => {
        // 라우트 변경에 반응합니다...
      }
    )
  },
}
</script>
```

:::

또는 `beforeRouteUpdate` [탐색 가드](../advanced/navigation-guards.md)를 사용하면 탐색을 취소할 수도 있습니다:

::: code-group

```vue [Composition API]
<script setup>
import { onBeforeRouteUpdate } from 'vue-router'
// ...

onBeforeRouteUpdate(async (to, from) => {
  // 라우트 변경에 반응합니다...
  userData.value = await fetchUser(to.params.id)
})
</script>
```

```vue [Options API]
<script>
export default {
  async beforeRouteUpdate(to, from) {
    // 라우트 변경에 반응합니다...
    this.userData = await fetchUser(to.params.id)
  },
  // ...
}
</script>
```

:::

## 모두 예외 처리 / 404 찾을 수 없음 라우트 %{#Catch-all-404-Not-found-Route}%

<VueSchoolLink
href="https://vueschool.io/lessons/404-not-found-page"
title="Learn how to make a catch all/404 not found route"
/>

일반 파라미터는 URL 프래그먼트 사이에 있는 문자만 일치시킬 것입니다. **아무 것이나** 일치시키고 싶다면, 파라미터 뒤에 괄호 안에 정규식을 추가하여 사용자 지정 _파라미터_ regexp를 사용할 수 있습니다:

```js
const routes = [
  // 모든 것을 일치시키고 `route.params.pathMatch` 아래에 넣을 것입니다
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // `/user-`로 시작하는 모든 것을 일치시키고 `route.params.afterUser` 아래에 넣을 것입니다
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```

이 특정 시나리오에서는 괄호 사이에 [사용자 지정 regexp](./route-matching-syntax.md#custom-regexp-in-params)를 사용하고 `pathMatch` 파라미터를 [반복 가능하게](./route-matching-syntax.md#optional-parameters) 표시합니다. 이를 통해 필요한 경우 `path`를 배열로 나누어 라우트로 직접 탐색할 수 있습니다:

```js
router.push({
  name: 'NotFound',
  // 현재 경로를 유지하고 첫 번째 문자를 제거하여 타겟 URL이 `//`로 시작하지 않도록 합니다
  params: { pathMatch: route.path.substring(1).split('/') },
  // 존재하는 쿼리와 해시를 유지합니다
  query: route.query,
  hash: route.hash,
})
```

[반복 파라미터](./route-matching-syntax.md#Repeatable-params) 섹션에서 더 자세히 볼 수 있습니다.

[History 모드](./history-mode.md)를 사용하는 경우, 서버를 올바르게 구성하기 위해 지침을 따라야 합니다.

## 고급 매칭 패턴 %{#Advanced-Matching-Patterns}%

Vue Router는 `express`에서 사용된 것과 유사한 자체 경로 매칭 구문을 사용하여 선택적 파라미터, 하나 이상/둘 이상의 요구사항, 심지어 사용자 지정 정규식 패턴과 같은 많은 고급 매칭 패턴을 지원합니다. 자세한 내용은 [고급 매칭](./route-matching-syntax.md) 문서에서 확인하세요.
