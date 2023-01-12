<template>
  <div class="main-container">
    <ParentLayout>
    </ParentLayout>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/dist/client/theme-default'

export default {
  name: 'Layout',
  components: {
    ParentLayout: DefaultTheme.Layout,
  },
  mounted() {
    const observer = new MutationObserver(() => hacks() )
    observer.observe(document, {
      subtree: true,
      attributes: true
    })
  }
}

function hacks() {
  const els = document.querySelectorAll('ul>li>ul>li>a')
  els.forEach(el => {
    const text = el.innerText
    el.innerText = text.replace(/{#[a-z0-9\-]+}/g, '')
  })
}
</script>

<style>
td code {
  white-space: nowrap;
}

form {
  margin-block-end: 0;
}

.custom-blocks {
  overflow-x: auto;
}
</style>

<style scoped>
.sponsors {
  margin: 0 0 1rem 1.35rem;
}

.sponsors-top {
  margin-top: 1rem;
  /* workaround padding in vitepress */
  margin-bottom: -2rem;
}

.sponsors > span {
  /* margin: 1.25rem 0; */
  display: block;
  color: #999;
  font-size: 0.8rem;
}

.sponsors a:last-child {
  margin-bottom: 20px;
}
.sponsors a:first-child {
  margin-top: 18px;
}

.sponsors a {
  margin-top: 10px;
  width: 125px;
  display: block;
}
</style>
