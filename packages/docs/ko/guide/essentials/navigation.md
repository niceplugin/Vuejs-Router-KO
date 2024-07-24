---
sidebarDepth: 0
---

# 프로그래매틱 탐색 %{#Programmatic-Navigation}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/vue-router-4-programmatic-navigation"
  title="Learn how to navigate programmatically"
/>

`<router-link>`를 사용하여 선언적으로 탐색을 위한 앵커 태그를 만드는 것 외에도, 라우터의 인스턴스 메서드를 사용하여 이를 프로그래매틱하게 수행할 수 있습니다.

## 다른 위치로 이동하기 %{#Navigate-to-a-different-location}%

**참고: 아래 예제에서는 라우터 인스턴스를 `router`로 참조합니다. 컴포넌트 내부에서는 `$router` 프로퍼티를 사용하여 라우터에 접근할 수 있습니다. 예를 들어, `this.$router.push(...)`와 같이 사용합니다. Composition API를 사용하는 경우, [`useRouter()`](../advanced/composition-api)를 호출하여 라우터에 접근할 수 있습니다.**

다른 URL로 이동하려면 `router.push`를 사용합니다. 이 메서드는 히스토리 스택에 새 항목을 추가하므로, 사용자가 브라우저의 뒤로 가기 버튼을 클릭하면 이전 URL로 돌아갈 수 있습니다.

이 메서드는 `<router-link>`를 클릭할 때 내부적으로 호출되므로, `<router-link :to="...">`를 클릭하는 것은 `router.push(...)`를 호출하는 것과 동일합니다.

| 선언적                       | 프로그래매틱             |
|---------------------------|--------------------|
| `<router-link :to="...">` | `router.push(...)` |

인자는 문자열 경로이거나 위치를 설명하는 객체일 수 있습니다. 예:

```js
// literal string path
router.push('/users/eduardo')

// object with path
router.push({ path: '/users/eduardo' })

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } })

// with query, resulting in /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// with hash, resulting in /about#team
router.push({ path: '/about', hash: '#team' })
```

**Note**: `params` are ignored if a `path` is provided, which is not the case for `query`, as shown in the example above. Instead, you need to provide the `name` of the route or manually specify the whole `path` with any parameter:

```js
const username = 'eduardo'
// we can manually build the url but we will have to handle the encoding ourselves
router.push(`/user/${username}`) // -> /user/eduardo
// same as
router.push({ path: `/user/${username}` }) // -> /user/eduardo
// if possible use `name` and `params` to benefit from automatic URL encoding
router.push({ name: 'user', params: { username } }) // -> /user/eduardo
// `params` cannot be used alongside `path`
router.push({ path: '/user', params: { username } }) // -> /user
```

When specifying `params`, make sure to either provide a `string` or `number` (or an array of these for [repeatable params](./route-matching-syntax.md#Repeatable-params)). **Any other type (like objects, booleans, etc) will be automatically stringified**. For [optional params](./route-matching-syntax.md#Optional-parameters), you can provide an empty string (`""`) or `null` as the value to remove it.

Since the prop `to` accepts the same kind of object as `router.push`, the exact same rules apply to both of them.

`router.push` and all the other navigation methods return a _Promise_ that allows us to wait till the navigation is finished and to know if it succeeded or failed. We will talk more about that in [Navigation Handling](../advanced/navigation-failures.md).

## Replace current location %{#Replace-current-location}%

It acts like `router.push`, the only difference is that it navigates without pushing a new history entry, as its name suggests - it replaces the current entry.

| Declarative                       | Programmatic          |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

It's also possible to directly add a property `replace: true` to the `to` argument that is passed to `router.push`:

```js
router.push({ path: '/home', replace: true })
// equivalent to
router.replace({ path: '/home' })
```

## Traverse history %{#Traverse-history}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/go-back"
  title="Learn how to use Vue Router to go back"
/>

This method takes a single integer as parameter that indicates by how many steps to go forward or go backward in the history stack, similar to `window.history.go(n)`.

Examples

```js
// go forward by one record, the same as router.forward()
router.go(1)

// go back by one record, the same as router.back()
router.go(-1)

// go forward by 3 records
router.go(3)

// fails silently if there aren't that many records
router.go(-100)
router.go(100)
```

## History Manipulation %{#History-Manipulation}%

You may have noticed that `router.push`, `router.replace` and `router.go` are counterparts of [`window.history.pushState`, `window.history.replaceState` and `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History), and they do imitate the `window.history` APIs.

Therefore, if you are already familiar with [Browser History APIs](https://developer.mozilla.org/en-US/docs/Web/API/History_API), manipulating history will feel familiar when using Vue Router.

It is worth mentioning that Vue Router navigation methods (`push`, `replace`, `go`) work consistently no matter the `history` option passed when creating the router instance.
