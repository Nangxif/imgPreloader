<template>
  <div class="imgPreload">
    <slot v-bind:loaded="loaded" v-bind:total="total">
      {{ loaded }}/{{ total }}
    </slot>
  </div>
</template>

<script>
import urlParse from 'url-parse';
export default {
  name: 'imgPreload',
  props: {
    preset: {
      type: Object,
      default: () => {
        return {};
      }
    },
    imgs: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      total: this.imgs.length + this.preset.atLeastTime * 10,
      loaded: 0,
      presetCopy: { atLeastTime: 0 },
      timer: null
    };
  },
  methods: {
    isCrossOrigin(url) {
      if (!/^data:/.test(url)) {
        let parsedUrl = new urlParse(url);
        return window.location.origin !== parsedUrl.origin;
      }
      return false;
    },
    imgLoad(src) {
      return new Promise((resolve, reject) => {
        let imgObj = new Image();
        if (this.isCrossOrigin()) {
          imgObj.crossOrigin = 'anonymous';
        }
        imgObj.onload = resolve;
        imgObj.onerror = reject;
        imgObj.src = src;
      });
    }
  },
  mounted() {
    Object.assign(this.presetCopy, this.preset);
    this.timer = setInterval(() => {
      this.loaded++;
      if (this.loaded >= this.presetCopy.atLeastTime * 10) {
        clearInterval(this.timer);
        if (this.imgs.length == 0) {
          this.$emit('finish');
          return;
        }

        for (let i = 0; i < this.imgs.length; i++) {
          this.imgLoad(this.imgs[i])
            .then(() => {
              this.loaded++;
              this.$nextTick(() => {
                if (
                  this.loaded >=
                  this.imgs.length + this.presetCopy.atLeastTime * 10
                ) {
                  this.$emit('finish');
                }
              });
            })
            .catch(err => {
              this.$emit('error', err);
            });
        }
      }
    }, 100);
  }
};
</script>

<style lang="scss"></style>
