const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import '@/assets/scss/default.scss';
          @import '@/assets/scss/commons.scss';
        `
      }
    }
  },
})
