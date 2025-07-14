<script setup>
// 引入容器
import { useCounter } from '~/containers/useCounter'

const { count, increment, decrement } = useCounter()

</script>

<template lang="pug">
div.container
  h1 Nuxt3 + Pug + Stylus + 容器模式
  p 計數：{{ count }}
  button(@click="increment") 增加
  button(@click="decrement") 減少
</template>

<style lang="stylus" scoped>
.container
  padding 2em
  max-width 500px
  max-height 250px
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
</style>
