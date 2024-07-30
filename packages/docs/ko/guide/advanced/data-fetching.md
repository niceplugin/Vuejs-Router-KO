# 데이터 가져오기 %{#Data-Fetching}%

라우트가 활성화될 때 서버에서 데이터를 가져와야 하는 경우가 있습니다. 예를 들어 유저 프로필을 렌더링하기 전에 서버에서 유저 데이터를 가져와야 합니다. 이를 달성하는 방법에는 두 가지가 있습니다:

- **탐색 후 데이터 가져오기**: 먼저 탐색을 수행한 다음, 새로 사용되는 컴포넌트의 생명주기 훅에서 데이터를 가져옵니다. 데이터를 가져오는 동안 로딩 상태를 표시합니다.

- **탐색 전 데이터 가져오기**: 탐색 전에 라우트 엔터 가드에서 데이터를 가져오고, 데이터를 가져온 후에 탐색을 수행합니다.

기술적으로 두 방법 모두 유효하며, 궁극적으로는 목표로 하는 사용자 경험(UX)에 따라 달라집니다.

## 탐색 후 가져오기 %{#Fetching-After-Navigation}%

이 접근 방식은 즉시 탐색하고 새로 사용되는 컴포넌트를 렌더링하면, 컴포넌트 자체에서 데이터를 가져옵니다. 네트워크를 통해 데이터를 가져오는 동안 로딩 상태를 표시할 필요가 있으며, 각 뷰마다 로딩을 다르게 처리할 수도 있습니다.

`route.params.id`를 기반으로 게시물 데이터를 가져와야 하는 `Post` 컴포넌트가 있다고 가정해봅시다:

::: code-group

```vue [Composition API]
<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPost } from './api.js'

const route = useRoute()

const loading = ref(false)
const post = ref(null)
const error = ref(null)

// 라우트의 파라미터를 감시하여 데이터를 다시 가져옵니다.
watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
  error.value = post.value = null
  loading.value = true
  
  try {
    // `getPost`를 데이터를 가져오는 유틸리티나 API 래퍼로 변경하세요.
    post.value = await getPost(id)  
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>
```

```vue [Options API]
<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import { getPost } from './api.js'

export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    }
  },
  created() {
    // 라우트의 파라미터를 감시하여 데이터를 다시 가져옵니다.
    this.$watch(
      () => this.$route.params.id,
      this.fetchData,
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    async fetchData(id) {
      this.error = this.post = null
      this.loading = true

      try {
        // `getPost`를 데이터를 가져오는 유틸리티나 API 래퍼로 변경하세요.
        this.post = await getPost(id)
      } catch (err) {
        this.error = err.toString()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
```

:::

## 탐색 전 가져오기 %{#Fetching-Before-Navigation}%

이 접근 방식은 새로운 라우트로 탐색하기 전에 데이터를 가져옵니다. 새로 사용되는 컴포넌트의 `beforeRouteEnter` 가드에서 데이터 가져오기를 수행하고, 가져오기가 완료된 후에만 `next`를 호출할 수 있습니다. `next`에 전달된 콜백은 **컴포넌트가 마운트된 후** 호출됩니다:

```js
export default {
  data() {
    return {
      post: null,
      error: null,
    }
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const post = await getPost(to.params.id)
      // `setPost`는 아래에 정의된 메서드입니다.
      next(vm => vm.setPost(post))
    } catch (err) {
      // `setError`는 아래에 정의된 메서드입니다.
      next(vm => vm.setError(err))
    }
  },
  // 이 컴포넌트가 이미 렌더링 되어있고 라우트가 변경되는 경우,
  // 로직이 약간 다릅니다.
  beforeRouteUpdate(to, from) {
    this.post = null
    getPost(to.params.id).then(this.setPost).catch(this.setError)
  },
  methods: {
    setPost(post) {
      this.post = post
    },
    setError(err) {
      this.error = err.toString()
    }
  }
}
```

유저는 새로 사용되는 뷰의 리소스를 가져오는 동안 이전 뷰에 머물게 됩니다. 따라서 데이터를 가져오는 동안 로딩 상태를 표시하는 것이 좋습니다. 데이터 가져오기가 실패한 경우, 전역 경고 메시지를 표시하는 것도 필요합니다.

<!-- ### Using Composition API -->

<!-- TODO: -->
