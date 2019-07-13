const { override, addDecoratorsLegacy, addLessLoader, disableEsLint, fixBabelImports } = require('customize-cra');
const theme = require('./theme')

module.exports = override(
	addDecoratorsLegacy(),
	disableEsLint(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
   	style: true,
  }),
 	addLessLoader({
   	javascriptEnabled: true,
   	modifyVars: theme,
 	}),
);