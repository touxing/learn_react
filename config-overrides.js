const { override, fixBabelImports, addWebpackAlias, useBabelRc } = require('customize-cra')
const path = require('path')

module.exports = override(
  useBabelRc(),
  fixBabelImports('import', { libraryName: 'antd-mobile', style: 'css' }),
  addWebpackAlias({
    ['@']: path.resolve(__dirname, 'src'),
  }),
)
