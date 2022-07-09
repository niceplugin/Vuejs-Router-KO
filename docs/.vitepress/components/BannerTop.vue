<template>
  <div id="bt">
    <div class="bt-core">
      텍스트
    </div>
    <input
      class="bt-close"
      type="image"
      src="/images/close.svg"
      alt="닫기"
      @click.stop.prevent="$emit('close')"
    >
  </div>
</template>

<style>
#bt {
  align-items: center;
  background-color: #202A5A;
  box-sizing: border-box;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  justify-content: center;
  position: fixed;
  padding: 0 10px;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  height: 3.125rem;
  display: flex;
}
@media (min-width: 680px) {
  #bt {
    height: 5rem;
  }
}
#bt .bt-core {
  display: flex;
  align-items: center;
}
#bt .bt-close {
  right: 10px;
  position: absolute;
  padding: 10px;
}
@media (min-width: 680px) {
  #bt .bt-close {
    right: 20px;
  }
}
/************************************/
.main-container.has-top-banner #bt {
  display: flex;
}
.main-container.has-top-banner {
  margin-top: 3.125rem;
}
.main-container.has-top-banner .nav-bar {
  margin-top: 3.125rem;
}
.main-container.has-top-banner .sidebar {
  margin-top: 3.125rem;
}
.main-container.has-top-banner .page {
  margin-top: 3.125rem;
}
@media (min-width: 680px) {
  .main-container.has-top-banner {
    margin-top: 5rem;
  }
  .main-container.has-top-banner .nav-bar {
    margin-top: 5rem;
  }
  .main-container.has-top-banner .sidebar {
    margin-top: 5rem;
  }
  .main-container.has-top-banner .page {
    margin-top: 5rem;
  }
}
</style>
