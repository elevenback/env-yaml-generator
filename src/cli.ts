#!/usr/bin/env node
import meow from "meow";
import { exec } from "./core";

const CLI = meow(
  `
  Usage
    $ create-env-yaml

  Options
    --environment, -E prefix for target env vars name (default is "DEV_")
`,
  {
    flags: {
      environment: {
        type: "string",
        alias: "E"
      }
    }
  }
);

exec(CLI.flags);
