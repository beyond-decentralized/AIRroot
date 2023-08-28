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
    await addDependencies(airportFirstStageBuild)
    await addDependencies(airwayBuild)
    await addDependencies(airbridgeFirstStageBuild)
    await addDependencies(airportSecondStageBuild)
    await addDependencies(airbridgeSecondStageBuild)
    await addDependencies(airportThirdStageBuild)
    await addDependencies(airlineBuild)
    await addDependencies(airportReactUiBuild)
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
        'pnpm', ['i']
    )

    process.chdir('..')
}
