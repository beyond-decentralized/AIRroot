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
    process.chdir('./' + stageDescriptor.project);

    if (build) {
        await executeInProjects(
            stageDescriptor.componentsInBuildOrder,
            'pnpm', ['run', 'build']
        );
    }

    process.chdir('..');
}
