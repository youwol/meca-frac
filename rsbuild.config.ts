import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

const version = require('./package.json').version

export default defineConfig({
    plugins: [pluginReact()],
    html: {
        template: './public/index.html',
    },
    output: {
        distPath: {
            root: 'dist',
        },
        assetPrefix: `${version}/dist/`,
    },
})
