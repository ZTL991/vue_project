<template>
  <div class="component_home_tab">
    <ul class="list">
      <li @click=" changeTab(1) ">
        <router-link replace to="/5GTravel/location" active-class="active">
          <div class="icon"><img src="../static/images/home-tab-icon-1.png" alt=""></div>
          <div class="name">按地理位置</div>
        </router-link>
      </li>
      <li @click=" changeTab(2) ">
        <router-link replace to="/5GTravel/theme" active-class="active">
          <div class="icon"><img src="../static/images/home-tab-icon-2.png" alt=""></div>
          <div class="name">按特色主题</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {

    props: {
      tabIndex: Number,
    },

    methods: {

      changeTab(index) {
        if (index === 1) {
          this.report('LBQH_按地理位置')
        } else {
          this.report('LBQH_按特色主题')
        }
      },

    },

  }
</script>

<style scoped lang="scss">
  .component_home_tab {
    padding-bottom: 20px;
    .list {
      display: flex; background-color: #fff;
      li {
        flex: 1;
        a {
          position: relative; display: flex; align-items: center; justify-content: center; padding: 30px 0;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          &.active {
            .icon { opacity: 1 }
            .name { color: #222 }
            &:after {
              content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
              width: 120px; height: 8px; background-color: #018fe6;
            }
          }
        }
        .icon {
          width: 40px; height: 40px; margin-right: 15px; opacity: 0.5;
          img { display: block; width: 100%; height: 100%; border-radius: 50% }
        }
        .name { font-size: 30px; color: #999 }
        &:active { opacity: 0.7 }
      }
    }
  }
</style>
