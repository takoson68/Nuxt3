<script setup>
import menu from '~/utils/menuConfig'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// props
const props = defineProps({
  menuType: {
    type: String,
    default: 'top'
  }
})


const route = useRoute()

function isActive(path) {
  return route.path === path
}

const rootClass = computed(() => {
  return {
    top: 'topMenu',
    sidebar: 'sidebarMenu'
  }[props.menuType] || 'topMenu'
})
</script>

<template lang="pug">
nav(:class="rootClass")
  ul.menu-list
    li.menu-item(v-for="item in menu" :key="item.path || item.title")
      // 無子選單
      template(v-if="!item.children")
        NuxtLink(
          :to="item.path"
          :class="{ active: isActive(item.path) }"
        ) {{ item.title }}

      // 有子選單
      template(v-else)
        div.dropdown
          span.dropdown-label {{ item.title }}
          ul.dropdown-menu
            li(v-for="child in item.children" :key="child.path")
              NuxtLink(:to="child.path" :class="{ active: isActive(child.path) }") {{ child.title }}
</template>

<style scoped lang="stylus">
.topMenu
  position sticky
  top 0
  z-index 10
  background-color #fff
  box-shadow 0 2px 4px rgba(0,0,0,.1)
  padding 0.5em 1em

  .menu-list
    display flex
    gap 1.5em
    margin 0
    padding 0
    list-style none
    align-items center

  .menu-item
    position relative

  a,span
    color #333
    text-decoration none
    padding 0.5em
    display inline-block

  a.active
    font-weight bold
    border-bottom 2px solid #007acc

  .dropdown
    cursor pointer

    .dropdown-label
      padding 0.5em
      display inline-block

    .dropdown-menu
      display none
      position absolute
      top 100%
      left 0
      background-color #fff
      border 1px solid #ccc
      border-radius 4px
      box-shadow 0 2px 6px rgba(0,0,0,0.15)
      padding 0.5em 0
      min-width 160px
      z-index 1001

      li
        padding 0
        margin 0

      a
        padding 0.5em 1em
        display block
        white-space nowrap
        &:hover
          background-color #f5f5f5

  .dropdown:hover .dropdown-menu
    display block


.sidebarMenu
  width 220px
  min-height 100vh
  background-color #f0f0f5
  padding 1em
  box-shadow 2px 0 5px rgba(0,0,0,.05)
  position sticky
  top 0

  .menu-list
    list-style none
    margin 0
    padding 0

  .menu-item
    margin-bottom 1em

  a
    color #333
    text-decoration none
    padding 0.5em 0.75em
    display block
    border-radius 4px

  a.active
    background-color #007acc
    color white
    font-weight bold

  .group-title
    font-weight bold
    margin-bottom 0.25em
    padding 0.5em 0.75em
    display block
    color #666

  .submenu
    list-style none
    margin 0
    padding-left 1em

    li
      margin-bottom 0.25em

      a
        font-size 0.95em


</style>
