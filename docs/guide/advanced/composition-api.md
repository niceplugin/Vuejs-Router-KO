# Vue Router와 컴포지션 API %{#Vue-Router-and-the-Composition-API}%

<VueSchoolLink
  href="https://vueschool.io/lessons/router-and-the-composition-api"
  title="Vue Router와 컴포지션 API 사용법 배우기"
/>

Vue의 [컴포지션 API](https://vuejs.org/guide/extras/composition-api-faq.html) 도입은 새로운 가능성을 열었지만, Vue Router의 전체 잠재력을 활용하기 위해서는 몇 가지 새로운 함수를 사용하여 `this`에 대한 접근을 대체하고 컴포넌트 내 네비게이션 가드를 사용할 필요가 있습니다.

## `setup` 내에서 라우터 및 현재 루트 접근 %{#Accessing-the-Router-and-current-Route-inside-setup}%

`setup` 내에서 `this`에 접근할 수 없기 때문에 `this.$router`나 `this.$route`에 직접 접근할 수 없습니다. 대신, `useRouter`와 `useRoute` 컴포저블을 사용합니다:

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

`route` 객체는 반응형 객체입니다. 대부분의 경우, `route` 객체 전체를 감시하는 것은 **피해야 합니다**. 대신, 변경을 기대하는 속성들을 직접 감시할 수 있습니다:

```vue
<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const userData = ref()

// 파라미터 변경 시 사용자 정보를 가져옵니다
watch(
  () => route.params.id,
  async newId => {
    userData.value = await fetchUser(newId)
  }
)
</script>
```

템플릿에서는 여전히 `$router`와 `$route`에 접근할 수 있으므로, 템플릿에서만 이 객체들이 필요한 경우 `useRouter`나 `useRoute`를 사용할 필요가 없습니다.

## 네비게이션 가드 %{#Navigation-Guards}%

Vue Router는 컴포지션 API 함수로 업데이트와 떠남 가드를 노출합니다:

```vue
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

// beforeRouteLeave 옵션과 같지만 `this`에 대한 접근이 없습니다
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
    '정말 페이지를 떠나시겠습니까? 저장되지 않은 변경사항이 있습니다!'
  )
  // 네비게이션을 취소하고 같은 페이지에 머뭅니다
  if (!answer) return false
})

const userData = ref()

// beforeRouteUpdate 옵션과 같지만 `this`에 대한 접근이 없습니다
onBeforeRouteUpdate(async (to, from) => {
  // id가 변경된 경우에만 사용자를 가져옵니다
  if (to.params.id !== from.params.id) {
    userData.value = await fetchUser(to.params.id)
  }
})
</script>
```

컴포지션 API 가드는 `<router-view>`에 의해 렌더링된 모든 컴포넌트에서 사용할 수 있으며, 컴포넌트 내 가드처럼 라우트 컴포넌트에서 직접 사용할 필요는 없습니다.

## `useLink` %{#useLink}%

Vue Router는 RouterLink의 내부 동작을 컴포저블로 노출합니다. 이는 `RouterLink`의 props와 같은 반응형 객체를 받아들이며, 자신만의 `RouterLink` 컴포넌트를 구축하거나 사용자 정의 링크를 생성하기 위한 저수준 속성들을 노출합니다:

```vue
<script setup>
import { RouterLink, useLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  // TypeScript 사용 시 @ts-ignore 추가
  ...RouterLink.props,
  inactiveClass: String,
})

const {
  // 해결된 라우트 객체
  route,
  // 링크에서 사용할 href
  href,
  // 링크가 활성화되었는지 나타내는 불린 ref
  isActive,
  // 링크가 정확히 활성화되었는지 나타내는 불린 ref
  isExactActive,
  // 링크로 이동하는 함수
  navigate
} = useLink(props)

const isExternalLink = computed(
  () => typeof props.to === 'string' && props.to.startsWith('http')
)
</script>
```

RouterLink의 `v-slot`은 `useLink` 컴포저블과 동일한 속성에 접근할 수 있습니다.
