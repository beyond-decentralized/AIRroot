import { spawn } from 'child_process';

const airportFirstStageBuild = {
    project: 'AIRport',
    componentsInBuildOrder: [
        'generators/taxiway',
        'libs/direction-indicator',
        'apis/aviation-communication',
        'apis/ground-control',
        'apis/check-in',
        'apis/apron',
        'ORMs/tarmaq/entity',
        'ORMs/tarmaq/query',
        'ORMs/tarmaq/dao',
        'apis/arrivals-n-departures',
        'apis/air-traffic-control',
        'libs/airgate',
        'libs/pressurization',
        'libs/vhf-radio',
        'libs/autopilot',
        'libs/flight-number'
    ]
}

const airbridgeFirstStageBuild = {
    project: 'AIRbridge',
    componentsInBuildOrder: [
        'data-model',
        'validate'
    ]
}

const airportSecondStageBuild = {
    project: 'AIRport',
    componentsInBuildOrder: [
        'schemas/airport-code',
        'schemas/airspace',
        'schemas/travel-document-checkpoint',
        'schemas/holding-pattern',
        'schemas/final-approach',
        'schemas/flight-recorder',
        'schemas/layover',
        'apis/terminal-map',
        'engines/tower',
        'libs/fuel-hydrant-system',
        'libs/session-state',
        'generators/takeoff',
        'generators/landing'
    ]
}

const airbridgeSecondStageBuild = {
    project: 'AIRbridge',
    componentsInBuildOrder: [
        'keyring'
    ]
}

const airwayBuild = {
    project: 'AIRway',
    componentsInBuildOrder: [
        'types',
        'client'
    ]
}

const airportThirdStageBuild = {
    project: 'AIRport',
    componentsInBuildOrder: [
        'libs/blueprint',
        'libs/ground-transport',
        'engines/terminal',
        'databases/sequence',
        'generators/runway',
        'databases/sqlite',
        'databases/sqljs',
        'platforms/api',
        'platforms/server',
        'platforms/web-tower',
        'platforms/web-terminal',
    ]
}

const airportReactUiBuild = {
    project: 'AIRbridge',
    uiType: 'React',
    componentsInBuildOrder: [
        'UI/react/components',
        'UI/react/main'
    ]
}

const airlineBuild = {
    project: 'AIRline',
    componentsInBuildOrder: [
        'apps/topics',
        'apps/conversations',
        'apps/tasks',
    ]
}

try {
    // Often build fails because (apparently) the dependency links
    // still point to old version of dist directories, when commenting
    // out other build steps, do not comment out 'wireInDependencies'
    // (which is `rush update`)
    await wireInDependencies('.')

    await execute('npm', ['run', 'build'], '.')

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

    await buildProjects(
        stageDescriptor.componentsInBuildOrder,
        'npm', ['run', 'build']
    );

    process.chdir('..');
}

async function buildUI(
    stageDescriptor
) {
    process.chdir('./' + stageDescriptor.project);

    await buildProjects(
        stageDescriptor.componentsInBuildOrder,
        'npm', ['run', 'build']
    );

    process.chdir('..');
}

async function buildProjects(
    projectsDescriptorsInBuildOrder,
    command,
    parameters
) {
    for (const projectDescriptor of projectsDescriptorsInBuildOrder) {
        // let isApp = false;
        let projectDirectory
        // if (projectDescriptor instanceof Object) {
        //     projectDirectory = projectDescriptor.directory
        //     isApp = projectDescriptor.isApp
        // } else 
        if (typeof projectDescriptor === 'string') {
            projectDirectory = projectDescriptor
        } else {
            throw `Expecting either object or string as a Project Descriptor.`
        }
        const directoryDepth = projectDirectory.split('/');
        let navigateBackPath = '..'
        for (let i = 1; i < directoryDepth.length; i++) {
            navigateBackPath = '../' + navigateBackPath
        }
        // console.log(`Changing directory to: ./${projectDirectory}`)
        process.chdir('./' + projectDirectory);

        // if (isApp) {
        //     await execute('node', ['generate.mjs'], projectDirectory);
        // }

        await execute(command, parameters, projectDirectory);

        process.chdir(navigateBackPath);
    };
}

async function wireInDependencies(
    locationDir
) {
    await execute('rush', ['update'], locationDir)
}

async function execute(
    command,
    parameters,
    projectDirectory
) {
    return new Promise((resolve, _reject) => {
        if (/^win/.test(process.platform)) {
            parameters = [
                '/s',
                '/c',
                command,
                ...parameters
            ]
            command = 'cmd'
        }

        process.stdout.write(`
        RUNNING '${command} ${parameters.join(' ')}' in ${process.cwd()}
    
        `)

        const runCommand = spawn(command, parameters);

        runCommand.stdout.on("data", data => {
            console.log(`${data}`)
        });

        runCommand.stderr.on("data", data => {
            console.log(`${data}`)
        });

        runCommand.on('error', (error) => {
            console.log(`${error.message}`);
        });

        runCommand.on("close", code => {
            console.log(`
        ${code ? 'ERROR' : 'DONE'}: '${command} ${parameters.join(' ')}' in ${process.cwd()}

    `);
            resolve(code)
        });
    }).then((returnCode) => {
        if (returnCode != 0) {
            throw new Error(`
        Suspending after ${projectDirectory}
        `)
        }

        return returnCode
    })

}
