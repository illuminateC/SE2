<template>
  <div id="app">
    <div class="app_container">
      <router-view v-wechat-title='$route.meta.title'></router-view>
    </div>
  </div>
</template>

<script setup>



useI18n()
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
let change = () => {
  if (locale.value == 'cn') {
    locale.value = 'en'
  } else {
    locale.value = 'cn'
  }
}

</script>

<style scoped>
@import "../node_modules/@elastic/react-search-ui-views/lib/styles/styles.css";

#app {
  width: 98vw;
  height: 98vh;

  font-family: Avenir, apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #191919;

}

.app_container {
  padding-top: 55px;
}
</style>
