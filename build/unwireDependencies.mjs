import Os from 'os'
import { executeInProjects } from './common.mjs'
import {
    airportFirstStageBuild,
    airwayBuild,
    airbridgeFirstStageBuild,
    airportSecondStageBuild,
    airbridgeSecondStageBuild,
    airportThirdStageBuild,
    airlineBuild,
    airbridgeUiBuild,
    airlineAngularUiBuild
} from './projects.mjs'

function isWindows() {
    return Os.platform() === 'win32'
}

try {
    await unwireProjectDependencies(airportFirstStageBuild)
    await unwireProjectDependencies(airwayBuild)
    await unwireProjectDependencies(airbridgeFirstStageBuild)
    await unwireProjectDependencies(airportSecondStageBuild)
    await unwireProjectDependencies(airbridgeSecondStageBuild)
    await unwireProjectDependencies(airportThirdStageBuild)
    await unwireProjectDependencies(airlineBuild)
    await unwireProjectDependencies(airbridgeUiBuild)
    await unwireProjectDependencies(airlineAngularUiBuild)
} catch (e) {
    console.log(e)
}

async function unwireProjectDependencies(
    stageDescriptor
) {
    process.chdir('./' + stageDescriptor.project)

    let removeCommand = 'rm'
    let removeCommandOptions = ['-rf', 'node_modules']

    if (isWindows()) {
        removeCommand = 'rmdir'
        removeCommandOptions = ['/S', '/Q', 'node_modules']
    }

    await executeInProjects(
        stageDescriptor.componentsInBuildOrder,
        removeCommand, removeCommandOptions
    );

    process.chdir('..')
}
