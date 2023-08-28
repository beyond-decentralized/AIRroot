import Os from 'os'
import { execute } from './common.mjs'

function isWindows() {
    return Os.platform() === 'win32'
}

try {
    let removeCommand = 'rm'
    let removeCommandOptions = ['-rf', 'node_modules']

    if (isWindows()) {
        removeCommand = 'rmdir'
        removeCommandOptions = ['/S', '/Q', 'node_modules']
    }

    await execute(removeCommand, removeCommandOptions, '.')
} catch (e) {
    console.log(e)
}

