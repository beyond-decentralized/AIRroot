import { spawn } from 'child_process';


export async function executeInProjects(
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
        const directoryDepth = projectDirectory.split('/')
        let navigateBackPath = '..'
        for (let i = 1; i < directoryDepth.length; i++) {
            navigateBackPath = '../' + navigateBackPath
        }
        // console.log(`Changing directory to: ./${projectDirectory}`)
        process.chdir('./' + projectDirectory)

        await execute(command, parameters, projectDirectory)

        process.chdir(navigateBackPath)
    };
}

export async function execute(
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

        const runCommand = spawn(command, parameters)

        runCommand.stdout.on("data", data => {
            console.log(`${data}`)
        });

        runCommand.stderr.on("data", data => {
            console.log(`${data}`)
        });

        runCommand.on('error', (error) => {
            console.log(`${error.message}`)
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

export async function wireInDependencies(
    locationDir
) {
    await execute('pnpm', ['i'], locationDir)
}
