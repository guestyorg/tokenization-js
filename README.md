# Node module

## Table of Contents

- [Available scripts](#scripts)
- [Support](#support)
- [CHANGELOG](#changelog)

<a name="scripts"></a>

## Available scripts

This module comes with the following scripts

- `start`

  - Run the cli/executable code - used for local testing

- `build`

  - copy files to build folder to prepare for deployment
  - Which files are copied is decided in the `build-scripts/copy-files`


- `bootstrapci`

  - generates a .circleci folder with deployment configs

- `test`
    - test runner
- `deployci`
    - deployment script (from ebisu)

<a name="command-specification"></a>

when using multiple linked modules, changes may not propagate through nested links. In this case, just make a small change in the project you need to recompile - as long as it is watched with `watch-link` or `yarn start` (in apps), it should recompile.

<a name="support"></a>

## Support

### `--help`

For any help running scripts please type `--help` to get a list of the options and customizations

### Are you still stuck?

For additional support, contact the Platform-FE team

Happy Hacking! :)

<a name="changelog"></a>

## CHANGELOG

The changelog is available [here](https://github.com/guestyorg/jarvis/blob/master/CHANGELOG.md)
