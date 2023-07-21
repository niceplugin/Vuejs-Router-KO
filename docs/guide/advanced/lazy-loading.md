# 경로 지연 로딩 %{#lazy-loading-routes}%

<VueSchoolLink
href="https://vueschool.io/lessons/lazy-loading-routes-vue-cli-only"
title="Learn about lazy loading routes"
/>

번들러를 사용하여 앱을 빌드할 때 JavaScript 번들이 상당히 커질 수 있으며 페이지 로드 시간에 영향을 줍니다. 각 경로의 컴포넌트를 별도의 청크로 분할하고, 해당 경로를 방문할 때만 로드할 수 있다면 더 효율적일 것입니다.

Vue Router는 기본적으로 [동적 가져오기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)를 지원하므로, 정적 가져오기를 동적 가져오기로 바꿀 수 있습니다.

```js
// 다음 코드를
// import UserDetails from './views/UserDetails'
// 아래처럼 변경
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})
```

`component`(그리고 `components`) 옵션은 컴포넌트를 반환하는 Promise를 반환하는 함수를 허용하며, Vue Router는 **처음 페이지에 진입할 때만** 가져온 다음 캐시된 버전을 사용합니다. 즉, Promise를 반환하는 복잡한 함수도 사용할 수 있습니다:

```js
const UserDetails = () =>
  Promise.resolve({
    /* 컴포넌트 정의 */
  })
```

일반적으로 모든 경로는 **항상 동적 가져오기**를 사용하는 것이 좋습니다.

::: tip 참고
경로에 [비동기 컴포넌트](https://vuejs.kr/guide/components/async.html)를 **사용하지 마십시오**. 비동기 컴포넌트는 여전히 경로 컴포넌트 내에서 사용할 수 있지만, 경로 컴포넌트 자체는 동적 가져오기에 불과합니다.
:::

webpack과 같은 번들러를 사용하는 경우, 자동으로 [코드 분할](https://webpack.js.org/guides/code-splitting/)이 됩니다.

Babel을 사용하는 경우, Babel이 문법을 제대로 파싱할 수 있도록 [syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) 플러그인을 추가해야 합니다.

## 동일한 청크에서 컴포넌트 그룹화 %{#grouping-components-in-the-same-chunk}%

### Webpack 사용 시 %{#with-webpack}%

때로는 동일한 경로 내부에 중첩된 모든 컴포넌트를 하나의 비동기 청크로 그룹화할 수 있습니다. 이를 구현하려면 특수 주석 문법으로 청크 이름을 제공하여 [명명된 청크](https://webpack.js.org/guides/code-splitting/#dynamic-imports)를 사용해야 합니다(webpack > 2.4 필요):

```js
const UserDetails = () =>
  import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
const UserDashboard = () =>
  import(/* webpackChunkName: "group-user" */ './UserDashboard.vue')
const UserProfileEdit = () =>
  import(/* webpackChunkName: "group-user" */ './UserProfileEdit.vue')
```

webpack은 동일한 청크 이름을 가진 모든 비동기 모듈을 하나의 비동기 청크로 그룹화합니다.

### Vite 사용 시 %{#with-vite}%

Vite에서는 [`rollupOptions`](https://vitejs.dev/config/#build-rollupoptions) 내부에서 청크를 정의할 수 있습니다:

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
