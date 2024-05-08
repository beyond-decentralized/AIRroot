export const airportFirstStageBuild = {
    project: 'AIRport',
    componentsInBuildOrder: [
        'generators/taxiway',
        'libs/direction-indicator',
        'apis/aviation-communication',
        'apis/ground-control',
        'ORMs/tarmaq/entity',
        'ORMs/tarmaq/query',
        'ORMs/tarmaq/dao',
        'apis/air-traffic-control'
    ]
}

export const airwayBuild = {
    project: 'AIRway',
    componentsInBuildOrder: [
        'types',
        'client',
        'processor-common',
        'in-memory-server'
    ]
}

export const airbridgeFirstStageBuild = {
    project: 'AIRbridge',
    componentsInBuildOrder: [
        'data-model',
        'validate'
    ]
}

export const airportSecondStageBuild = {
    project: 'AIRport',
    componentsInBuildOrder: [
        'apis/terminal-map',
        'libs/airgate',
        'libs/pressurization',
        'libs/autopilot',
        'schemas/airport-code',
        'schemas/airspace',
        'schemas/travel-document-checkpoint',
        'schemas/holding-pattern',
        'schemas/final-approach',
        'schemas/layover',
        'libs/flight-number',
        'engines/tower',
        'libs/fuel-hydrant-system',
        'libs/session-state',
        'generators/takeoff'
    ]
}

export const airbridgeSecondStageBuild = {
    project: 'AIRbridge',
    componentsInBuildOrder: [
        'keyring',
        'sso'
    ]
}

export const airportThirdStageBuild = {
    project: 'AIRport',
    componentsInBuildOrder: [
        'libs/blueprint',
        'libs/ground-transport',
        'engines/terminal',
        'databases/sequence',
        'generators/runway',
        'databases/sqlite',
        'databases/sqljs',
        'platforms/web-tower',
        'platforms/web-terminal',
        'platforms/server'
    ]
}

export const airbridgeUiBuild = {
    project: 'AIRbridge',
    componentsInBuildOrder: [
        'UI/ionic'
    ]
}

export const airlineBuild = {
    project: 'AIRline',
    componentsInBuildOrder: [
        'apps/topics',
        'apps/conversations',
        'apps/tasks'
    ]
}

export const airlineAngularUiBuild = {
    project: 'AIRline',
    componentsInBuildOrder: [
        'UIs/angular'
    ]
}
