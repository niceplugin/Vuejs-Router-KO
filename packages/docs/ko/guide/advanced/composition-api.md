# Vue Router 그리고 Composition API %{#Vue-Router-and-the-Composition-API}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/router-and-the-composition-api"
  title="Learn how to use Vue Router with the Composition API"
/>

Vue의 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) 도입으로 새로운 가능성이 열렸지만, Vue Router의 잠재력을 최대한 활용하려면, `this`에 접근하는 것과 컴포넌트 내 네비게이션 가드를 대체하는 몇 가지 새로운 함수를 사용해야 합니다.

## `setup`에서 라우터와 현재 라우트에 접근하기 %{#Accessing-the-Router-and-current-Route-inside-setup}%

`setup` 내부에서는 `this`에 접근할 수 없기 때문에 `this.$router`나 `this.$route`에 직접 접근할 수 없습니다. 대신 `useRouter`와 `useRoute` 컴포저블을 사용합니다:

```vue
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function pushWithQuery(query) {
  router.push({
    name: 'search',
    query: {
      ...route.query,
      ...query,
    },
  })
}
</script>
```

`route` 객체는 반응형 객체입니다. 대부분의 경우 **`route` 객체를 통으로 감시하는 것을 피해야** 합니다. 대신 변경될 것으로 예상되는 프로퍼티를 직접 감시할 수 있습니다:

```vue
<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const userData = ref()

// 파라미터가 변경될 때 유저 정보를 가져옵니다.
watch(
  () => route.params.id,
  async newId => {
    userData.value = await fetchUser(newId)
  }
)
</script>
```

템플릿에서는 여전히 `$router`와 `$route`에 접근할 수 있으므로, 템플릿에서만 이러한 객체가 필요하다면 `useRouter`나 `useRoute`를 사용할 필요가 없습니다.

## 네비게이션 가드 %{#Navigation-Guards}%

Vue Router는 Composition API에서 업데이트 및 리브 가드를 함수로 제공합니다:

```vue
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

// Option API의 `beforeRouteLeave`와 동일하지만 `this`에 접근할 수 없습니다.
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
    'Do you really want to leave? you have unsaved changes!'
  )
  // 탐색을 취소하고 현재 페이지에 머무릅니다.
  if (!answer) return false
})

const userData = ref()

// Option API의 `beforeRouteUpdate`와 동일하지만 `this`에 접근할 수 없습니다.
onBeforeRouteUpdate(async (to, from) => {
  // ID가 변경된 경우에만 유저를 가져오며, 쿼리나 해시만 변경된 경우는 해당하지 않습니다.
  if (to.params.id !== from.params.id) {
    userData.value = await fetchUser(to.params.id)
  }
})
</script>
```

Composition API 가드는 `<router-view>`에 의해 렌더링된 모든 컴포넌트에서 사용할 수 있습니다. 반드시 [컴포넌트 내 가드](./navigation-guards.html#In-Component-Guards)처럼 라우트 컴포넌트에서 직접 사용할 필요는 없습니다.

## `useLink` %{#useLink}%

Vue Router는 RouterLink의 내부 동작을 컴포저블로 노출합니다. 이는 `RouterLink`의 프로퍼티와 같은 반응형 객체를 허용하며, 자체 `RouterLink` 컴포넌트를 구축하거나 사용자 정의 링크를 생성할 수 있도록 저수준 프로퍼티를 제공합니다:

```vue
<script setup>
import { RouterLink, useLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  // TypeScript를 사용하는 경우 @ts-ignore를 추가하세요.
  ...RouterLink.props,
  inactiveClass: String,
})

const {
  // 처리된 라우트 객체
  route,
  // 링크에서 사용할 href
  href,
  // 링크가 활성 상태인지 여부를 나타내는 boolean ref
  isActive,
  // 링크가 정확히 활성 상태인지 여부를 나타내는 boolean ref
  isExactActive,
  // 링크로 이동하는 함수
  navigate
} = useLink(props)

const isExternalLink = computed(
  () => typeof props.to === 'string' && props.to.startsWith('http')
)
</script>
```

RouterLink의 `v-slot`은 `useLink` 컴포저블에서 제공하는 것과 동일한 프로퍼티에 접근할 수 있다는 점을 유의하세요.
