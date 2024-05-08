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

let clean = false
let startingWithProjectDir = ''

if (process.argv.length > 2) {
    let maxArguments = 3
    if (process.argv[2] === 'clean') {
        clean = true
        maxArguments = 4
    }
    if (process.argv.length > maxArguments) {
        throw new Error('Too many arguments provided')
    }
    if (process.argv.length === 4) {
        startingWithProjectDir = process.argv[3]
    }
}

try {
    let buildStarted = startingWithProjectDir ? false : true
    for (let buildConfiguration of [
        airportFirstStageBuild,
        airwayBuild,
        airbridgeFirstStageBuild,
        airportSecondStageBuild,
        airbridgeSecondStageBuild,
        airportThirdStageBuild,
        airbridgeUiBuild,
        airlineBuild,
        airlineAngularUiBuild]
    ) {
        buildStarted = await buildPeerProjects(
            buildConfiguration,
            buildStarted,
            startingWithProjectDir,
            buildConfiguration.build === false ? false : true
        )
    }
} catch (e) {
    console.log(e)
}

async function buildPeerProjects(
    stageDescriptor,
    buildStarted,
    startingWithProjectDir,
    build = true
) {
    process.chdir('./' + stageDescriptor.project)

    if (build) {
        let command = clean ? 'clean-build' : 'build'
        buildStarted = await executeInProjects(
            stageDescriptor.componentsInBuildOrder,
            buildStarted,
            startingWithProjectDir,
            'pnpm', ['run', command]
        )
    }

    process.chdir('..')

    return buildStarted
}
