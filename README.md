# AIRroot
Dependency management for all AIR projects

## History
AIRport grew to be too big and I split it up into multiple projects (AIRbridge, AIRway, AIRline) to make future development more focused and easier.

## Reason
All AIR projects share common libraries (mostly self defined) and it makes sense to set them up only once (instead of having to do mostly redundant work for every project).  AIRroot accomlishes that.

## Build Directions:

1 First clone AIRroot

2 Directly in AIRroot directory clone all other AIR projects:

* AIRbridge
* AIRline
* AIRport
* AIRWay

3 run:  

* npm i -g pnpm
* npm i -g typescript
* pnpm addExternalDeps
* pnpm addDeps
* pnpm build

Now should only have to re-run addExternalDeps if external dependencies where added or changed.
Likewise you only have to run addDeps if internal dependencies where changed.
