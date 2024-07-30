# RouterLink 확장 %{#Extending-RouterLink}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/extending-router-link-for-external-urls"
  title="Learn how to extend router-link"
/>

RouterLink 컴포넌트는 대부분의 기본 애플리케이션 요구를 충족하기에 충분한 `props`를 제공하지만, 모든 가능한 사용 사례를 다루지는 않으므로 일부 고급 사례에서는 `v-slot`을 사용하게 될 것입니다. 대부분의 중형에서 대형 애플리케이션에서는 애플리케이션 전체에서 재사용할 수 있는 하나 이상의 사용자 정의 RouterLink 컴포넌트를 만드는 것이 좋습니다. 예를 들어 내비게이션 메뉴의 링크, 외부 링크 처리, `inactive-class` 추가 등이 있습니다.

RouterLink를 확장하여 외부 링크를 처리하고 `inactive-class`를 추가하는 `AppLink.vue` 파일을 만들어 봅시다:

::: code-group

```vue [Composition API]
<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  // TypeScript 사용시 @ts-ignore 추가.
  ...RouterLink.props,
  inactiveClass: String,
})

const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

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
```

```vue [Options API]
<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AppLink',
  inheritAttrs: false,

  props: {
    // TypeScript 사용시 @ts-ignore 추가.
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
```

:::

렌더 함수 사용이나 `computed` 프로퍼티 생성을 선호하는 경우, [Composition API](./composition-api.md)의 `useLink`를 사용할 수 있습니다:

```js
import { RouterLink, useLink } from 'vue-router'

export default {
  name: 'AppLink',

  props: {
    // TypeScript 사용시 @ts-ignore 추가.
    ...RouterLink.props,
    inactiveClass: String,
  },

  setup(props) {
    // `props`는 <router-link>에 전달 가능한 `to` 포함 모든 프로퍼티들 입니다.
    const { navigate, href, route, isActive, isExactActive } = useLink(props)

    // ...

    return { isExternalLink }
  },
}
```

실제로, `AppLink` 컴포넌트를 애플리케이션의 다양한 부분에 사용하고 싶을 수 있습니다. 예를 들어, [Tailwind CSS](https://tailwindcss.com)를 사용하여 모든 클래스를 포함하는 `NavLink.vue` 컴포넌트를 만들 수 있습니다:

```vue
<template>
  <AppLink
    v-bind="$attrs"
    class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
    active-class="border-indigo-500 text-gray-900 focus:border-indigo-700"
    inactive-class="text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
  >
    <slot />
  </AppLink>
</template>
```
