<!-- layouts/default.vue -->
<script setup>
import { ref } from 'vue'
import Menu from '~/components/Menu.vue'
//--取得資料都使用api---
import { api } from "@/api/index.js";
import { container } from "@/containers/index.js";
const tokenStore = container.resolve("tokenStore");
const permissionStore = container.resolve('permissionStore')
const token = ref(tokenStore.get())||''
const showLogin = ref(true)

function cancelLogin() {
  showLogin.value = false; // 關閉登入視窗
}
//- 若是查不到token執行
onMounted(async () => {
  console.log(token.value);
  if (token.value!=='') {
    showLogin.value = false
  }
})
function  handleLogin(payload) {
  console.log("登入資訊：", payload);
  // 可執行登入請求等行為

  api.post("/api/login", payload).then((res) => {
    if (res.code === 200) {
      const token = res.token;
      tokenStore.set(token);
      const permissions = res.permissions; // 寫入權限
      permissionStore.set(permissions)

      // this.showLogin = false; // 登入成功後自動隱藏登入元件
      location.reload() //- 重整後就不需要改showLogin

    } else {
      alert(res.message);
    }
  });
}

</script>


<template lang="pug">
.body
  header 
    Menu(menuType="top")
    .bgGary( v-if="showLogin")
      loginComponent( @submit="handleLogin" @cancel="cancelLogin")

  NuxtPage

  footer 我的頁尾 @~~~~

</template>

<style lang="stylus">
// 已經在 nuxt.config.js 引入 _theme , _mixin 
body
  margin 0
.body
  padding-top 3em
  size(100%,calc( 100vh - 3em ))
  display flex
header
  position fixed
  top 0
  left 0
  // background-color #353535
  width 100%
  color #fff


footer
  position fixed
  bottom 0
  left 0
  padding .5em
  background-color #333
  width 100%
  color #fff


button.login_btn
  height 2rem
  font-size .8em
  display inline-flex
  width 4rem
  justify-content center
  align-items center
  border-radius 4px
  border 1px solid #ccc


.bgGary
  position fixed
  top 0
  left 0
  size(100%)
  background-color rgba(0,0,0,.7)
  z-index 20

</style>