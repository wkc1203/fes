module.exports = {
  entry: `./src/index.js`,
  outputPath: ``,
  publicPath: ``,
  disableCSSModules: true,
  theme: {
    '@primary-color': '#4FAFCD',
    '@link-color': '#4FAFCD',
    '@border-radius-base': '4px',
    '@font-size-base': '14px'
    // '@line-height-base': '1.2'
  },
  hash: true,
  browserslist: [
    "> 1%",
    "last 2 versions"
  ],
  ignoreMomentLocale: true,
  html: {
    template: "./src/index.ejs"
  },
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
      ],
    },
    production: {
      extraBabelPlugins: [
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
      ],
    }
  },
  proxy: {
    // '/api': {
    //   target: "https://mp.med.gzhc365.com",
    //   changeOrigin: true,
    //   匹配 api 将 api 替换为 空
    //   pathRewrite: { "^/api": "" }
    // },
    '/api': {
      target: "http://tih.cqkqinfo.com",
      changeOrigin: true,
      // pathRewrite: { "^/api" : "" }
    },
    // '/api': {
    //   target: "http://192.168.1.107:8103",
    //   changeOrigin: true,
    //   pathRewrite: { "^/api" : ""}
    // },
    // '/api': {
    //   target: "http://127.0.0.1:3001",
    //   changeOrigin: true,
    //   pathRewrite: { "^/api" : ""}
    // },
    // http://127.0.0.1:3001/api/user
  }

};