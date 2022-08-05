# NavigationFailure

Extended Error that contains extra information regarding a failed navigation.

## 계층

- `Error`

  ↳ **`NavigationFailure`**

## 속성

### cause

• `Optional` **cause**: `Error`

#### 다음에서 상속됨

Error.cause

___

### from

• **from**: [`RouteLocationNormalized`](RouteLocationNormalized.md)

Route location we were navigating from

___

### message

• **message**: `string`

#### 다음에서 상속됨

Error.message

___

### name

• **name**: `string`

#### 다음에서 상속됨

Error.name

___

### stack

• `Optional` **stack**: `string`

#### 다음에서 상속됨

Error.stack

___

### to

• **to**: [`RouteLocationNormalized`](RouteLocationNormalized.md)

Route location we were navigating to

___

### type

• **type**: `NAVIGATION_ABORTED` \| `NAVIGATION_CANCELLED` \| `NAVIGATION_DUPLICATED`

Type of the navigation. One of [NavigationFailureType](../enums/NavigationFailureType.md)
