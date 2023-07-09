import { executeInProjects } from './common.mjs'
import {
    airportFirstStageBuild,
    airwayBuild,
    airbridgeFirstStageBuild,
    airportSecondStageBuild,
    airbridgeSecondStageBuild,
    airportThirdStageBuild,
    airlineBuild,
    airportReactUiBuild,
    airlineAngularUiBuild
} from './projects.mjs'

try {
    await cleanPeerProjects(airportFirstStageBuild)
    await cleanPeerProjects(airwayBuild)
    await cleanPeerProjects(airbridgeFirstStageBuild)
    await cleanPeerProjects(airportSecondStageBuild)
    await cleanPeerProjects(airbridgeSecondStageBuild)
    await cleanPeerProjects(airportThirdStageBuild)
    await cleanPeerProjects(airlineBuild)
    await cleanPeerProjects(airportReactUiBuild)
    await cleanPeerProjects(airlineAngularUiBuild)
} catch (e) {
    console.log(e)
}

async function cleanPeerProjects(
    stageDescriptor
) {
    process.chdir('./' + stageDescriptor.project);

    await executeInProjects(
        stageDescriptor.componentsInBuildOrder,
        'rm', ['-rf', 'node_modules']
    );

    process.chdir('..');
}
