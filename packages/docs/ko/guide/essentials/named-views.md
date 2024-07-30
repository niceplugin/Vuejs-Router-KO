# 네임드 뷰 %{#Named-Views}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/vue-router-4-named-views"
  title="Learn how to use named views"
/>

:::info 참고!
Vue Router 문서 전체에서 "뷰"는 "view"를 의미합니다. 이것은 `<router-view>` 컴포넌트의 약칭입니다.
:::

때때로 뷰를 중첩하는 대신 동시에 여러 뷰를 표시하고 싶을 때가 있습니다. 예를 들어, `sidebar`와 `main` 두 개의 뷰가 있는 레이아웃을 만드는 경우입니다. 이럴 때 유용한 것이 바로 **네임드 뷰**입니다. 하나의 뷰에 단일 아웃렛(outlet)을 가지는 대신, 여러 개를 가질 수 있으며 각각에 이름을 부여할 수 있습니다. 이름이 없는 `router-view`는 `default`라는 이름이 부여됩니다.

```vue-html
<router-view class="view left-sidebar" name="LeftSidebar" />
<router-view class="view main-content" />
<router-view class="view right-sidebar" name="RightSidebar" />
```

하나의 뷰는 하나의 컴포넌트를 사용하여 렌더링되므로, 여러개의 뷰를 동일한 라우트에 사용하려면 여러 컴포넌트가 필요합니다. `components` 옵션(뒤에 **s**가 붙음)을 사용해야 합니다:

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // LeftSidebar: LeftSidebar 와 동일
        LeftSidebar,
        // `<router-view>`의 `name` 어트리뷰트에 매칭됩니다.
        RightSidebar,
      },
    },
  ],
})
```

이 예제의 데모는 [여기](https://codesandbox.io/s/named-views-vue-router-4-examples-rd20l)에서 확인할 수 있습니다.

## 중첩된 네임드 뷰 %{#Nested-Named-Views}%

네임드 뷰와 중첩된 뷰를 사용하여 복잡한 레이아웃을 만드는 것이 가능합니다. 이 경우 중첩된 `router-view`에도 이름을 지정해야 합니다. 설정 패널 예제를 살펴보겠습니다:

```
/settings/emails                                   /settings/profile
+-----------------------------------+              +------------------------------+
| UserSettings                      |              | UserSettings                 |
| +-----+-------------------------+ |              | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  --------->  | | Nav | UserProfile        | |
| |     +-------------------------+ |              | |     +--------------------+ |
| |     |                         | |              | |     | UserProfilePreview | |
| +-----+-------------------------+ |              | +-----+--------------------+ |
+-----------------------------------+              +------------------------------+
```

- `Nav`는 일반 컴포넌트입니다.
- `UserSettings`는 부모 뷰 컴포넌트입니다.
- `UserEmailsSubscriptions`, `UserProfile`, `UserProfilePreview`는 중첩 뷰 컴포넌트입니다.

**참고**: *HTML/CSS가 이러한 레이아웃을 어떻게 나타내야 하는지는 잠시 잊고, 사용된 컴포넌트에 집중해 봅시다.*

`UserSettings` 컴포넌트의 `<template>` 섹션은 다음과 같이 생겼을 것입니다:

```vue-html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar />
  <router-view />
  <router-view name="helper" />
</div>
```

그런 다음 아래와 같은 라우트 구성으로 위의 레이아웃을 구현할 수 있습니다:

```js
{
  path: '/settings',
  // 상위 라우트에서도 네임드 뷰를 구성할 수 있습니다.
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

이 예제의 데모는 [여기](https://codesandbox.io/s/nested-named-views-vue-router-4-examples-re9yl?&initialpath=%2Fsettings%2Femails)에서 확인할 수 있습니다.
