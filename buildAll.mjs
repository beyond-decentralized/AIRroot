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
    await wireInDependencies('.')

    await execute('pnpm', ['run', 'build'], '.')

    await buildPeerProjects(airportFirstStageBuild)
    await buildPeerProjects(airwayBuild)
    await buildPeerProjects(airbridgeFirstStageBuild)
    await buildPeerProjects(airportSecondStageBuild)
    await buildPeerProjects(airbridgeSecondStageBuild)
    await buildPeerProjects(airportThirdStageBuild)
    await buildUI(airportReactUiBuild)
    await buildPeerProjects(airlineBuild)
} catch (e) {
    console.log(e)
}

async function buildPeerProjects(
    stageDescriptor
) {
    process.chdir('./' + stageDescriptor.project);

    await executeInProjects(
        stageDescriptor.componentsInBuildOrder,
        'pnpm', ['i']
    );

    await executeInProjects(
        stageDescriptor.componentsInBuildOrder,
        'pnpm', ['run', 'build']
    );

    process.chdir('..');
}

async function buildUI(
    stageDescriptor
) {
    process.chdir('./' + stageDescriptor.project);

    await executeInProjects(
        stageDescriptor.componentsInBuildOrder,
        'pnpm', ['run', 'build']
    );

    process.chdir('..');
}

async function wireInDependencies(
    locationDir
) {
    await execute('pnpm', ['i'], locationDir)
}
