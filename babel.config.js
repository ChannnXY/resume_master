module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // 自动按需引入插件
    ['component', {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }]
  ]
}
