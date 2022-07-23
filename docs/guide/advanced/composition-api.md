# Vue Router와 컴포지션 API {#vue-router-and-the-composition-api}

Vue 3에서는 `setup`과 [컴포지션 API](https://v3-docs.vuejs-korea.org/guide/introduction.html#composition-api)가 도입되었습니다.
따라서 컴포넌트 내부의 탐색 가드와 `this`에서 라우터에 접근하는 기존 방식을 대체할 수 있는 몇 가지 새로운 함수를 사용할 수 있습니다.

## `setup` 내부에서 라우터 및 현재 경로에 접근하기 {#accessing-the-router-and-current-route-inside-setup}

`setup` 내부에서는 `this`에 접근할 수 없기 때문에,
`this.$router` 또는 `this.$route`에 접근할 수 없습니다.
접근하기 위해서는 `useRouter` 또는 `useRoute` 함수를 사용해야 합니다.

```js
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query) {
      router.push({
        name: 'search',
        query: {
          ...route.query,
        },
      })
    }
  },
}
```

`route`는 반응형 객체이므로 해당 속성은 모두 감시할 수 있으므로,
`route` 객체 전체를 감시하는 것은 피하는게 좋습니다.
대부분의 경우, 변경하려는 파라미터를 직접 감시하는 것이 좋습니다.

```js
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const userData = ref()

    // 파라미터가 변경될 때 유저 정보를 가져오기.
    watch(
      () => route.params.id,
      async newId => {
        userData.value = await fetchUser(newId)
      }
    )
  },
}
```

템플릿 내부에서는 여전히 `$router` 및 `$route`로 접근할 수 있으므로,
`setup` 내부에서 `router` 및 `route`를 반환할 필요는 없습니다.

## 탐색 가드 {#navigation-guards}

Vue Router는 업데이트 및 리브 가드를 컴포지션 API 메서드로 노출하므로,
`setup` 함수에서 컴포넌트 내 탐색 가드를 계속 사용할 수 있습니다.

```js
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    // `this`에 접근 권한이 없으며, beforeRouteLeave 옵션과 동일
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm('정말 떠나시겠습니까? 저장되지 않은 변경 사항이 있습니다!')
      if (!answer) return false
    })

    const userData = ref()

    // `this`에 접근 권한이 없으며, beforeRouteUpdate 옵션과 동일
    onBeforeRouteUpdate(async (to, from) => {
      // 쿼리 또는 해시가 변경되었을 수 있으므로,
      // ID가 변경된 경우에만 유저 정보를 가져오기.
      if (to.params.id !== from.params.id) {
        userData.value = await fetchUser(to.params.id)
      }
    })
  },
}
```

컴포지션 API 가드는 `<router-view>`로 렌더링된 모든 컴포넌트에서도 사용할 수 있으므로,
경로 컴포넌트 내에서만 사용해야 하는 것은 아닙니다.

## `useLink`

Vue Router는 컴포지션 API로 RouterLink의 내부 동작 기능을 메서드로 노출합니다.
[`v-slot` API](/api/built-in-components/router-link-v-slot.html)와 동일한 속성에 접근할 수 있습니다:

```js
import { RouterLink, useLink } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'AppLink',

  props: {
    // TypeScript를 사용한다면, @ts-ignore 추가가 필요함
    ...RouterLink.props,
    inactiveClass: String,
  },

  setup(props) {
    const { route, href, isActive, isExactActive, navigate } = useLink(props)

    const isExternalLink = computed(
      () => typeof props.to === 'string' && props.to.startsWith('http')
    )

    return { isExternalLink, href, navigate, isActive }
  },
}
```
