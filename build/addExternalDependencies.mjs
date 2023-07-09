import { execute } from './common.mjs'

try {
    await execute('pnpm', ['i'], '.')
} catch (e) {
    console.log(e)
}
