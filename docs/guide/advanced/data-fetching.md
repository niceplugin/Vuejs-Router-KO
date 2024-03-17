# 데이터 가져오기 %{#Data-Fetching}%

때때로 경로가 활성화될 때 서버에서 데이터를 가져와야 할 필요가 있습니다. 예를 들어, 사용자 프로필을 렌더링하기 전에 서버에서 사용자 데이터를 가져와야 합니다. 이를 두 가지 다른 방법으로 달성할 수 있습니다.

- **탐색 후 데이터 가져오기**: 먼저 탐색을 수행하고 들어오는 컴포넌트의 라이프사이클 후크에서 데이터를 가져옵니다. 데이터를 가져오는 동안 로딩 상태를 표시합니다.

- **탐색 전 데이터 가져오기**: 라우트 진입 가드에서 탐색 전에 데이터를 가져오고 데이터가 가져와진 후에 탐색을 수행합니다.

기술적으로 두 가지 방법 모두 유효한 선택이며 - 결국 목표하는 사용자 경험에 달려 있습니다.

## 탐색 후 데이터 가져오기 %{#Fetching-After-Navigation}%

이 접근 방식을 사용할 때, 우리는 즉시 들어오는 컴포넌트를 탐색하고 렌더링하며, 컴포넌트 자체에서 데이터를 가져옵니다. 이는 네트워크를 통해 데이터를 가져오는 동안 로딩 상태를 표시할 기회를 제공하며, 각 뷰에 대해 로딩을 다르게 처리할 수도 있습니다.

`route.params.id`에 따라 게시물의 데이터를 가져와야 하는 `Post` 컴포넌트가 있다고 가정해 봅시다:

::: 코드 그룹

```vue [컴포지션 API]
<template>
  <div class="post">
    <div v-if="loading" class="loading">로딩 중...</div>

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

// 라우트의 params를 감시하여 데이터를 다시 가져옴
watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
  error.value = post.value = null
  loading.value = true
  
  try {
    // `getPost`을 여러분의 데이터 가져오기 유틸 / API 래퍼로 대체
    post.value = await getPost(id)  
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>
```

```vue [옵션 API]
<template>
  <div class="post">
    <div v-if="loading" class="loading">로딩 중...</div>

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
    // 라우트의 params를 감시하여 데이터를 다시 가져옴
    this.$watch(
      () => this.$route.params.id,
      this.fetchData,
      // 뷰가 생성될 때 데이터가 이미 관찰되고 있으므로
      // 데이터를 가져옴
      { immediate: true }
    )
  },
  methods: {
    async fetchData(id) {
      this.error = this.post = null
      this.loading = true

      try {
        // `getPost`을 여러분의 데이터 가져오기 유틸 / API 래퍼로 대체
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

## 탐색 전 데이터 가져오기 %{#Fetching-Before-Navigation}%

이 접근 방식으로, 우리는 실제로 새 경로로 탐색하기 전에 데이터를 가져옵니다. `beforeRouteEnter` 가드에서 들어오는 컴포넌트에서 데이터 가져오기를 수행할 수 있으며, 데이터 가져오기가 완료되면 `next`를 호출합니다. `next`에 전달된 콜백은 **컴포넌트가 마운트된 후**에 호출됩니다:

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
      // 아래 정의된 `setPost` 메서드
      next(vm => vm.setPost(post))
    } catch (err) {
      // 아래 정의된 `setError` 메서드
      next(vm => vm.setError(err))
    }
  },
  // 라우트 변경이 일어나고 이 컴포넌트가 이미 렌더링 되었다면,
  // 로직이 약간 달라질 것입니다.
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

리소스를 가져오는 동안 사용자는 이전 뷰에 머물러 있으므로 데이터를 가져오는 동안 진행 상태 표시줄이나 일종의 지시기를 표시하는 것이 좋습니다. 데이터 가져오기에 실패하면 어떤 종류의 전역 경고 메시지를 표시하는 것이 필요합니다.

<!-- ### Using Composition API -->

<!-- TODO: -->
