# RouterView 슬롯 %{#RouterView-slot}%

RouterView 컴포넌트는 라우트 컴포넌트를 렌더링하는 데 사용할 수 있는 슬롯을 노출합니다.

```vue-html
<router-view v-slot="{ Component }">
  <component :is="Component" />
</router-view>
```

위의 코드는 슬롯 없이 `<router-view />`를 사용하는 것과 동일하지만, 슬롯은 다른 기능과 함께 작업할 때 추가적인 유연성을 제공합니다.

## KeepAlive 및 Transition %{#KeepAlive-Transition}%

[KeepAlive](https://vuejs.kr/guide/built-ins/keep-alive.html) 컴포넌트와 작업할 때 일반적으로 라우트 컴포넌트를 유지하려고 할 것이지만 RouterView 자체를 유지하려고 하지는 않을 것입니다. 이를 위해 KeepAlive를 슬롯 내에 넣으면 이를 달성할 수 있습니다.

```vue-html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

마찬가지로 슬롯을 사용하면 라우트 컴포넌트 간에 전환을 위해 [Transition](https://vuejs.kr/guide/built-ins/transition.html) 컴포넌트를 사용할 수 있습니다.

```vue-html
<router-view v-slot="{ Component }">
  <transition>
    <component :is="Component" />
  </transition>
</router-view>
```

또한 Transition 내에서 KeepAlive를 사용할 수 있습니다.

```vue-html
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```

Transition 컴포넌트와 함께 RouterView를 사용하는 자세한 정보는 [Transitions](./transitions) 가이드를 참조하세요.

## Props 및 슬롯 전달 %{#Passing-props-and-slots}%

슬롯을 사용하여 라우트 컴포넌트에 props 또는 슬롯을 전달할 수 있습니다.

```vue-html
<router-view v-slot="{ Component }">
  <component :is="Component" some-prop="a value">
    <p>Some slotted content</p>
  </component>
</router-view>
```

실제로 이것은 **모든 라우트 컴포넌트가 동일한 props와 슬롯을 사용해야 하는 경우가 아니라면 사용하고 싶지 않은 것이 대부분입니다.** 다른 방법으로 props를 전달하는 방법은 [라우트 컴포넌트에 Props 전달](../essentials/passing-props)를 참조하세요.

## 템플릿 참조 %{#Template-refs}%

슬롯을 사용하면 템플릿 참조를 라우트 컴포넌트에 직접 넣을 수 있습니다.

```vue-html
<router-view v-slot="{ Component }">
  <component :is="Component" ref="mainContent" />
</router-view>
```

만약 ref를 `<router-view>`에 넣는다면 ref는 라우트 컴포넌트 대신 RouterView 인스턴스로 채워질 것입니다.
