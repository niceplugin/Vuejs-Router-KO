# 라우트의 지연된 로딩 %{#Lazy-Loading-Routes}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/lazy-loading-routes-vue-cli-only"
  title="Learn about lazy loading routes"
/>

앱을 번들러로 빌드할 때 JavaScript 번들이 상당히 커질 수 있으며, 이는 페이지 로드 시간에 영향을 미칠 수 있습니다. 각 라우트의 컴포넌트를 개별 청크로 분할하고 해당 라우트로 방문될 때만 로드하면 더 효율적일 것입니다.

Vue Router는 [동적 임포트(import)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)를 기본적으로 지원하므로 정적 임포트를 동적 임포트로 대체할 수 있습니다:

```js
// import UserDetails from './views/UserDetails'
// 위 코드는 아래와 같이 대체
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [
    { path: '/users/:id', component: UserDetails },
    // 또는 라우트에서 직접 정의.
    { path: '/users/:id', component: () => import('./views/UserDetails.vue') },
  ],
})

```

`component` (및 `components`) 옵션은 Promise로 컴포넌트를 반환하는 함수를 허용하며, Vue Router는 **해당 페이지에 처음 진입할 때만 이를 가져오고** 이후에는 캐시된 버전을 사용합니다. 이는 Promise를 반환하는 한 더 복잡한 함수도 사용할 수 있음을 의미합니다:

```js
const UserDetails = () =>
  Promise.resolve({
    /* 컴포넌트 정의 */
  })
```

일반적으로 모든 라우트에 대해 **항상 동적 임포트를 사용하는 것이 좋습니다**.

::: tip 주의
라우트에서 [비동기 컴포넌트](https://vuejs.org/guide/components/async.html)를 **사용하지 마십시오**. 비동기 컴포넌트는 라우트 컴포넌트 내부에서 여전히 사용할 수 있지만, 라우트 컴포넌트 자체는 단지 동적 임포트일 뿐입니다.
:::

webpack과 같은 번들러를 사용할 때, 이는 자동으로 [코드 분할](https://webpack.js.org/guides/code-splitting/)의 이점을 제공합니다.

Babel을 사용할 때는 Babel이 해당 구문을 제대로 파싱할 수 있도록 [syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) 플러그인을 추가해야 합니다.

## 컴포넌트를 청크로 그룹화 %{#Grouping-Components-in-the-Same-Chunk}%

### webpack 사용시 %{#With-webpack}%

때때로 동일한 라우트 아래에 중첩된 모든 컴포넌트를 동일한 비동기 청크로 그룹화하고 싶을 때가 있습니다. 이를 위해 [네임드 청크](https://webpack.js.org/guides/code-splitting/#dynamic-imports)를 사용하여, 특별한 주석 구문을 통해 청크 이름을 제공하면 됩니다 (webpack 2.4 이상 필요):

```js
const UserDetails = () =>
  import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
const UserDashboard = () =>
  import(/* webpackChunkName: "group-user" */ './UserDashboard.vue')
const UserProfileEdit = () =>
  import(/* webpackChunkName: "group-user" */ './UserProfileEdit.vue')
```

webpack은 동일한 청크 이름을 가진 모든 비동기 모듈을 동일한 비동기 청크로 그룹화합니다.

### Vite 사용시 %{#With-Vite}%

Vite에서는 [`rollupOptions`](https://vitejs.dev/config/#build-rollupoptions) 내에서 청크를 정의할 수 있습니다:

```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          'group-user': [
            './src/UserDetails',
            './src/UserDashboard',
            './src/UserProfileEdit',
          ],
        },
      },
    },
  },
})
```
