/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // 和nginx一样有优先排序问题需要注意
    // '/v2/': {
    //   target: 'http://localhost:9050/',
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
    '/v2/': {
      target: 'http://119.3.145.125:9050/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
