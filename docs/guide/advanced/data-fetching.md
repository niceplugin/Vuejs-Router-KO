# 데이터 가져오기 %{#data-fetching}%

라우트가 활성화될 때, 서버에서 데이터를 가져와야 하는 경우가 있습니다. 예를 들어 사용자 프로필을 렌더링하기 전에 서버에서 사용자 데이터를 가져와야 합니다. 이것을 구현하는 데는 두 가지 방법이 있습니다:

- **탐색 후 가져오기**: 먼저 탐색을 수행하고 진입한 곳의 컴포넌트 수명 주기 훅에서 데이터를 가져옵니다. 데이터를 가져오는 동안 로딩 상태를 표시하는 것이 좋습니다.

- **탐색 전 가져오기**: 라우트 진입 전 데이터를 가져오고, 이후 탐색을 수행합니다.

기술적으로 둘 다 유효하므로, 목표로 하는 UX에 따라 선택하면 됩니다.

## 탐색 후 가져오기 %{#fetching-after-navigation}%

이 접근 방식은 컴포넌트의 `created` 훅에서 데이터를 가져오는 것입니다. 네트워크를 통해 데이터를 가져오는 동안 로딩 상태를 표시할 수 있습니다.

`$route.params.id`를 기반으로 게시물에 대한 데이터를 가져와야 하는 `Post` 컴포넌트가 있다고 가정해 보겠습니다:

```html
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
```

```js
export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    }
  },
  created() {
    // 파라미터가 변경될 경우, 데이터를 다시 가져오기
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // view가 생성되고 감시가 등록된 후,
      // 데이터 가져오기가 실행됨
      { immediate: true }
    )
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true
      // `getPost`는 데이터를 가져오는 API라고 가정.
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    },
  },
}
```

## 탐색 전 가져오기 %{#fetching-before-navigation}%

이 접근 방식은 실제로 새 라우트로 이동하기 전에 데이터를 가져옵니다. 라우트 컴포넌트의 `beforeRouteEnter` 가드에서 데이터 가져오기를 수행하며,
가져오기가 완료되었을 때만 `next`를 호출합니다. `next`에 전달된 콜백은 **컴포넌트가 마운트된 후 호출**됩니다:

```js
export default {
  data() {
    return {
      post: null,
      error: null,
    }
  },
  beforeRouteEnter(to, from, next) {
    getPost(to.params.id, (err, post) => {
      // `setData`는 아래서에 정의된 메서드임.
      next(vm => vm.setData(err, post))
    })
  },
  // 변경된 라우트에서 컴포넌트를 재사용하는 경우,
  // 로직에 약간의 차이가 있음.
  async beforeRouteUpdate(to, from) {
    this.post = null
    try {
      this.post = await getPost(to.params.id)
    } catch (error) {
      this.error = error.toString()
    }
  },
  methods: {
    setData(error, post) {
      if (error) {
        this.error = error
      } else {
        this.post = post
      }
    }
  }
}
```

진입하는 뷰의 리소스를 가져오는 동안에는 이전 뷰가 유지됩니다. 따라서 데이터를 가져오는 동안 진행률을 나타내는 UI를 노출하는 것이 좋습니다. 데이터 가져오기가 실패하는 경우, 전역 경고 메시지 표시도 필요합니다.

<!-- ### Using Composition API -->

<!-- TODO: -->
