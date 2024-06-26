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

try {
    await addDependencies(airportFirstStageBuild)
    await addDependencies(airwayBuild)
    await addDependencies(airbridgeFirstStageBuild)
    await addDependencies(airportSecondStageBuild)
    await addDependencies(airbridgeSecondStageBuild)
    await addDependencies(airportThirdStageBuild)
    await addDependencies(airlineBuild)
    await addDependencies(airbridgeUiBuild)
    await addDependencies(airlineAngularUiBuild)
} catch (e) {
    console.log(e)
}

async function addDependencies(
    stageDescriptor
) {
    process.chdir('./' + stageDescriptor.project)

    await executeInProjects(
        stageDescriptor.componentsInBuildOrder,
        true,
        null,
        'pnpm', ['i']
    )

    process.chdir('..')
}
