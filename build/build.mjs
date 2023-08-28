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
    airportReactUiBuild,
    airlineBuild,
    airlineAngularUiBuild
} from './projects.mjs'

let clean = false

if (process.argv.length > 2 && process.argv[2] === 'clean') {
    clean = true
}

try {
    await buildPeerProjects(airportFirstStageBuild)
    await buildPeerProjects(airwayBuild)
    await buildPeerProjects(airbridgeFirstStageBuild)
    await buildPeerProjects(airportSecondStageBuild)
    await buildPeerProjects(airbridgeSecondStageBuild)
    await buildPeerProjects(airportThirdStageBuild)
    await buildPeerProjects(airportReactUiBuild)
    await buildPeerProjects(airlineBuild)
    await buildPeerProjects(airlineAngularUiBuild, false)
} catch (e) {
    console.log(e)
}

async function buildPeerProjects(
    stageDescriptor,
    build = true
) {
    process.chdir('./' + stageDescriptor.project)

    if (build) {
        let command = clean ? 'clean-build' : 'build'
        await executeInProjects(
            stageDescriptor.componentsInBuildOrder,
            'pnpm', ['run', command]
        )
    }

    process.chdir('..')
}
