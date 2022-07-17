# Vue Router와 컴포지션 API {#vue-router-and-the-composition-api}

The introduction of `setup` and Vue's [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html), open up new possibilities but to be able to get the full potential out of Vue Router, we will need to use a few new functions to replace access to `this` and in-component navigation guards.

`setup`과 Vue의 [컴포지션 API](https://v3-docs.vuejs-korea.org/guide/introduction.html#composition-api)의 도입되었습니다.
Vue Router의 잠재력을 최대한 활용하려면,
`this` 및 컴포넌트 내부의 탐색 가드에서 라우터에 접근하는 방식을 대체하기 위해 몇 가지 새로운 함수를 사용해야 합니다.

## `setup` 내부에서 라우터 및 현재 경로에 접근하기 {#accessing-the-router-and-current-route-inside-setup}

Because we don't have access to `this` inside of `setup`, we cannot directly access `this.$router` or `this.$route` anymore. Instead we use the `useRouter` function:

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

The `route` object is a reactive object, so any of its properties can be watched and you should **avoid watching the whole `route`** object. In most scenarios, you should directly watch the param you are expecting to change

```js
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const userData = ref()

    // fetch the user information when params change
    watch(
      () => route.params.id,
      async newId => {
        userData.value = await fetchUser(newId)
      }
    )
  },
}
```

Note we still have access to `$router` and `$route` in templates, so there is no need to return `router` or `route` inside of `setup`.

## 탐색 가드 {#navigation-guards}

While you can still use in-component navigation guards with a `setup` function, Vue Router exposes update and leave guards as Composition API functions:

```js
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    // same as beforeRouteLeave option with no access to `this`
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      )
      // cancel the navigation and stay on the same page
      if (!answer) return false
    })

    const userData = ref()

    // same as beforeRouteUpdate option with no access to `this`
    onBeforeRouteUpdate(async (to, from) => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (to.params.id !== from.params.id) {
        userData.value = await fetchUser(to.params.id)
      }
    })
  },
}
```

Composition API guards can also be used in any component rendered by `<router-view>`, they don't have to be used directly on the route component like in-component guards.

## `useLink`

Vue Router exposes the internal behavior of RouterLink as a Composition API function. It gives access to the same properties as the [`v-slot` API](../../api/#router-link-s-v-slot):

```js
import { RouterLink, useLink } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'AppLink',

  props: {
    // add @ts-ignore if using TypeScript
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
