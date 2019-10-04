# @elevenback/env-yaml-generator

[![codecov](https://codecov.io/gh/elevenback/env-yaml-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/elevenback/env-yaml-generator)

env.yaml auto generate CLI tool for Google AppEngine.

## Motivation

When deploying applications to Google AppEngine, we bother us with managing environment variables.

This package automatically generates a dedicated YAML file that enumerates environment variables (with the prefix you specified) and makes managing environment variables the easiest.

## Usage

### Preparation process

At first, Please add `include` to your app.yaml.

```app.yaml
# app.yaml

includes:
- env.yaml
```

### Usage for CLI

```shell
$ yarn add @elevenback/env-yaml-generator -D
$ export DEV_API_ROOT="https://dev.example.com"
$ export PROD_API_ROOT="https://prod.example.com"
$ yarn create-env-yaml --environment DEV
$ cat ./env.yaml
env_variables:
  API_ROOT: "https://dev.example.com"
```

## LICENCE

MIT
