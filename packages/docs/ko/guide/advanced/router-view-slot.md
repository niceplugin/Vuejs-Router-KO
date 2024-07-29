# RouterView 슬롯 %{#RouterView-slot}%

RouterView 컴포넌트는 라우트 컴포넌트를 렌더링하는 데 사용할 수 있는 슬롯을 노출합니다:

```vue-html
<router-view v-slot="{ Component }">
  <component :is="Component" />
</router-view>
```

위의 코드는 슬롯 없이 `<router-view />`를 사용하는 것과 동일하지만, 슬롯은 다른 기능과 함께 작업할 때 추가적인 유연성을 제공합니다.

## KeepAlive & Transition %{#KeepAlive-Transition}%

[`<keep-alive>`](https://vuejs.org/guide/built-ins/keep-alive.html) 컴포넌트를 사용할 때, 보통 RouterView 자체가 아닌 라우트 컴포넌트를 유지하고 싶습니다. 이는 슬롯 안에 KeepAlive를 배치함으로써 구현할 수 있습니다:

```vue-html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

마찬가지로, 슬롯을 사용하여 라우트 컴포넌트 간 트랜지션을 위해 [`<transition>`](https://vuejs.org/guide/built-ins/transition.html) 컴포넌트를 사용할 수 있습니다:

```vue-html
<router-view v-slot="{ Component }">
  <transition>
    <component :is="Component" />
  </transition>
</router-view>
```

`<transition>` 안에 `<keep-alive>`를 사용할 수도 있습니다:

```vue-html
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```

RouterView와 `<transition>` 컴포넌트를 사용하는 방법에 대한 자세한 내용은 [트랜지션](./transitions) 가이드를 참고하세요.

## 프로퍼티와 슬롯 전달하기 %{#Passing-props-and-slots}%

우리는 슬롯을 사용하여 라우트 컴포넌트에 프로퍼티 또는 슬롯을 전달할 수 있습니다:

```vue-html
<router-view v-slot="{ Component }">
  <component :is="Component" some-prop="a value">
    <p>Some slotted content</p>
  </component>
</router-view>
```

실제로 이렇게 하면 모든 라우트 컴포넌트가 **동일한 프로퍼티와 슬롯을 사용**하게 되므로, 일반적으로는 이렇게 하지 않습니다. 프로퍼티를 전달하는 다른 방법에 대해서는 [라우트 컴포넌트에 프로퍼티 전달](../essentials/passing-props) 가이드를 참고하세요.

## 템플릿 참조 %{#Template-refs}%

슬롯을 사용하면 [템플릿 참조](https://vuejs.org/guide/essentials/template-refs.html)를 라우트 컴포넌트에 직접 넣을 수 있습니다:

```vue-html
<router-view v-slot="{ Component }">
  <component :is="Component" ref="mainContent" />
</router-view>
```

ref를 `<router-view>`에 넣으면 ref는 라우트 컴포넌트가 아닌 RouterView 인스턴스가 됩니다.
