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
  const els = document.querySelectorAll('ul>li a')
  els.forEach(el => {
    const text = el.innerText
    el.innerText = text.replace(/{#[a-z0-9\-]+}/g, '')
  })
}
</script>
