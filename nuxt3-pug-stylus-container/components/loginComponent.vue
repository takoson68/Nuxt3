<script setup>
import { ref, onMounted } from 'vue'
import { container } from "@/containers/index.js";

const tokenStore = container.resolve("tokenStore");
const languageStore = container.resolve("languageStore");

const emit = defineEmits(['submit', 'cancel'])

const username = ref('admin')
const password = ref('123456')

const onSubmit = (e) => {
  e.preventDefault()
  if (!username.value || !password.value) {
    alert('請輸入帳號與密碼')
    return
  }
  emit('submit', { username: username.value, password: password.value })
}

onMounted(() => {
  languageStore.replaceMenuLang()
})

const cancelLogin = () => {
  emit('cancel')
}
</script>


<template lang="pug">
form.login-form(@submit="onSubmit", aria-label="登入表單")
  label(for="username")
    b(data-lang="cont_lang_03") 帳號：
    input#username(type="text", v-model="username", required, autocomplete="username", data-i18n-placeholder="cont_lang_01", aria-required="true")
  label(for="password")
    b(data-lang="cont_lang_04") 密碼：
    input#password(type="password", v-model="password", required, autocomplete="current-password", data-i18n-placeholder="cont_lang_02", aria-required="true")
  .btnBox
    button(type="button", @click="cancelLogin") 取消
    button(type="submit", data-lang="cont_lang_05") 登入
</template>

<style scoped lang="stylus">
.login-form
  position fixed
  display flex
  flex-direction column
  right 2em
  top 0
  background-color #333
  padding 1em
  border-radius 4px
  label
    padding .25em
    display inline-flex
    justify-content space-between
    align-items center
    input 
      height 2em
      padding-left 1em
      border-radius 4px
      border 1px solid #ccc
      margin-left .5em
  .btnBox
    // width calc( 100% - .25em )
    display flex
    button 
      border 1px solid #ffffff
      margin-top .25em
      height 2em
      border-radius 4px
      display inline-flex 
      flex 1
      justify-content center
      align-items center
      box-sizing border-box
      margin 0 .25em

      
.login-box 
  max-width 300px
  margin auto
  padding 1.5em
  border 1px solid #ccc
  border-radius 10px
  box-shadow 0 0 10px rgba(0,0,0,0.05)

  h2 
    text-align center

  form div 
    margin-bottom 1em

  input 
    width 100%
    padding 0.5em

  .error 
    color red
    margin-top 1em
    text-align center



</style>