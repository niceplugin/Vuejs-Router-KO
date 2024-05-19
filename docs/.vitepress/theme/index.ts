import { h } from 'vue'
import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AsideSponsors from './components/AsideSponsors.vue'
// import HomeSponsors from './components/HomeSponsors.vue'
import './styles/vars.css'
import './styles/sponsors.css'
import VueSchoolLink from './components/VueSchoolLink.vue'
import VueMasteryLogoLink from './components/VueMasteryLogoLink.vue'
import VuejsdeConfBanner from './components/VuejsdeConfBanner.vue'

const theme: Theme = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 'home-features-after': () => h(HomeSponsors),
      'aside-ads-before': () => h(AsideSponsors),
      'layout-top': () => h(VuejsdeConfBanner)
    })
  },

  enhanceApp({ app }) {
    app.component('VueSchoolLink', VueSchoolLink)
    app.component('VueMasteryLogoLink', VueMasteryLogoLink)
  },

  // TODO: real date
  // setup() {
  //   const { lang } = useData()
  //   watchEffect(() => {
  //     if (typeof document !== 'undefined') {
  //       document.cookie = `nf_lang=${lang.value}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`
  //     }
  //   })
  // },
}

export default theme
