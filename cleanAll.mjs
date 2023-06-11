import { execute, executeInProjects } from './common.mjs'
import {
    airportFirstStageBuild,
    airwayBuild,
    airbridgeFirstStageBuild,
    airportSecondStageBuild,
    airbridgeSecondStageBuild,
    airportThirdStageBuild,
    airportReactUiBuild,
    airlineBuild
} from './projects.mjs'

try {
    await execute('rm', ['-rf', 'node_modules'], '.')

    await cleanPeerProjects(airportFirstStageBuild)
    await cleanPeerProjects(airwayBuild)
    await cleanPeerProjects(airbridgeFirstStageBuild)
    await cleanPeerProjects(airportSecondStageBuild)
    await cleanPeerProjects(airbridgeSecondStageBuild)
    await cleanPeerProjects(airportThirdStageBuild)
    await cleanUI(airportReactUiBuild)
    await cleanPeerProjects(airlineBuild)
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

async function cleanUI(
    stageDescriptor
) {
    process.chdir('./' + stageDescriptor.project);

    await executeInProjects(
        stageDescriptor.componentsInBuildOrder,
        'rm', ['-rf', 'node_modules']
    );

    process.chdir('..');
}
