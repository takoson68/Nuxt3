<script setup>

import { useCounter } from '~/containers/useCounter'

const { count, increment, decrement } = useCounter()
</script>

<template lang="pug">
div.container
  h1 Nuxt3 + Pug + Stylus + 容器模式
  h2 about 頁面
  p {{ count }}
</template>

<style lang="stylus" scoped>
.container
  padding 2em
  max-width 500px
  margin 2em auto
  text-align center
  background-color #f9f9f9
  border-radius 10px

button
  margin 0 0.5em
  padding 0.5em 1em
  background-color #4caf50
  color white
  border none
  border-radius 4px
  cursor pointer

  &:hover
    background-color #388e3c

  
.box
  center()
  size(4em)
  background-color red
  color #fff
  +breakpoint('tablet')
    background-color green



</style>
