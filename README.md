# AIRroot
Dependency management for all AIR projects

## History
AIRport grew to be too big and I split it up into multiple projects (AIRbridge, AIRway, AIRline) to make future development more focused and easier.

## Reason
All AIR projects share common libraries (mostly self-defined) and it makes sense to set them up only once (instead of having to do mostly redundant work for every project).  AIRroot accomplishes that.

## Build Directions:

1 First clone AIRroot

2 Directly in AIRroot directory clone all other AIR projects:

* AIRbridge
* AIRline
* AIRport
* AIRWay

3 run:  

* npm i -g pnpm
* pnpm add-external-dependencies
* pnpm install-ts-patch
* pnpm wire-dependencies
* pnpm clean-build



Now you should only have to re-run add-external-dependencies if external dependencies were added or changed.  You only need to re-run ts-patch if you are changing the different version
of Typescript.

Likewise, you only have to run wire-dependencies if any of the dependencies (internal or external) were changed.

## Running from a given library on

If you need to run the build/clean-build starting from a particular library (and going down the dependency chain) run:

pnpm clean-build $RELATIVE_PATH_TO_LIBRARY

Ex:  to run the build on ./AIRroot/AIRport/schemas/holding-pattern and all of the libraries that depend on it run

pnpm clean-build schemas/holding-pattern

## Troubleshooting

If you get unexpected missing dependencies (event though they are present in node_modules), run:

  unwire-dependencies

  wire-dependencies
  
  clean-build
