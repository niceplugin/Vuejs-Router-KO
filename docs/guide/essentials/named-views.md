# 이름이 있는 뷰 %{#named-views}%






때로는 여러 뷰(view)를 중첩하지 않고, 동시에 표시해야 합니다(예: 사이드바와 메인 뷰가 있는 레이아웃). 이럴 때는 이름이 있는 뷰를 사용하면 유용합니다. "결과를 노출할 수단"(이하 아울렛)으로 하나의 뷰를 사용하는 것보다, 여러 개의 아울렛 뷰 각각에 이름을 지정해 사용하는 것입니다. 이름이 지정되지 않은 `<router-view>`는 기본 값으로 `default`라는 이름을 가집니다.

```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

뷰는 사용할 컴포넌트로 렌더링되므로,
한 경로에 여러 뷰를 사용하는 경우에는 여러 컴포넌트가 필요합니다.
따라서 이러한 경로에는 `components` 옵션을 사용해야 합니다:

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // 아래 두 컴포넌트는 `<router-view>`의 `name` 속성에 매치됨.
        // `LeftSidebar: LeftSidebar` 문법과 같은 코드.
        LeftSidebar,
        RightSidebar,
      },
    },
  ],
})
```

참고: [예제](https://codesandbox.io/s/named-views-vue-router-4-examples-rd20l)

## 중첩된 이름이 있는 뷰 %{#nested-named-views}%

중첩된 뷰와 명명된 뷰를 사용하여 복잡한 레이아웃을 만들 수 있습니다. 이 때 중첩된 `router-view`에 이름도 지정해야 합니다. 유저 세팅 패널을 예로 들어 보겠습니다:

```
/settings/emails                                /settings/profile
+-----------------------------------+           +------------------------------+
| UserSettings                      |           | UserSettings                 |
| +-----+-------------------------+ |           | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +----->  | | Nav | UserProfile        | |
| |     +-------------------------+ |           | |     +--------------------+ |
| |     |                         | |           | |     | UserProfilePreview | |
| +-----+-------------------------+ |           | +-----+--------------------+ |
+-----------------------------------+           +------------------------------+
```

- `UserSettings`는 부모 뷰로 렌더링된 컴포넌트.
- `Nav`는 일반 컴포넌트.
- `UserEmailsSubscriptions`, `UserProfile`, `UserProfilePreview`는 `UserSettings` 내에 중첩된 뷰 컴포넌트.

**참고**: _HTML/CSS로 이러한 레이아웃을 표현하는 방법은 잠시 잊어버리고, 사용된 컴포넌트에 집중합시다._

위 레이아웃의 `<UserSettings />` 컴포넌트 템플릿은 다음과 같습니다:

```html
<!-- UserSettings.vue -->
<div>
  <h1>사용자 설정</h1>
  <NavBar />
  <router-view />
  <router-view name="subView" />
</div>
```

이제 아래와 같이 경로를 구성하여 위 레이아웃을 구현할 수 있습니다:

```js
{
  path: '/settings',
  // 상단(이곳)에 이름이 있는 view를 가질 수도 있음.
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      subView: UserProfilePreview
    }
  }]
}
```

참고: [예제](https://codesandbox.io/s/nested-named-views-vue-router-4-examples-re9yl?&initialpath=%2Fsettings%2Femails)
