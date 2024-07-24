# 파라미터를 사용한 동적 라우트 매칭 %{#Dynamic-Route-Matching-with-Params}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/dynamic-routes"
  title="Learn about dynamic route matching with params"
/>

종종 주어진 패턴에 따라 컴포넌트를 라우트로 매핑해야 할 수 있습니다. 예를 들어 모든 유저에게 렌더링되어야 하는 `User` 컴포넌트가 있지만, 각 유저별로 경로에 ID가 다른 경우 입니다. Vue Router에서는 경로에 동적 세그먼트를 사용하여 이를 달성할 수 있습니다. 이 동적 세그먼트를 *파라미터*라고 합니다:

```js
import User from './User.vue'

// 이것은 `createRouter`에 전달됩니다.
const routes = [
  // 동적 세그먼트는 콜론으로 시작합니다.
  { path: '/users/:id', component: User },
]
```

이제 `/users/johnny`와 `/users/jolyne` 같은 URL은 모두 동일한 라우트에 매핑됩니다.

*파라미터*는 콜론 `:`으로 표시됩니다. 라우트가 매칭되면 해당 *파라미터*의 값은 모든 컴포넌트에서 `route.params`로 노출됩니다. 따라서 `User`의 템플릿을 다음과 같이 수정하여 현재 사용자 ID를 렌더링할 수 있습니다:

```vue
<template>
  <div>
    <!-- 현재 라우트는 템플릿에서 $route로 접근할 수 있습니다. -->
    User {{ $route.params.id }}
  </div>
</template>
```

동일한 라우트에 여러 *파라미터*를 가질 수 있으며, 이들은 `route.params`의 해당 필드에 매핑됩니다. 예:

| 패턴                             | 매칭된 경로                   | route.params                             |
|--------------------------------|--------------------------| ---------------------------------------- |
| /users/:username               | /users/eduardo           | `{ username: 'eduardo' }`                |
| /users/:username/posts/:postId | /users/eduardo/posts/123 | `{ username: 'eduardo', postId: '123' }` |

`route.params` 외에도 `route` 객체는 URL에 쿼리가 있는 경우 `route.query`, `route.hash` 등 유용한 정보를 제공합니다. 전체 세부 사항은 [API 문서](../../api/#RouteLocationNormalized)에서 확인할 수 있습니다.

이 예제의 데모는 [여기](https://codesandbox.io/s/route-params-vue-router-examples-mlb14?from-embed&initialpath=%2Fusers%2Feduardo%2Fposts%2F1)에서 볼 수 있습니다.

<!-- <iframe
  src="https://codesandbox.io/embed//route-params-vue-router-examples-mlb14?fontsize=14&theme=light&view=preview&initialpath=%2Fusers%2Feduardo%2Fposts%2F1"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Route Params example"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe> -->

## 파라미터 변경에 반응하기 %{#Reacting-to-Params-Changes}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/reacting-to-param-changes"
  title="Learn how to react to param changes"
/>

파라미터와 함께 라우트를 사용할 때 주의할 점은 유저가 `/users/johnny`에서 `/users/jolyne`로 이동할 때 **동일한 컴포넌트 인스턴스가 재사용된다는 것**입니다. 두 라우트 모두 동일한 컴포넌트를 렌더링하기 때문에, 기존 인스턴스를 파괴하고 새로 만드는 것보다 더 효율적입니다. **하지만 이는 컴포넌트의 생명주기 훅이 호출되지 않음을 의미합니다**.

동일한 컴포넌트에서 파라미터 변경에 반응하려면, `route.params`와 같은 `route` 객체의 프로퍼티를 감시(watch)하면 됩니다:

::: code-group

```vue [Composition API]
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.params.id,
  (newId, oldId) => {
    // 라우트 변경에 반응...
  }
)
</script>
```

```vue [Options API]
<script>
export default {
  created() {
    this.$watch(
      () => this.$route.params.id,
      (newId, oldId) => {
        // 라우트 변경에 반응...
      }
    )
  },
}
</script>
```

:::

또는 탐색을 취소할 수도 있는 `beforeRouteUpdate` [네비게이션 가드](../advanced/navigation-guards.md)를 사용할 수 있습니다:

::: code-group

```vue [Composition API]
<script setup>
import { onBeforeRouteUpdate } from 'vue-router'
// ...

onBeforeRouteUpdate(async (to, from) => {
  // 라우트 변경에 반응...
  userData.value = await fetchUser(to.params.id)
})
</script>
```

```vue [Options API]
<script>
export default {
  async beforeRouteUpdate(to, from) {
    // 라우트 변경에 반응...
    this.userData = await fetchUser(to.params.id)
  },
  // ...
}
</script>
```

:::

## 모든 라우트 감지 / 404 Not found 라우트 %{#Catch-all-404-Not-found-Route}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/404-not-found-page"
  title="Learn how to make a catch all/404 not found route"
/>

일반 파라미터는 URL에서 `/` 사이의 문자만 매칭합니다. **모든 것**과 일치시키려면, *파라미터* 바로 뒤에 괄호로 정규식을 추가하여 사용자 정의 *파라미터* 정규식을 사용할 수 있습니다:

```js
const routes = [
  // 모든 것을 매칭하고 `route.params.pathMatch`에 넣습니다.
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // `/user-`로 시작하는 모든 것을 매칭하고 `route.params.afterUser`에 넣습니다.
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```

위 코드는 괄호 사이에 [사용자 정의 정규식](./route-matching-syntax.md#custom-regexp-in-params)을 사용하고 `pathMatch` 파라미터를 [선택적으로 반복 가능](./route-matching-syntax.md#optional-parameters)하도록 표시하고 있습니다. 이렇게 하면 `path`를 배열로 분할하여 해당 라우트로 직접 탐색할 수 있습니다:

```js
router.push({
  name: 'NotFound',
  // 현재 경로를 유지하고 첫 번째 문자를 삭제하여 대상 URL이 `//`로 시작하지 않도록 합니다.
  params: { pathMatch: route.path.substring(1).split('/') },
  // 기존의 쿼리와 해시가 있는 경우 이를 유지합니다.
  query: route.query,
  hash: route.hash,
})
```

자세한 내용은 [반복 가능한 파라미터](./route-matching-syntax.md#Repeatable-params) 섹션에서 확인할 수 있습니다.

[히스토리 모드](./history-mode.md)를 사용하는 경우, 서버를 올바르게 구성하기 위한 지침을 반드시 따르십시오.

## 고급 매칭 패턴 Advanced Matching Patterns %{#Advanced-Matching-Patterns}%

Vue Router는 `express`에서 영감을 받은 자체 경로 매칭 문법을 사용하므로 선택적 파라미터, 0개 이상/1개 이상의 조건, 심지어 사용자 정의 정규식 패턴과 같은 고급 매칭 패턴을 지원합니다. 이러한 패턴에 대해 자세히 알아보려면 [라우트 매칭 문법](./route-matching-syntax.md) 문서를 참고하십시오.
