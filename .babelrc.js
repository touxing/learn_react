module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: "3",
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    // "@babel/plugin-syntax-optional-chaining",
    // "@babel/plugin-proposal-optional-chaining",
    // "@babel/plugin-proposal-nullish-coalescing-operator",
    ['import', { libraryName: 'antd-mobile', style: 'css' }], // `style: true` 会加载 less 文件
  ],
}
