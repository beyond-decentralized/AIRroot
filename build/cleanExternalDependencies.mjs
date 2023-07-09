import { execute } from './common.mjs'

try {
    await execute('rm', ['-rf', 'node_modules'], '.')
} catch (e) {
    console.log(e)
}

