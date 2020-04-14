<template>
  <div id="app">
    <ImgPreloader
      :imgs="imgsList"
      :preset="preset"
      @finish="finish"
      @error="error"
    >
      <template v-slot="{ loaded, total }">
        <div class="loading">
          <div class="rotate_box">
            <div
              class="rotate"
              :style="`width: ${(loaded / total) * 100}%;`"
            ></div>
          </div>
          {{ Math.floor((loaded / total) * 100) }}%
        </div>
      </template>
    </ImgPreloader>
  </div>
</template>

<script>
import ImgPreloader from '../src/index.js';
import imgsList from './assets/images';
export default {
  name: 'App',
  data() {
    return {
      imgsList,
      preset: {
        atLeastTime: 3
      }
    };
  },
  components: {
    ImgPreloader
  },
  methods: {
    finish() {
      console.log('图片加载完成');
    },
    error() {
      console.log('有图片加载失败');
    }
  }
};
</script>

<style lang="scss">
.loading {
  margin: auto;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 10px;
  bottom: 0px;
  width: 100%;
  text-align: center;
  height: 100px;
  padding-top: 20px;
  .rotate_box {
    margin: auto;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    width: 60%;
    height: 12px;
    border-radius: 6px;
    background-color: yellow;
    .rotate {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 12px;
      border-radius: 6px;
      background-color: red;
    }
  }
}
</style>
