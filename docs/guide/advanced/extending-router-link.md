# RouterLink 확장하기 {#extending-routerlink}

`<router-link>` 컴포넌트는 대부분의 기본 앱에 충분할 만큼의 `props`를 노출하지만,
가능한 모든 사용 사례를 다루지 않으며,
일부 고급 사례에서는 `v-slot`을 사용하게 될 것입니다.
대부분의 중대형 앱에서는 앱 전체에서 재사용하기 위해,
최소한 `<router-link>`의 커스텀 컴포넌트 한 개는 만들게 됩니다.
예를 들어 탐색 메뉴의 링크, 외부 링크 처리, `inactive-class`(비활성 클래스) 추가 등이 있습니다.

RouterLink를 확장해 외부 링크를 처리하도록 하고,
`AppLink.vue` 파일에 커스텀 `inactive-class`를 추가해 보겠습니다:

```vue
<!-- AppLink.vue -->
<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </router-link>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AppLink',
  inheritAttrs: false,

  props: {
    // TypeScript를 사용한다면, @ts-ignore 추가가 필요함
    ...RouterLink.props,
    inactiveClass: String,
  },

  computed: {
    isExternalLink() {
      return typeof this.to === 'string' && this.to.startsWith('http')
    },
  },
}
</script>
```

렌더링 함수를 사용하거나 `computed` 속성을 만드는 것을 선호하는 경우,
[컴포지션 API](composition-api.md)에서 `useLink`를 사용할 수 있습니다:

```js
// AppLink.vue: 컴포지션 API를 사용한 <script>
import { RouterLink, useLink } from 'vue-router'

export default {
  name: 'AppLink',

  props: {
    // TypeScript를 사용한다면, @ts-ignore 추가가 필요함
    ...RouterLink.props,
    inactiveClass: String,
  },

  setup(props) {
    // `props`에는 `to`와 <router-link>에 전달할 수 있는 다른 모든 prop이 포함됨.
    const { navigate, href, route, isActive, isExactActive } = useLink(props)

    // ...

    return { isExternalLink }
  },
}
```

실제로 앱의 다른 곳에 `AppLink` 컴포넌트를 사용하고 싶을 수 있습니다.
예를 들어 [Tailwind CSS](https://tailwindcss.com)를 사용하여 원하는 모든 클래스를 포함해 스타일링 한 후,
`NavLink.vue` 컴포넌트를 만들어 사용할 수 있습니다:

```vue
<!-- NavLink.vue -->
<template>
  <AppLink
    v-bind="$attrs"
    class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 focus:outline-none transition duration-150 ease-in-out hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
    active-class="border-indigo-500 text-gray-900 focus:border-indigo-700"
    inactive-class="text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
  >
    <slot />
  </AppLink>
</template>
```
