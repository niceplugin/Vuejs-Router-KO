# 시작하기 {#getting-started}

Vue + Vue Router로 사용해 싱글 페이지 앱을 만드는 것은 매우 쉽습니다.
Vue.js를 사용했다면, 이미 컴포넌트로 앱을 구성했을 것입니다.
여기에 Vue Router를 사용할 경우,
경로에 컴포넌트를 매핑하고 Vue Router에게 렌더링할 경로를 알려주기만 하면 됩니다.

다음은 기본 예제입니다:

## HTML

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

<div id="app">
  <h1>멋진 앱!</h1>
  <p>
    <!--
      네비게이션을 위해 router-link 컴포넌트를 사용.
      `to`라는 prop으로 링크를 지정.
      `<router-link>`는 `href` 속성이 있는 `<a>` 태그로 렌더링됨.
    -->
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </p>
  
  <!-- 현재 경로에 매핑된 컴포넌트가 렌더링됨. -->
  <router-view></router-view>
</div>
```

### `router-link`

`a` 태그 대신 커스텀 컴포넌트인 `router-link`를 사용하여 링크를 생성해야 합니다.
이를 통해 Vue Router는 페이지를 다시 로드하지 않고도 URL 변경, 생성 및 인코딩을 처리할 수 있습니다.
나중에 이러한 기능을 활용하는 방법을 살펴보겠습니다.

### `router-view`

`router-view`는 URL에 해당하는 컴포넌트를 표시합니다.
어디에나 배치 가능하여 레이아웃에 맞게 조정할 수 있습니다.

## JavaScript

```js
// 1. 경로에 사용할 컴포넌트를 정의.
// import를 사용해 파일을 가져올 수 있음.
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. 경로를 정의하고, 각 경로를 컴포넌트와 매핑.
// 중첩 경로에 대해서는 나중에 설명함.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. `routes`를 옵션으로 전달해 라우터 인스턴스를 생성.
// 여기에 추가 옵션을 전달할 수 있지만, 지금은 간단하게 나타냄.
const router = VueRouter.createRouter({
  // 4. 사용할 히스토리 모드 정의. 여기서는 간단하게 해시 모드를 사용.
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes`와 같음
})

// 5. 루트 인스턴스를 생성하고 마운트.
const app = Vue.createApp({})
// 앱이 라우터를 인식하도록,
// 라우터 인스턴스를 `use()`로 등록해야 함.
app.use(router)

app.mount('#app')

// 이제 앱이 시작되었습니다!
```

`app.use(router)`를 실행했으므로,
`this.$router`로 라우터 인스턴스에 접근할 수 있으며,
컴포넌트 내부에서 `this.$route`로 현재 경로에 접근할 수 있습니다.

```js
// Home.vue
export default {
  computed: {
    username() {
      // `params`가 무엇인지는 나중에 설명함.
      return this.$route.params.username
    },
  },
  methods: {
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    },
  },
}
```

`setup` 함수 내부에서 라우터 또는 경로에 접근하려면,
`useRouter` 또는 `useRoute` 함수를 호출해야 합니다.
[컴포지션 API](advanced/composition-api.md#accessing-the-router-and-current-route-inside-setup)에서 이에 대해 자세히 알아볼 것입니다.

문서 전체에서 우리는 종종 `router` 인스턴스를 사용합니다.
`this.$router`는 `createRouter`를 통해 생성된 `router` 인스턴스와 동일합니다.
`this.$router`를 사용하는 이유는 라우팅을 조작해야 하는 모든 컴포넌트에서 라우터를 `import` 하고 싶지 않기 때문입니다.
