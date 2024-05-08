import Os from 'os'
import {
    executeInProjects,
} from './common.mjs'
import {
    airportFirstStageBuild,
    airwayBuild,
    airbridgeFirstStageBuild,
    airportSecondStageBuild,
    airbridgeSecondStageBuild,
    airportThirdStageBuild,
    airbridgeUiBuild,
    airlineBuild,
    airlineAngularUiBuild
} from './projects.mjs'

function isWindows() {
    return Os.platform() === 'win32'
}

try {
    await cleanProjects(airportFirstStageBuild)
    await cleanProjects(airwayBuild)
    await cleanProjects(airbridgeFirstStageBuild)
    await cleanProjects(airportSecondStageBuild)
    await cleanProjects(airbridgeSecondStageBuild)
    await cleanProjects(airportThirdStageBuild)
    await cleanProjects(airbridgeUiBuild)
    await cleanProjects(airlineBuild)
    await cleanProjects(airlineAngularUiBuild)
} catch (e) {
    console.log(e)
}

async function cleanProjects(
    stageDescriptor
) {
    process.chdir('./' + stageDescriptor.project)

    let removeCommand = 'rm'
    let removeCommandOptions = ['-rf']
    let removeFilesCommand = 'rm'

    if (isWindows()) {
        removeCommand = 'rmdir'
        removeCommandOptions = ['/S', '/Q']
        removeFilesCommand = 'del'
    }

    let hasRunway = false
    let componentsInBuildOrder = stageDescriptor.componentsInBuildOrder
    if (componentsInBuildOrder.indexOf('generators/runway') > -1) {
        hasRunway = true
        componentsInBuildOrder = componentsInBuildOrder.filter(
            component => component !== 'generators/runway'
        )
    }

    await executeInProjects(
        componentsInBuildOrder,
        true,
        null,
        removeCommand, [...removeCommandOptions, 'dist']
    )

    if (hasRunway) {
        await executeInProjects(['generators/runway'],
            true,
            null,
            removeCommand, [...removeCommandOptions, 'dist/esm/api'])
        await executeInProjects(['generators/runway'],
            true,
            null,
            removeCommand, [...removeCommandOptions, 'dist/esm/dao'])
        await executeInProjects(['generators/runway'],
            true,
            null,
            removeCommand, [...removeCommandOptions, 'dist/esm/ddl'])
        await executeInProjects(['generators/runway'],
            true,
            null,
            removeCommand, [...removeCommandOptions, 'dist/esm/execute'])
        await executeInProjects(['generators/runway'],
            true,
            null,
            removeCommand, [...removeCommandOptions, 'dist/esm/interface'])
        await executeInProjects(['generators/runway'],
            true,
            null,
            removeCommand, [...removeCommandOptions, 'dist/esm/resolve'])
        await executeInProjects(['generators/runway'],
            true,
            null,
            removeFilesCommand, [
            'dist/esm/FileProcessor.d.ts',
            'dist/esm/FileProcessor.d.ts.map',
            'dist/esm/FileWatcher.d.ts',
            'dist/esm/FileWatcher.d.ts.map',
            'dist/esm/index.mjs.map',
            'dist/esm/Logger.d.ts',
            'dist/esm/Logger.d.ts.map',
            'dist/esm/ParserUtils.d.ts',
            'dist/esm/ParserUtils.d.ts.map',
            'dist/esm/runway.index.d.ts',
            'dist/esm/runway.index.d.ts.map'
        ])
    }

    process.chdir('..')
}
