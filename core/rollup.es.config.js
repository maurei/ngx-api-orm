import sourcemaps from 'rollup-plugin-sourcemaps';
import license from 'rollup-plugin-license';
import commonjs from 'rollup-plugin-commonjs';

const path = require('path');

export default {
	output: {
		format: 'es',
		sourcemap: true
	},
	plugins: [
		commonjs({
			namedExports: {
				// left-hand side can be an absolute path, a path
				// relative to the current directory, or the name
				// of a module in node_modules
				'node_modules/pluralize/pluralize.js': ['plural', 'singular']
			}
		}),
		sourcemaps(),
		license({
			sourceMap: true,
			banner: {
				file: path.join(__dirname, 'license-banner.txt'),
				encoding: 'utf-8'
			}
		})
	],
	onwarn: () => {
		return;
	}
};
