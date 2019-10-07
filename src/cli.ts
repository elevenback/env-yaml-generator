#!/usr/bin/env node
import meow from 'meow'
import { exec } from './core'

const CLI = meow(
  `
  Usage
    $ create-env-yaml

  Options
    --environment, -E prefix for target env vars name (default is "DEV_")
    --filter, -F regex filter for target env vars name (optional)
`,
  {
    flags: {
      environment: {
        type: 'string',
        alias: 'E'
      },
      filter: {
        type: 'string',
        alias: 'F'
      }
    }
  }
)

exec(CLI.flags)
